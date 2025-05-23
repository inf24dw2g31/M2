/**
 * Middleware para verificar se o utilizador tem privilégios de administrador
 * Utilizar nas rotas que devem ser acessíveis apenas a administradores
 */
const isAdmin = (req, res, next) => {
    // Verifica se o objeto do utilizador existe e se tem direitos de administrador
    if (req.user && (req.user.tipo === 'admin' || req.user.isAdmin === true)) {
      console.log('Admin access granted to:', req.user.email);
      return next();
    }
    
    // Regista e nega o acesso a utilizadores que não sejam administradores
    console.log('Admin access denied for:', req.user ? req.user.email : 'unauthenticated user');
    return res.status(403).json({ 
      error: 'Forbidden', 
      message: 'This action requires administrator privileges' 
    });
  };
  
  module.exports = isAdmin;