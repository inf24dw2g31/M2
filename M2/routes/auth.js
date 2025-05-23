const express = require('express');
const router = express.Router();
const { passport, isAuthenticated } = require('../config/oauth');

// Login page
router.get('/login', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Login</title>
      <style>
        body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }
        .login-container { text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
        .login-button { padding: 10px 20px; background-color: #4285F4; color: white; border: none; border-radius: 4px; cursor: pointer; }
      </style>
    </head>
    <body>
      <div class="login-container">
        <h2>Login to Comercio API</h2>
        <p>Click the button below to login with Google:</p>
        <a href="/auth/google"><button class="login-button">Login with Google</button></a>
      </div>
    </body>
    </html>
  `);
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    // Set JWT token in cookie for all users
    res.cookie('jwt', req.user.token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
    
    // Check if the user is an admin
    if (req.user.isAdmin || req.user.tipo_utilizador === 'admin') {
      // Admin users are shown the token page for API access
      res.redirect('/auth/showtoken');
    } else {
      // Regular users are directly redirected to Swagger UI
      console.log('Regular user logged in, redirecting to docs without token page');
      res.redirect('/docs');
    }
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('jwt');
    res.redirect('/auth/login');
  });
});

// API token endpoint (for Swagger Auth)
router.get('/token', isAuthenticated, (req, res) => {
  res.json({ token: req.user.token });
});

// Add this route to display the token in a user-friendly way
router.get('/showtoken', isAuthenticated, (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Your JWT Token</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .token-container { 
          background-color: #f5f5f5; 
          padding: 15px; 
          border-radius: 5px;
          margin: 20px 0;
          word-break: break-all;
        }
        .copy-btn {
          background-color: #4285F4;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 3px;
          cursor: pointer;
        }
        .instructions { margin-top: 20px; }
      </style>
    </head>
    <body>
      <h2>Your JWT Token</h2>
      <p>Copy this token and use it in the Swagger UI to authenticate your requests:</p>
      
      <div class="token-container" id="token">${req.user.token}</div>
      
      <button class="copy-btn" onclick="copyToken()">Copy Token</button>
      
      <div class="instructions">
        <h3>How to use:</h3>
        <ol>
          <li>Copy the token above</li>
          <li>Go to <a href="/docs">Swagger UI</a></li>
          <li>Click the "Authorize" button (lock icon at the top)</li>
          <li>In the "Value" field, enter: <code>Bearer [your token]</code></li>
          <li>Click "Authorize" and close the dialog</li>
          <li>Now you can make authenticated API requests</li>
        </ol>
        <p><a href="/docs">Return to Swagger UI</a></p>
      </div>
      
      <script>
        function copyToken() {
          const tokenText = document.getElementById('token').innerText;
          navigator.clipboard.writeText(tokenText)
            .then(() => alert('Token copied to clipboard'))
            .catch(err => console.error('Failed to copy: ', err));
        }
      </script>
    </body>
    </html>
  `);
});

module.exports = router;