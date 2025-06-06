import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [utilizadores, setUtilizadores] = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [itensPedido, setItensPedido] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);

  useEffect(() => {
    fetch('/api/utilizadores').then(res => res.json()).then(setUtilizadores);
    fetch('/api/administrador').then(res => res.json()).then(setAdministradores);
    fetch('/api/categorias').then(res => res.json()).then(setCategorias);
    fetch('/api/produtos').then(res => res.json()).then(setProdutos);
    fetch('/api/pedidos').then(res => res.json()).then(setPedidos);
    fetch('/api/itens_pedido').then(res => res.json()).then(setItensPedido);
    fetch('/api/pagamentos').then(res => res.json()).then(setPagamentos);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Base de Dados - Visão Geral</h1>

        <h2>Utilizadores</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Senha</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {utilizadores.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>{u.senha}</td>
                <td>{u.endereco}</td>
                <td>{u.telefone}</td>
                <td>{u.tipo_utilizador}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Administradores</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Utilizador</th>
              <th>API Key</th>
            </tr>
          </thead>
          <tbody>
            {administradores.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.id_utilizador}</td>
                <td>{a.api_key}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Categorias</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Produtos</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Stock</th>
              <th>Categoria ID</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.descricao}</td>
                <td>{p.preco}</td>
                <td>{p.stock}</td>
                <td>{p.categoria_id}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Pedidos</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Utilizador</th>
              <th>Data do Pedido</th>
              <th>Estado Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.id_utilizador}</td>
                <td>{p.data_pedido}</td>
                <td>{p.estado_pagamento}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Itens do Pedido</h2>
        <table>
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>ID Produto</th>
              <th>Quantidade</th>
              <th>Preço Unitário</th>
            </tr>
          </thead>
          <tbody>
            {itensPedido.map(i => (
              <tr key={`${i.id_pedido}-${i.id_produto}`}>
                <td>{i.id_pedido}</td>
                <td>{i.id_produto}</td>
                <td>{i.quantidade}</td>
                <td>{i.preco_unitario}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Pagamentos</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Pedido</th>
              <th>Valor</th>
              <th>Estado Pagamento</th>
              <th>Método Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {pagamentos.map(pg => (
              <tr key={pg.id}>
                <td>{pg.id}</td>
                <td>{pg.id_pedido}</td>
                <td>{pg.valor}</td>
                <td>{pg.estado_pagamento}</td>
                <td>{pg.metodo_pagamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
