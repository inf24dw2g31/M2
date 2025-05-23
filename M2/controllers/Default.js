'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.apagarAdministrador = function apagarAdministrador (req, res, next, id) {
  Default.apagarAdministrador(id)
    .then(function (response) {
      utils.writeJson(res, response, 204);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.apagarCategoria = function apagarCategoria (req, res, next, id) {
  Default.apagarCategoria(id)
    .then(function (response) {
      utils.writeJson(res, response, 204);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.apagarPedido = function apagarPedido (req, res, next, id) {
  Default.apagarPedido(id)
    .then(function (response) {
      utils.writeJson(res, response, 204);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.apagarProduto = function apagarProduto (req, res, next, id) {
  Default.apagarProduto(id)
    .then(function (response) {
      utils.writeJson(res, response, 204);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.apagarUtilizador = function apagarUtilizador (req, res, next, id) {
  Default.apagarUtilizador(id)
    .then(function (response) {
      utils.writeJson(res, response, 204);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.atualizarAdministrador = function atualizarAdministrador (req, res, next, body, id) {
  Default.atualizarAdministrador(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.atualizarCategoria = function atualizarCategoria (req, res, next, body, id) {
  Default.atualizarCategoria(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.atualizarPedido = function atualizarPedido (req, res, next, body, id) {
  Default.atualizarPedido(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.atualizarProduto = function atualizarProduto (req, res, next, body, id) {
  Default.atualizarProduto(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.atualizarUtilizador = function atualizarUtilizador (req, res, next, body, id) {
  Default.atualizarUtilizador(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.criarAdministrador = function criarAdministrador (req, res, next, body) {
  Default.criarAdministrador(body)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.criarCategoria = function criarCategoria (req, res, next, body) {
  Default.criarCategoria(body)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.criarPedido = function criarPedido (req, res, next, body) {
  Default.criarPedido(body)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.criarProduto = function criarProduto (req, res, next, body) {
  Default.criarProduto(body)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.criarUtilizador = function criarUtilizador (req, res, next, body) {
  Default.criarUtilizador(body)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.listarAdministradores = function listarAdministradores (req, res, next) {
  Default.listarAdministradores()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.listarCategorias = function listarCategorias (req, res, next) {
  Default.listarCategorias()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.listarPedidos = function listarPedidos (req, res, next) {
  Default.listarPedidos()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.listarProdutos = function listarProdutos (req, res, next) {
  Default.listarProdutos()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.listarUtilizadores = function listarUtilizadores (req, res, next) {
  Default.listarUtilizadores()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.obterAdministrador = function obterAdministrador (req, res, next, id) {
  Default.obterAdministrador(id)
    .then(function (response) {
      if (response) {
        utils.writeJson(res, response);
      } else {
        utils.writeJson(res, {error: 'Administrador não encontrado'}, 404);
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.obterCategoria = function obterCategoria (req, res, next, id) {
  Default.obterCategoria(id)
    .then(function (response) {
      if (response) {
        utils.writeJson(res, response);
      } else {
        utils.writeJson(res, {error: 'Categoria não encontrada'}, 404);
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.obterPedido = function obterPedido (req, res, next, id) {
  Default.obterPedido(id)
    .then(function (response) {
      if (response) {
        utils.writeJson(res, response);
      } else {
        utils.writeJson(res, {error: 'Pedido não encontrado'}, 404);
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.obterProduto = function obterProduto (req, res, next, id) {
  Default.obterProduto(id)
    .then(function (response) {
      if (response) {
        utils.writeJson(res, response);
      } else {
        utils.writeJson(res, {error: 'Produto não encontrado'}, 404);
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};

module.exports.obterUtilizador = function obterUtilizador (req, res, next, id) {
  Default.obterUtilizador(id)
    .then(function (response) {
      if (response) {
        utils.writeJson(res, response);
      } else {
        utils.writeJson(res, {error: 'Utilizador não encontrado'}, 404);
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
      utils.writeJson(res, {error: 'Internal Server Error'}, 500);
    });
};