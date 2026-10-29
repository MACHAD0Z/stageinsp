# 🎫 StageInsp

Plataforma web de venda de ingressos para shows e festivais, desenvolvida como
**Trabalho de Conclusão de Curso (TCC)** do curso técnico.

O projeto reúne um **front-end** (páginas do site), uma **API em Node.js** e um
**banco de dados MySQL** com as tabelas de artistas, locais, shows, ingressos,
usuários, vendas e pagamentos.

## ✨ Funcionalidades

- Página inicial com shows em destaque
- Página de compra de ingressos com os shows disponíveis
- Cadastro de usuários integrado à API e ao banco de dados
- Perfil do usuário, redefinição de senha e suporte ao fã
- Site em **português, inglês e espanhol**
- Banner de aceite/recusa de **cookies**
- Recurso de acessibilidade: leitura em voz alta do texto selecionado

## 🛠️ Tecnologias

| Camada | Tecnologias |
|--------|-------------|
| Front-end | HTML, CSS, JavaScript |
| Back-end | Node.js, Express, CORS, body-parser |
| Banco de dados | MySQL (`mysql2`) |

## 📁 Estrutura do projeto

```
stageinsp/
├── backend/       # API (server.js, package.json, .env.example)
├── frontend/      # Páginas do site (HTML, CSS, JS e imagens)
├── database/      # Script SQL com a criação do banco e das tabelas
├── .gitignore
└── README.md
```

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MySQL](https://dev.mysql.com/downloads/) 8

### 1. Clone o repositório

```bash
git clone https://github.com/MACHAD0Z/stageinsp.git
cd stageinsp
```

### 2. Crie o banco de dados

Importe o script no MySQL (Workbench ou terminal):

```bash
mysql -u root -p < database/stageinsp.sql
```

### 3. Configure e inicie a API

```bash
cd backend
npm install
cp .env.example .env     # no Windows: copy .env.example .env
```

Abra o arquivo `.env` e coloque a senha do seu MySQL. Depois:

```bash
npm start
```

A API sobe em `http://localhost:3000`.

### 4. Abra o front-end

Com a API rodando, abra o arquivo `frontend/main.html` no navegador
(ou use a extensão *Live Server* do VS Code).

## 🔌 Rotas da API

Todas as rotas usam o método `POST` e recebem JSON.

| Rota | Campos |
|------|--------|
| `/usuarios` | `nome`, `email`, `senha`, `cpf` |
| `/artistas` | `nome`, `genero`, `duracao_show` |
| `/locais` | `nome`, `endereco`, `cidade`, `estado`, `capacidade` |
| `/shows` | `titulo`, `data`, `id_local`, `id_artista`, `descricao` |
| `/tipos_ingresso` | `tipo_nome` |
| `/ingressos` | `id_show`, `id_tipo_ingresso`, `numero_assento`, `disponivel` |
| `/vendas` | `id_usuario`, `data_pedido`, `status_pagamento` |
| `/itens_pedidos` | `id_pedido`, `id_ingresso`, `valor_pago` |
| `/pagamentos` | `usuario_id`, `status_pagamento`, `data_confirmacao`, `senha_aleatoria`, `data_geracao_senha` |

## 🗄️ Banco de dados

Banco `stageinsp`, com as tabelas: `usuarios`, `artistas`, `locais`, `shows`,
`tipos_ingresso`, `ingressos`, `vendas`, `itens_pedidos` e `pagamentos`.

## 🔮 Próximos passos

- Implementar o login (hoje apenas o cadastro está integrado à API)
- Criptografar as senhas antes de salvar (ex.: bcrypt)
- Integrar a compra de ingressos e o perfil do usuário ao back-end

## 👤 Autor

**MACHAD0Z** – [GitHub](https://github.com/MACHAD0Z)

Projeto acadêmico, sem fins comerciais.
