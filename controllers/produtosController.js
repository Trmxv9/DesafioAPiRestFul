const db = require('../models/db');
const { validationResult } = require('express-validator');

exports.createProduto = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { nome, descricao, preco, estoque } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)',
            [nome, descricao || '', preco, estoque]
        );
        res.status(201).json({ id: result.insertId, nome, descricao, preco, estoque });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProdutos = async (req, res) => {
    let { nome, minPreco, maxPreco, page, limit } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;
    if (limit > 100) limit = 100;

    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM produtos WHERE 1=1';
    const params = [];

    if (nome) { sql += ' AND nome LIKE ?'; params.push(`%${nome}%`); }
    if (minPreco) { sql += ' AND preco >= ?'; params.push(minPreco); }
    if (maxPreco) { sql += ' AND preco <= ?'; params.push(maxPreco); }

    sql += ' ORDER BY criado_em DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    try {
        const [rows] = await db.execute(sql, params);
        res.json({ page, limit, total: rows.length, data: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updateProduto = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const { nome, descricao, preco, estoque } = req.body;

    let sql = 'UPDATE produtos SET';
    const params = [];
    if (nome !== undefined) { sql += ' nome = ?,'; params.push(nome); }
    if (descricao !== undefined) { sql += ' descricao = ?,'; params.push(descricao); }
    if (preco !== undefined) { sql += ' preco = ?,'; params.push(preco); }
    if (estoque !== undefined) { sql += ' estoque = ?,'; params.push(estoque); }

    sql = sql.slice(0, -1);
    sql += ' WHERE id = ?';
    params.push(id);

    try {
        const [result] = await db.execute(sql, params);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json({ message: 'Produto atualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduto = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM produtos WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json({ message: 'Produto deletado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
