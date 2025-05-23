# 📌 Comércio - Swagger - Postman - Docker - React - Autenticação e Autorização

## 📖 Descrição

Este projeto, desenvolvido para o módulo **DW2**, utiliza uma base de dados de **Comércio**. O objetivo é integrar e manipular os dados utilizando tecnologias modernas e boas práticas de desenvolvimento.

## 🎯 Objetivos Principais

- Estruturação e interação com uma base de dados composta por 8 tabelas interligadas por chaves primárias e estrangeiras.
- Implementação de APIs REST para realizar as operações:
  - `GET`: Obter dados.
  - `POST`: Criar novos dados.
  - `PUT`: Atualizar dados existentes.
  - `DELETE`: Remover dados.
- Utilização de ferramentas como:
  - **Swagger**: Para documentação e testes das APIs.
  - **Postman**: Para validação e testes das APIs.
  - **Node.js**: Para implementação da camada de serviços.
  - **Docker**: Para containerizar e garantir a portabilidade do projeto.
  - **React**: Para acesso e consulta de recursos disponibilizados por uma API Web REST.

## 📜 Enunciado

Pretende-se neste momento de avaliação que os alunos desenvolvam uma **Aplicação Web Cliente**, desenvolvida com **ReactJS**, para acesso e consulta de recursos disponibilizados por uma **API Web REST**.

Para este trabalho pode ser utilizada a API implementada no momento 1 de avaliação contínua ou qualquer outra API Web REST, desde que a API selecionada esteja protegida por uma camada de **autenticação e autorização**.

> ⚠️ No caso do grupo não utilizar a API Web desenvolvida durante o momento 1, um dos elementos do grupo deve enviar um e-mail ao docente a informar qual a API Web selecionada.

## 🚫 Restrições

- Utilização do **MySQL** como SGBD;
- Utilizar **Node.js** como servidor aplicacional para implementação da camada de serviços;
- Disponibilizar uma **Collection Postman** para consulta dos recursos;
- Disponibilizar configuração para a aplicação **multi-container (MySQL + Node.js)**.

## ⭐ Valorizado

- Utilização da framework **Express** para a camada de serviços;
- Implementação de **OAuth 2.0** para autenticação e autorização;
- O utilizador autenticado apenas consegue aceder aos seus próprios recursos (em pelo menos um dos recursos).

## 🛠️ Ferramentas e Tecnologias

- **Node.js**: Backend.
- **Docker**: Criação de ambientes isolados.
- **Swagger**: Documentação interativa das APIs.
- **Postman**: Testes e integração das APIs.
- **Autenticação e Autorização**: Usando API-KEYS.
- **React**: Aplicação cliente (frontend).

## 📂 Organização do Repositório

- `M2/`: Aplicação Web Cliente desenvolvida com ReactJS.

## 👥 Equipa

- **Diogo Teixeira** - A044483@umaia.pt  
- **João Rebelo** - A044484@umaia.pt  
- **José Cardoso** - A045146@umaia.pt
