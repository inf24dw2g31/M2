DROP DATABASE IF EXISTS `comerciodev`;
CREATE DATABASE `comerciodev`;

-- Criação do utilizador e permissões para Docker
CREATE USER IF NOT EXISTS 'dev_user'@'%' IDENTIFIED BY 'dev_password';
GRANT ALL PRIVILEGES ON comerciodev.* TO 'dev_user'@'%';
FLUSH PRIVILEGES;

USE `comerciodev`;

-- Tabela de Utilizadores
CREATE TABLE utilizador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    telefone VARCHAR(20),
    tipo_utilizador ENUM('cliente', 'admin') NOT NULL DEFAULT 'cliente'
);

-- Tabela de Administradores
CREATE TABLE administrador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_utilizador INT UNIQUE NOT NULL,
    api_key VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (id_utilizador) REFERENCES utilizador(id) ON DELETE CASCADE
);

-- Tabela de Categorias
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela de Produtos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(100),
    preco DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabela de Pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_utilizador INT NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_pagamento VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_utilizador) REFERENCES utilizador(id)
);

-- Tabela de Itens do Pedido
CREATE TABLE itens_pedido (
    id_pedido INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_pedido, id_produto),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

-- Tabela de Pagamentos
CREATE TABLE pagamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    estado_pagamento VARCHAR(100) NOT NULL,
    metodo_pagamento VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id)
);
  
-- Inserindo Utilizadores
INSERT INTO utilizador (nome, email, senha, endereco, telefone, tipo_utilizador) VALUES
('Auth6', 'authtutorial6@gmail.com', 'di2zyJackal47', 'Rua Admin, 1', '91111-1111', 'admin'),
('Diogo Teixeira', 'diogo.teixeira@email.com', 'admindiogo', 'Rua Admin, 1', '91111-1111', 'admin'),
('Joao Rebelo', 'joao.rebelo@email.com', 'adminjoao', 'Rua Admin, 1', '91111-1111', 'admin'),
('Jose Cardoso', 'jose.cardoso@email.com', 'adminjose', 'Rua Admin, 1', '91111-1111', 'admin'),
('Joao Silva', 'joao@email.com', 'senha123', 'Rua A, 123', '99999-9999', 'cliente'),
('Maria Santos', 'maria@email.com', 'senha456', 'Rua B, 456', '98888-8888', 'cliente'),
('Carlos Oliveira', 'carlos@email.com', 'senha789', 'Rua C, 789', '97777-7777', 'cliente'),
('Ana Souza', 'ana@email.com', 'senha101', 'Rua D, 101', '96666-6666', 'cliente'),
('Pedro Lima', 'pedro@email.com', 'senha202', 'Rua E, 202', '95555-5555', 'cliente'),
('Rui Ferreira', 'rui.ferreira@email.com', 'senha321', 'Rua F, 303', '94444-4444', 'cliente'),
('Sofia Mendes', 'sofia.mendes@email.com', 'sofia456', 'Rua G, 404', '93333-3333', 'cliente'),
('Tiago Rocha', 'tiago.rocha@email.com', 'tiago789', 'Rua H, 505', '92222-2222', 'cliente'),
('Catarina Almeida', 'catarina.almeida@email.com', 'cat101', 'Rua I, 606', '91111-1111', 'cliente'),
('Miguel Costa', 'miguel.costa@email.com', 'miguel202', 'Rua J, 707', '90000-0000', 'cliente'),
('Andreia Martins', 'andreia.martins@email.com', 'andreia303', 'Rua K, 808', '95555-5555', 'cliente'),
('Ricardo Nunes', 'ricardo.nunes@email.com', 'ricardo404', 'Rua L, 909', '96666-6666', 'cliente'),
('Patrícia Ramos', 'patricia.ramos@email.com', 'patricia505', 'Rua M, 1010', '97777-7777', 'cliente'),
('Fernando Lopes', 'fernando.lopes@email.com', 'fernando606', 'Rua N, 1111', '98888-8888', 'cliente'),
('Beatriz Fonseca', 'beatriz.fonseca@email.com', 'beatriz707', 'Rua O, 1212', '99999-9999', 'cliente'),
('Bruno Carvalho', 'bruno.carvalho@email.com', 'bruno808', 'Rua P, 1313', '92222-1111', 'cliente'),
('Marta Ribeiro', 'marta.ribeiro@email.com', 'marta909', 'Rua Q, 1414', '93333-2222', 'cliente'),
('Paulo Antunes', 'paulo.antunes@email.com', 'paulo111', 'Rua R, 1515', '94444-3333', 'cliente'),
('Vanessa Moreira', 'vanessa.moreira@email.com', 'vanessa222', 'Rua S, 1616', '95555-4444', 'cliente'),
('Hugo Neves', 'hugo.neves@email.com', 'hugo333', 'Rua T, 1717', '96666-5555', 'cliente'),
('Tatiana Sousa', 'tatiana.sousa@email.com', 'tatiana444', 'Rua U, 1818', '97777-6666', 'cliente'),
('Rodrigo Marques', 'rodrigo.marques@email.com', 'rodrigo555', 'Rua V, 1919', '98888-7777', 'cliente'),
('Carla Batista', 'carla.batista@email.com', 'carla666', 'Rua W, 2020', '99999-8888', 'cliente'),
('Daniel Correia', 'daniel.correia@email.com', 'daniel777', 'Rua X, 2121', '90000-9999', 'cliente'),
('Liliana Faria', 'liliana.faria@email.com', 'liliana888', 'Rua Y, 2222', '91111-0000', 'cliente'),
('Fábio Simões', 'fabio.simoes@email.com', 'fabio999', 'Rua Z, 2323', '92222-0001', 'cliente'),
('Raquel Pinto', 'raquel.pinto@email.com', 'raquel000', 'Rua AA, 2424', '93333-0002', 'cliente'),
('Alexandre Coelho', 'alexandre.coelho@email.com', 'alexandre111', 'Rua BB, 2525', '94444-0003', 'cliente'),
('Mariana Tavares', 'mariana.tavares@email.com', 'mariana222', 'Rua CC, 2626', '95555-0004', 'cliente'),
('Goncalo Matos', 'goncalo.matos@email.com', 'goncalo333', 'Rua DD, 2727', '96666-0005', 'cliente'),
('Sara Loureiro', 'sara.loureiro@email.com', 'sara444', 'Rua EE, 2828', '97777-0006', 'cliente'),
('Duarte Barros', 'duarte.barros@email.com', 'duarte555', 'Rua FF, 2929', '98888-0007', 'cliente'),
('Helena Rocha', 'helena.rocha@email.com', 'helena666', 'Rua GG, 3030', '99999-0008', 'cliente'),
('Vitor Pacheco', 'vitor.pacheco@email.com', 'vitor777', 'Rua HH, 3131', '90000-0009', 'cliente');

 
-- Inserindo Administradores
INSERT INTO administrador (id_utilizador, api_key) VALUES
(1, 'API_KEY_1234'),
(2, 'API_KEY_5678'),
(3, 'API_KEY_9000');
 
-- Inserindo Categorias
INSERT INTO categorias (nome) VALUES
('Eletronica'),
('Vestuario'),
('Acessorios'),
('Mobiliario'),
('Livros'),
('Brinquedos'),
('Automovel'),
('Desporto'),
('Beleza'),
('Alimentaçao'),
('Bebidas'),
('Jardinagem'),
('Ferramentas'),
('Saude'),
('Musica'),
('Filmes'),
('Jogos'),
('Papelaria'),
('Informatica'),
('Decoraçao'),
('Animais de Estimacao'),
('Construcao'),
('Perfumaria'),
('Otica'),
('Fitness'),
('Relogios'),
('Calcado'),
('Roupa Intima'),
('Cama, Mesa e Banho'),
('Suplementos');
 
-- Inserindo Produtos
INSERT INTO produtos (nome, descricao, preco, stock, categoria_id) VALUES
('Smartphone', 'Telemovel de ultima geracao', 2500, 10, 1),
('Camisola de Algodao', 'Camisola confortavel e elegante', 50, 20, 2),
('Oculos de Sol', 'Oculos de sol polarizados', 120, 15, 3),
('Sofa 3 Lugares', 'Sofa confortavel e moderno', 1500, 5, 4),
('Livro de Ficcao', 'Historia envolvente e cativante', 80, 30, 5),
('Carrinho de Bebe', 'Carrinho dobravel e leve', 600, 10, 6),
('Pneu 17 Polegadas', 'Pneu de alta performance para automoveis', 400, 50, 7),
('Bicicleta de Montanha', 'Bicicleta resistente para trilhos', 1200, 7, 8),
('Creme Hidratante', 'Creme facial com protecao solar', 35, 25, 9),
('Chocolate Artesanal', 'Chocolate belga de alta qualidade', 15, 100, 10),
('Garrafa de Vinho', 'Vinho tinto envelhecido', 30, 40, 11),
('Kit de Jardinagem', 'Conjunto completo para cuidar do jardim', 90, 12, 12),
('Furadeira Eletrica', 'Furadeira potente para uso domestico', 250, 15, 13),
('Termometro Digital', 'Medicao precisa da temperatura corporal', 60, 20, 14),
('Guitarra Classica', 'Guitarra acustica de madeira', 800, 10, 15),
('Blu-ray de Filme', 'Edicao especial de um filme classico', 25, 50, 16),
('Consola de Jogos', 'Consola de ultima geracao com graficos realistas', 550, 8, 17),
('Caderno Universitario', 'Caderno pautado de 200 folhas', 12, 100, 18),
('Portatil Gamer', 'Computador portatil para jogos', 3200, 5, 19),
('Candeeiro de Mesa', 'Candeeiro moderno para iluminacao interior', 120, 15, 20),
('Racao para Caes', 'Alimento premium para caes adultos', 55, 50, 21),
('Saco de Cimento', 'Cimento resistente para construcao', 25, 200, 22),
('Perfume Feminino', 'Fragrancia sofisticada e marcante', 75, 30, 23),
('Oculos de Grau', 'Armacao leve e resistente', 150, 20, 24),
('Halteres de 10kg', 'Conjunto de pesos para musculacao', 90, 10, 25),
('Relogio de Pulso', 'Relogio elegante com pulseira em aco', 400, 10, 26),
('Tenis de Corrida', 'Tenis confortavel para desporto', 130, 25, 27),
('Cueca de Algodao', 'Cueca confortavel e respiravel', 20, 50, 28),
('Lencois de Seda', 'Conjunto de lencois premium', 350, 5, 29),
('Suplemento Proteico', 'Proteina whey para recuperacao muscular', 180, 30, 30);


-- Inserindo Pedidos
INSERT INTO pedidos (id_utilizador, estado_pagamento) VALUES
(1, 'Pago'),
(2, 'Pago'),
(3, 'Enviado'),
(4, 'Pendente'),
(5, 'Entregue'),
(6, 'Cancelado'),
(7, 'Pago'),
(8, 'Enviado'),
(9, 'Pendente'),
(10, 'Pago'),
(11, 'Entregue'),
(12, 'Cancelado'),
(13, 'Pago'),
(14, 'Pendente'),
(15, 'Pago'),
(16, 'Enviado'),
(17, 'Cancelado'),
(18, 'Entregue'),
(19, 'Pago'),
(20, 'Enviado'),
(21, 'Pendente'),
(22, 'Pago'),
(23, 'Cancelado'),
(24, 'Pago'),
(25, 'Entregue'),
(26, 'Pendente'),
(27, 'Pago'),
(28, 'Cancelado'),
(29, 'Pago'),
(30, 'Enviado');
 
-- Inserindo Itens do Pedido
INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES
(1, 1, 1, 2500),
(1, 3, 2, 50),
(2, 2, 1, 4500),
(3, 5, 1, 1500),
(3, 6, 3, 80),
(4, 4, 1, 200),
(5, 1, 2, 2500),
(6, 2, 1, 4500),
(7, 3, 3, 50),
(8, 4, 1, 200),
(9, 5, 2, 1500),
(10, 6, 1, 80),
(11, 1, 1, 2500),
(12, 2, 2, 4500),
(13, 3, 1, 50),
(14, 4, 3, 200),
(15, 5, 1, 1500),
(16, 6, 2, 80),
(17, 1, 2, 2500),
(18, 2, 1, 4500),
(19, 3, 3, 50),
(20, 4, 1, 200),
(21, 5, 2, 1500),
(22, 6, 1, 80),
(23, 1, 1, 2500),
(24, 2, 2, 4500),
(25, 3, 1, 50),
(26, 4, 3, 200),
(27, 5, 1, 1500),
(28, 6, 2, 80),
(29, 1, 2, 2500),
(30, 2, 1, 4500);

 
-- Inserindo Pagamentos
INSERT INTO pagamentos (id_pedido, valor, estado_pagamento, metodo_pagamento) VALUES
(1, 2600, 'Pago', 'Cartao'),
(2, 4500, 'Pago', 'MBWay'),
(3, 1740, 'Pago', 'Dinheiro'),
(4, 200, 'Aguardando', 'PayPal'),
(5, 5000, 'Pago', 'Cartao'),
(6, 320, 'Recusado', 'MBWay'),
(7, 1500, 'Pago', 'Dinheiro'),
(8, 280, 'Pago', 'PayPal'),
(9, 3600, 'Aguardando', 'Cartao'),
(10, 850, 'Pago', 'MBWay'),
(11, 910, 'Recusado', 'Dinheiro'),
(12, 4200, 'Pago', 'PayPal'),
(13, 770, 'Aguardando', 'Cartao'),
(14, 5600, 'Pago', 'MBWay'),
(15, 90, 'Pago', 'Dinheiro'),
(16, 150, 'Recusado', 'Cartao'),
(17, 3400, 'Pago', 'PayPal'),
(18, 1200, 'Reembolsado', 'MBWay'),
(19, 480, 'Aguardando', 'Dinheiro'),
(20, 2300, 'Pago', 'Cartao'),
(21, 890, 'Pago', 'MBWay'),
(22, 2000, 'Pago', 'PayPal'),
(23, 3100, 'Aguardando', 'Dinheiro'),
(24, 700, 'Pago', 'Cartao'),
(25, 560, 'Pago', 'MBWay'),
(26, 190, 'Reembolsado', 'Dinheiro'),
(27, 2750, 'Pago', 'PayPal'),
(28, 150, 'Aguardando', 'Cartao'),
(29, 360, 'Pago', 'MBWay'),
(30, 4150, 'Recusado', 'Dinheiro');