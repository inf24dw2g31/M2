const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

// Create the same connection pool used in services
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'database',
  user: process.env.DATABASE_USER || 'dev_user',
  password: process.env.DATABASE_PASSWORD || 'dev_password',
  database: process.env.DATABASE_NAME || 'comerciodev',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Initialize Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email']
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const email = profile.emails[0].value;
      console.log(`User logging in with Google: ${email}`);
      
      // Check if user exists in database
      const [rows] = await pool.query('SELECT * FROM utilizador WHERE email = ?', [email]);
      
      let user;
      
      if (rows.length === 0) {
        // Determine user type based on email
        const isAdminEmail = email === 'authtutorial6@gmail.com';
        const userType = isAdminEmail ? 'admin' : 'cliente';
        
        console.log(`Creating new user: ${profile.displayName} (${email}) as ${userType}`);
        
        // Create new user
        const [result] = await pool.query(
          'INSERT INTO utilizador (nome, email, senha, endereco, telefone, tipo_utilizador) VALUES (?, ?, ?, ?, ?, ?)',
          [
            profile.displayName, 
            email, 
            'google-auth', 
            'Google Login', 
            '000000000', 
            userType
          ]
        );
        
        user = {
          id: result.insertId,
          nome: profile.displayName,
          email: email,
          tipo_utilizador: userType
        };
        
        // If admin email, add to the administrador table
        if (isAdminEmail) {
          console.log(`Adding user ${user.id} to administrador table`);
          await pool.query(
            'INSERT INTO administrador (id_utilizador, api_key) VALUES (?, ?)',
            [user.id, `GOOGLE_API_${Date.now()}`]
          );
        }
      } else {
        user = rows[0];
        console.log(`Existing user found: ${user.nome} (${user.email}) as ${user.tipo_utilizador}`);
        
        // If this is authtutorial6@gmail.com but not marked as admin, update it
        if (email === 'authtutorial6@gmail.com' && user.tipo_utilizador !== 'admin') {
          console.log(`Updating user ${user.id} to admin role`);
          await pool.query(
            'UPDATE utilizador SET tipo_utilizador = ? WHERE id = ?',
            ['admin', user.id]
          );
          user.tipo_utilizador = 'admin';
          
          // Check if admin entry exists, add if not
          const [adminCheck] = await pool.query(
            'SELECT * FROM administrador WHERE id_utilizador = ?', 
            [user.id]
          );
          
          if (adminCheck.length === 0) {
            console.log(`Adding admin entry for user ${user.id}`);
            await pool.query(
              'INSERT INTO administrador (id_utilizador, api_key) VALUES (?, ?)',
              [user.id, `GOOGLE_API_${Date.now()}`]
            );
          }
        }
      }
      
      // Check if user has admin entry
      const [adminRows] = await pool.query('SELECT * FROM administrador WHERE id_utilizador = ?', [user.id]);
      user.isAdmin = adminRows.length > 0;
      
      console.log(`=== AUTHENTICATED USER ===`);
      console.log(`Name: ${user.nome}`);
      console.log(`Email: ${user.email}`);
      console.log(`ID: ${user.id}`);
      console.log(`Type: ${user.tipo_utilizador}`);
      console.log(`Admin: ${user.isAdmin ? 'Yes' : 'No'}`);
      console.log(`========================`);
      
      // Create JWT token with all user info
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          nome: user.nome,
          tipo: user.tipo_utilizador, 
          isAdmin: user.isAdmin 
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      user.token = token;
      return done(null, user);
    } catch (error) {
      console.error('Error in Google auth:', error);
      return done(error, null);
    }
  }
));

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // Log the authenticated user details
    console.log(`Session authenticated: ${req.user.email} (${req.user.id})`);
    return next();
  }
  res.redirect('/auth/login');
};

// JWT Validation middleware
const validateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    // Log the authenticated user details
    console.log(`=== JWT AUTHENTICATED USER ===`);
    console.log(`Name: ${decoded.nome || 'N/A'}`);
    console.log(`Email: ${decoded.email}`);
    console.log(`ID: ${decoded.id}`);
    console.log(`Role: ${decoded.tipo} (Admin: ${decoded.isAdmin ? 'Yes' : 'No'})`);
    console.log(`===============================`);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = {
  passport,
  isAuthenticated,
  validateJWT,
  JWT_SECRET
};