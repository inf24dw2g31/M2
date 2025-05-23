'use strict';

require('dotenv').config();
var path = require('path');
var http = require('http');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var oas3Tools = require('oas3-tools');
const { passport, validateJWT } = require('./config/oauth');
const authRoutes = require('./routes/auth');
const isAdmin = require('./middleware/adminAuth');

var serverPort = process.env.PORT || 3000;
// Create Express app
var app = express();

// Cookie and session middleware
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.use('/auth', authRoutes);

// Default route redirects to login or docs
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/docs');
  } else {
    res.redirect('/auth/login');
  }
});

// swaggerRouter configuration
var options = {
  routing: {
    controllers: path.join(__dirname, './controllers')
  },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var oasApp = expressAppConfig.getApp();

// Add JWT validation middleware to API routes
app.use('/api', (req, res, next) => {
  // Check if path is admin-specific
  const isAdminPath = req.path.includes('/administradores/') || 
                      (req.path.includes('/categorias/') && ['POST', 'PUT', 'DELETE'].includes(req.method)) ||
                      (req.path.includes('/produtos/') && ['POST', 'PUT', 'DELETE'].includes(req.method));
  
  // Check if path requires authentication
  const requiresAuth = isAdminPath || 
                      req.path.includes('/utilizadores/') || 
                      req.path.includes('/pedidos/');
                      
  // Check if method requires authentication
  const requiresAuthMethod = ['POST', 'PUT', 'DELETE'].includes(req.method);
  
  // Apply appropriate middleware chain
  if (requiresAuth && requiresAuthMethod) {
    if (isAdminPath) {
      // Admin-only routes require both authentication and admin rights
      return validateJWT(req, res, (err) => {
        if (err) return next(err);
        isAdmin(req, res, next);
      });
    } else {
      // User routes just require authentication
      return validateJWT(req, res, next);
    }
  }
  
  next();
}, oasApp);

app.use(oasApp);

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
  console.log('Autenticação Disponível em http://localhost:%d/auth/login', serverPort);
});