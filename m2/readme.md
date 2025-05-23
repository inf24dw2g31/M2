# 📌 Comércio - Swagger - Postman - Docker - Autenticação e Autorização

## 📖 Descrição
Este projeto, desenvolvido para o módulo **DW1**, utiliza uma base de dados de **Cinema** previamente explorada na cadeira de **Bases de Dados** do 1º ano. O objetivo é integrar e manipular os dados utilizando tecnologias modernas e boas práticas de desenvolvimento.

## 🎯 Objetivos Principais
- Estruturação e interação com uma base de dados composta por **8 tabelas** interligadas por **chaves primárias** e **chaves estrangeiras**.
- Implementação de **APIs REST** para realizar as operações:
  - **GET**: Obter dados.
  - **POST**: Criar novos dados.
  - **PUT**: Atualizar dados existentes.
  - **DELETE**: Remover dados.
- Utilização de ferramentas como:
  - **Swagger**: Para documentação e testes das APIs.
  - **Postman**: Para validação e testes das APIs.
  - **Node.js**: Para documentação e testes de APIs.
  - **Docker**: Para containerizar e garantir a portabilidade do projeto.

## 📜 Enunciado
- Arquitetura de serviços do tipo **REST**;
- Utilizar **4 verbos (métodos) do protocolo HTTP** para implementação das operações **CRUD** (Criar, Ler, Atualizar e Apagar) sobre os dados;
- Disponibilizar pelo menos **3 recursos diferentes**;
- Utilizar uma relação de **cardinalidade 1:n** entre dois dos recursos;
- Disponibilizar representações de estado dos recursos em **JSON**;
- Implementar uma camada de **Autenticação e Autorização** para acesso aos recursos;
- Apresentar na consola o detalhe do **utilizador autenticado** quando é recebido um pedido;
- Documentar a API com recurso ao formato **OpenAPI 3.0**;

### 🚫 Restrições
- Utilização do **MySQL** como SGBD;
- Utilizar **Node.js** como servidor aplicacional para implementação da camada de serviços;
- Disponibilizar uma **Collection para o Postman** para consulta dos recursos;
- Disponibilizar configuração para a aplicação **multi-container (duas imagens) MySQL + Node.js**.

### ⭐ Valoriza-se o desenvolvimento/utilização de:
- Utilizar framework **Express** para implementação da camada de serviços;
- Utilizar **OAuth 2.0** para implementar a camada de **Autenticação e Autorização**;
- O utilizador autenticado apenas consegue aceder **aos seus próprios recursos** (em pelo menos um dos recursos).

## 🛠️ Ferramentas e Tecnologias
- **Node.js**: Tecnologia escolhida para backend.
- **Docker**: Para a criação de ambientes isolados.
- **Swagger**: Documentação interativa das APIs.
- **Postman**: Testes e integração das APIs.
- **Autenticação e Autorização**: Usando **API-KEYS**.

## 📂 Organização do Repositório
- **M1** - Autenticação e Autorização
- **Link DockerHub** - https://hub.docker.com/repositories/rewindj
- **WorkBench - SQL ** - Aceder a base de dados ( Username dev_user : Password: dev_password)
- 

## 👥 Equipa
- **Diogo Teixeira** - A044483@umaia.pt
- **João Rebelo** - A044484@umaia.pt
- **José Cardoso** - A045146@umaia.pt
