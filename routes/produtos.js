const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const produtosController = require('../controllers/produtosController');


router.post('/',
    body('nome').notEmpty(),
    body('preco').isFloat({ gt: 0 }),
    body('estoque').isInt({ min: 0 }),
    produtosController.createProduto
);


router.get('/',
    query('nome').optional(),
    query('minPreco').optional(),
    query('maxPreco').optional(),
    query('page').optional(),
    query('limit').optional(),
    produtosController.getProdutos
);

router.put('/:id',
    body('nome').optional().notEmpty(),
    body('preco').optional().isFloat({ gt: 0 }),
    body('estoque').optional().isInt({ min: 0 }),
    produtosController.updateProduto
);


router.delete('/:id', produtosController.deleteProduto);

module.exports = router;
