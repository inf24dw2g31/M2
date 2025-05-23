'use strict';

// Add MySQL connection
const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'database',
  user: process.env.DATABASE_USER || 'dev_user',
  password: process.env.DATABASE_PASSWORD || 'dev_password',
  database: process.env.DATABASE_NAME || 'comerciodev',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Apagar um administrador
 *
 * id Integer 
 * no response value expected for this operation
 **/
exports.apagarAdministrador = async function(id) {
  try {
    await pool.query('DELETE FROM administrador WHERE id = ?', [id]);
    return {};
  } catch (error) {
    console.error('Error deleting admin:', error);
    throw error;
  }
}

/**
 * Apagar uma categoria
 *
 * id Integer 
 * no response value expected for this operation
 **/
exports.apagarCategoria = async function(id) {
  try {
    await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
    return {};
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}

/**
 * Apagar um pedido
 *
 * id Integer 
 * no response value expected for this operation
 **/
exports.apagarPedido = async function(id) {
  try {
    // Delete associated records from itens_pedido and pagamentos first
    await pool.query('DELETE FROM itens_pedido WHERE id_pedido = ?', [id]);
    await pool.query('DELETE FROM pagamentos WHERE id_pedido = ?', [id]);
    // Then delete the pedido
    await pool.query('DELETE FROM pedidos WHERE id = ?', [id]);
    return {};
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}

/**
 * Apagar um produto
 *
 * id Integer 
 * no response value expected for this operation
 **/
exports.apagarProduto = async function(id) {
  try {
    await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
    return {};
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

/**
 * Apagar um utilizador
 *
 * id Integer 
 * no response value expected for this operation
 **/
exports.apagarUtilizador = async function(id) {
  try {
    await pool.query('DELETE FROM utilizador WHERE id = ?', [id]);
    return {};
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

/**
 * Atualizar um administrador
 *
 * body Administrador Dados do administrador para atualização
 * id Integer 
 * returns Administrador
 **/
exports.atualizarAdministrador = async function(body, id) {
  try {
    const { id_utilizador, api_key } = body;
    await pool.query(
      'UPDATE administrador SET id_utilizador = ?, api_key = ? WHERE id = ?',
      [id_utilizador, api_key, id]
    );
    
    const [rows] = await pool.query('SELECT * FROM administrador WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error updating admin:', error);
    throw error;
  }
}

/**
 * Atualizar uma categoria
 *
 * body Categoria Dados da categoria para atualização
 * id Integer 
 * returns Categoria
 **/
exports.atualizarCategoria = async function(body, id) {
  try {
    const { nome } = body;
    await pool.query(
      'UPDATE categorias SET nome = ? WHERE id = ?',
      [nome, id]
    );
    
    const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
}

/**
 * Atualizar um pedido
 *
 * body Pedido Dados do pedido para atualização
 * id Integer 
 * returns Pedido
 **/
exports.atualizarPedido = async function(body, id) {
  try {
    const { id_utilizador, estado_pagamento } = body;
    await pool.query(
      'UPDATE pedidos SET id_utilizador = ?, estado_pagamento = ? WHERE id = ?',
      [id_utilizador, estado_pagamento, id]
    );
    
    const [rows] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

/**
 * Atualizar um produto
 *
 * body Produto Dados do produto para atualização
 * id Integer 
 * returns Produto
 **/
exports.atualizarProduto = async function(body, id) {
  try {
    const { nome, descricao, preco, stock, categoria_id } = body;
    await pool.query(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, stock = ?, categoria_id = ? WHERE id = ?',
      [nome, descricao, preco, stock, categoria_id, id]
    );
    
    const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

/**
 * Atualizar um utilizador
 *
 * body Utilizador Dados do utilizador para atualização
 * id Integer 
 * returns Utilizador
 **/
exports.atualizarUtilizador = async function(body, id) {
  try {
    const { nome, email, senha, endereco, telefone, tipo_utilizador } = body;
    await pool.query(
      'UPDATE utilizador SET nome = ?, email = ?, senha = ?, endereco = ?, telefone = ?, tipo_utilizador = ? WHERE id = ?',
      [nome, email, senha, endereco, telefone, tipo_utilizador, id]
    );
    
    const [rows] = await pool.query('SELECT * FROM utilizador WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

/**
 * Criar um novo administrador
 *
 * body Administrador Administrador a ser criado
 * returns Administrador
 **/
exports.criarAdministrador = async function(body) {
  try {
    const { id_utilizador, api_key } = body;
    const [result] = await pool.query(
      'INSERT INTO administrador (id_utilizador, api_key) VALUES (?, ?)',
      [id_utilizador, api_key]
    );
    
    return {
      id: result.insertId,
      id_utilizador,
      api_key
    };
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
}

/**
 * Criar uma nova categoria
 *
 * body Categoria Categoria a ser criada
 * returns Categoria
 **/
exports.criarCategoria = async function(body) {
  try {
    const { nome } = body;
    const [result] = await pool.query(
      'INSERT INTO categorias (nome) VALUES (?)',
      [nome]
    );
    
    return {
      id: result.insertId,
      nome
    };
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

/**
 * Criar um novo pedido
 *
 * body Pedido Pedido a ser criado
 * returns Pedido
 **/
exports.criarPedido = async function(body) {
  try {
    const { id_utilizador, estado_pagamento } = body;
    const [result] = await pool.query(
      'INSERT INTO pedidos (id_utilizador, estado_pagamento) VALUES (?, ?)',
      [id_utilizador, estado_pagamento]
    );
    
    const [rows] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [result.insertId]);
    return rows[0];
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

/**
 * Criar um novo produto
 *
 * body Produto Produto a ser criado
 * returns Produto
 **/
exports.criarProduto = async function(body) {
  try {
    const { nome, descricao, preco, stock, categoria_id } = body;
    const [result] = await pool.query(
      'INSERT INTO produtos (nome, descricao, preco, stock, categoria_id) VALUES (?, ?, ?, ?, ?)',
      [nome, descricao, preco, stock, categoria_id]
    );
    
    return {
      id: result.insertId,
      nome,
      descricao,
      preco,
      stock,
      categoria_id
    };
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

/**
 * Criar um novo utilizador
 *
 * body Utilizador Utilizador a ser criado
 * returns Utilizador
 **/
exports.criarUtilizador = async function(body) {
  try {
    const { nome, email, senha, endereco, telefone, tipo_utilizador } = body;
    const [result] = await pool.query(
      'INSERT INTO utilizador (nome, email, senha, endereco, telefone, tipo_utilizador) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, email, senha, endereco, telefone, tipo_utilizador || 'cliente']
    );
    
    return {
      id: result.insertId,
      nome,
      email,
      senha,
      endereco,
      telefone,
      tipo_utilizador: tipo_utilizador || 'cliente'
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Listar todos os administradores
 *
 * returns List
 **/
exports.listarAdministradores = async function() {
  try {
    const [rows] = await pool.query('SELECT * FROM administrador');
    return rows;
  } catch (error) {
    console.error('Error listing admins:', error);
    throw error;
  }
}

/**
 * Listar todas as categorias
 *
 * returns List
 **/
exports.listarCategorias = async function() {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias');
    return rows;
  } catch (error) {
    console.error('Error listing categories:', error);
    throw error;
  }
}

/**
 * Listar todos os pedidos
 *
 * returns List
 **/
exports.listarPedidos = async function() {
  try {
    const [rows] = await pool.query('SELECT * FROM pedidos');
    return rows;
  } catch (error) {
    console.error('Error listing orders:', error);
    throw error;
  }
}

/**
 * Listar todos os produtos
 *
 * returns List
 **/
exports.listarProdutos = async function() {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos');
    return rows;
  } catch (error) {
    console.error('Error listing products:', error);
    throw error;
  }
}

/**
 * Listar todos os utilizadores
 *
 * returns List
 **/
exports.listarUtilizadores = async function() {
  try {
    const [rows] = await pool.query('SELECT * FROM utilizador');
    return rows;
  } catch (error) {
    console.error('Error listing users:', error);
    throw error;
  }
}

/**
 * Obter um administrador por ID
 *
 * id Integer 
 * returns Administrador
 **/
exports.obterAdministrador = async function(id) {
  try {
    const [rows] = await pool.query('SELECT * FROM administrador WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error getting admin:', error);
    throw error;
  }
}

/**
 * Obter uma categoria por ID
 *
 * id Integer 
 * returns Categoria
 **/
exports.obterCategoria = async function(id) {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error getting category:', error);
    throw error;
  }
}

/**
 * Obter um pedido por ID
 *
 * id Integer 
 * returns Pedido
 **/
exports.obterPedido = async function(id) {
  try {
    const [rows] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
}

/**
 * Obter um produto por ID
 *
 * id Integer 
 * returns Produto
 **/
exports.obterProduto = async function(id) {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
}

/**
 * Obter um utilizador por ID
 *
 * id Integer 
 * returns Utilizador
 **/
exports.obterUtilizador = async function(id) {
  try {
    const [rows] = await pool.query('SELECT * FROM utilizador WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}