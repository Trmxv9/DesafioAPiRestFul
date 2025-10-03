const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const produtosRoutes = require('./routes/produtos');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', produtosRoutes);
app.use('/produtos', produtosRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
