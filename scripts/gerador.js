// Criei para gerar produtos aleatorios para testar API.

const db = require('../models/db');

const nomes = [
    "Teclado", "Mouse", "Monitor", "Cadeira Gamer", "Headset",
    "Placa de Vídeo", "Processador", "Fonte", "SSD", "HD"
];

const descricoes = [
    "Gamer RGB", "Alta performance", "Sem fio", "Ergonômico",
    "128GB", "256GB", "Compacto", "Ultrarrápido", "Profissional", "Top de linha"
];

function gerarProdutoAleatorio() {
    const nome = nomes[Math.floor(Math.random() * nomes.length)] + " " + Math.floor(Math.random() * 1000);
    const descricao = descricoes[Math.floor(Math.random() * descricoes.length)];
    const preco = (Math.random() * 1000 + 50).toFixed(2); // R$50 a R$1050
    const estoque = Math.floor(Math.random() * 50) + 1; // 1 a 50
    return { nome, descricao, preco, estoque };
}

async function popularBanco() {
    try {
        for(let i = 0; i < 100; i++) {
            const produto = gerarProdutoAleatorio();
            await db.execute(
                'INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)',
                [produto.nome, produto.descricao, produto.preco, produto.estoque]
            );
        }
        console.log("100 produtos gerados com sucesso!");
        process.exit(0);
    } catch(err) {
        console.error("Erro ao popular banco:", err.message);
        process.exit(1);
    }
}

popularBanco();
