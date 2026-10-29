require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require ("body-parser");
const cors = require ("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const db=mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "stageinsp"
});

db.connect (err=>{
    if(err)throw err;
    console.log("MYSQL CONECTADO")
});
app.post("/artistas",(req,res)=>{
    const{nome, genero, duracao_show}=req.body;
    db.query(
        "insert into artistas(nome, genero, duracao_show) values(?, ?, ?)",[nome, genero, duracao_show],
        (err,result)=>{
            if (err) return res.status(500).send(err);
            res.send("Artistas cadastrado");
        }
    );
});
app.post("/ingressos",(req,res)=>{
    const{id_show, id_tipo_ingresso, numero_assento, disponivel}=req.body;
    db.query(
        "insert into artistas(id_show, id_tipo_ingresso, numero_assento, disponivel) values(?, ?, ?, ?)",[id_show, id_tipo_ingresso, numero_assento, disponivel],
        (err,result)=>{
            if (err) return res.status(500).send(err);
            res.send("ingresso selecionado");
        }
    );
});
app.post("/itens_pedidos",(req,res)=>{
    const{id_pedido, id_ingresso, valor_pago}=req.body;
    db.query(
        "insert into itens_pedidos(id_pedido, id_ingresso, valor_pago) values(?, ?, ?)",[id_pedido, id_ingresso, valor_pago],
        (err,result)=>{
            if (err) return res.status(500).send(err);
            res.send("ingresso adquirido");
        }
    );
});
app.post("/locais",(req,res)=>{
    const{nome, endereco, cidade, estado, capacidade}=req.body;
    db.query(
        "insert into locais(nome, endereco, cidade, estado, capacidade) values(?, ?, ?)",[nome, endereco, cidade, estado, capacidade],
        (err,result)=>{
            if (err) return res.status(500).send(err);
            res.send("");
        }
    );
});
app.post("/pagamentos",(req,res)=>{
    const{usuario_id, status_pagamento, data_confirmacao, senha_aleatoria, data_geracao_senha}=req.body;
    db.query(
        "insert into pagamentos(usuario_id, status_pagamento, data_confirmacao, senha_aleatoria, data_geracao_senha) values(?, ?, ?, ?, ?)",[usuario_id, status_pagamento, data_confirmacao, senha_aleatoria, data_geracao_senha],
        (err,result)=>{
            if (err) return res.status(500).send(err);
            res.send("");
        }
    );
});
app.post("/shows",(req,res)=>{
    const{titulo, data, id_local, id_artista, descricao}=req.body;
    db.query(
        "insert into shows(titulo, data, id_local, id_artista, descricao) values(?, ?, ?, ?, ?)",[titulo, data, id_local, id_artista, descricao],
        (err,result)=>{
            if (err) return res.status(500).send(err);
            res.send("");
        }
    );
});
app.post("/tipos_ingresso",(req,res)=>{
    const{tipo_nome}=req.body;
    db.query(
        "insert into tipos_ingreso(tipo_nome) values(?)",[tipo_nome],
        (err,result)=>{
            if (err) return res.status(500).send(err);
            res.send("selecione o tipo do ingresso");
        }
    );
});
app.post("/usuarios", (req, res) => {
    const { nome, email, senha, cpf } = req.body;
    db.query(
        "INSERT INTO usuarios (nome, email, senha, cpf) VALUES (?, ?, ?, ?)",
        [nome, email, senha, cpf],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Erro ao cadastrar usuário");
            }
            res.send("Usuário cadastrado com sucesso!");
        }
    );
});


app.post("/vendas",(req,res)=>{
    const{id_usuario, data_pedido, status_pagamento }=req.body;
    db.query(
        "insert into vendas(id_usuario, data_pedido, status_pagamento) values(?, ?, ?)",[id_usuario, data_pedido, status_pagamento],
        (err,result)=>{
            if (err) return res.status(500).send(err);
            res.send("");
        }
    );
});
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("servidor rodando na porta " + PORT)
});