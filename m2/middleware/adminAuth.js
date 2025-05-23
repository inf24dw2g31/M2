/**
 * Middleware to check if a user has admin privileges
 * Use this on routes that should be accessible only to administrators
 */
const isAdmin = (req, res, next) => {
    // Check if user object exists and has admin rights
    if (req.user && (req.user.tipo === 'admin' || req.user.isAdmin === true)) {
      console.log('Admin access granted to:', req.user.email);
      return next();
    }
    
    // Log and deny access for non-admin users
    console.log('Admin access denied for:', req.user ? req.user.email : 'unauthenticated user');
    return res.status(403).json({ 
      error: 'Forbidden', 
      message: 'This action requires administrator privileges' 
    });
  };
  
  module.exports = isAdmin;