# API REST de Produtos (Node.js + MySQL)

Essa API fornece **CRUD completo** para produtos, com **validação de dados**, **filtros**, **busca por nome** e **paginação**, usando **Node.js**, **Express** e **MySQL**.

> ⚠️ **Observação:** O desafio pedia autenticação, mas **não foi implementada** neste projeto para simplificar, pois seria necessário criar uma interface para cadastrar usuários. Todas as rotas estão **abertas** para teste local.

---

## 🚀 Pré-requisitos

- Node.js LTS instalado
- MySQL ou MariaDB rodando local
- Cliente opcional: Postman, Insomnia ou curl
- (Opcional) HeidiSQL pra gerenciar o banco visualmente
- XAMPP ou WAMP pra iniciar o MySQL

---

## 📦 Instalação

1. Clonar o projeto

```bash
git clone https://github.com/Trmxv9/DesafioAPiRestFul.git
cd DesafioAPiRestFul
```

2. Instalar dependências

```bash
pnpm install ou npm install
```

3. Configurar variáveis de ambiente (`.env`)

```
DB_HOST=localhost
DB_USER=nodeuser
DB_PASS=senha123
DB_NAME=api_demo
PORT=3000
```

4. Criar tabela de produtos no MySQL

```sql
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ⚡ Rodando a API com nodemon.

```bash
pnpm run dev ou npm run dev
```

- Vai rodar em `http://localhost:3000`

---

## 🛠 Endpoints

### **1. Criar produto**

- `POST /produtos`
- Body (JSON):

```json
{
  "nome": "Teclado Mecânico",
  "descricao": "Teclado gamer RGB",
  "preco": 350.5,
  "estoque": 10
}
```

- Retorno:

```json
{
  "id": 1,
  "nome": "Teclado Mecânico",
  "descricao": "Teclado gamer RGB",
  "preco": 350.5,
  "estoque": 10
}
```

---

### **2. Listar produtos (Read)**

- `GET /produtos ou /`
- Query params opcionais:

  - `nome` → filtrar por nome (LIKE)
  - `minPreco` → preço mínimo
  - `maxPreco` → preço máximo
  - `page` → número da página (default 1)
  - `limit` → itens por página (default 10, max 100)

**Exemplo de requisição:**

```
GET /produtos?nome=Teclado&minPreco=100&maxPreco=500&page=1&limit=10
```

- Retorno:

```json
{
  "page": 1,
  "limit": 10,
  "total": 2,
  "data": [
    {
      "id": 1,
      "nome": "Teclado Mecânico",
      "descricao": "Teclado gamer RGB",
      "preco": 350.5,
      "estoque": 10,
      "criado_em": "2025-10-03T01:22:33.000Z"
    },
    {
      "id": 3,
      "nome": "Teclado Compacto",
      "descricao": "Teclado pequeno sem fio",
      "preco": 180.0,
      "estoque": 5,
      "criado_em": "2025-10-03T02:10:11.000Z"
    }
  ]
}
```

---

### **3. Atualizar produto**

- `PUT /produtos/:id`
- Body (JSON) com campos a atualizar:

```json
{
  "nome": "Mouse Gamer",
  "preco": 200.9
}
```

- Retorno:

```json
{
  "message": "Produto atualizado"
}
```

---

### **4. Deletar produto**

- `DELETE /produtos/:id`
- Retorno:

```json
{
  "message": "Produto deletado"
}
```

---

### **5. Popular banco com produtos aleatórios**

- Script para gerar 100 produtos aleatórios
- Criei esse script para **ter dados de teste** e poder validar filtros, pesquisa por nome e paginação sem precisar criar produto por produto manualmente.
- Local: `scripts/gerador.js`

**Como rodar:**

```bash
node scripts/gerador.js
```

---

## 💡 Dicas de teste

- Use Postman ou Insomnia pra testar os endpoints 
- Para busca rápida por nome:

```
GET /produtos?nome=Mouse
```

- Para paginação:

```
GET /produtos?page=2&limit=10
```

---

### ✅ Funcionalidades implementadas

- CRUD completo (`POST`, `GET`, `PUT`, `DELETE`)
- Validação de campos obrigatórios (`nome`, `preco`, `estoque`)
- Filtros e busca por nome (`LIKE`)
- Paginação com limite máximo
- Banco persistente (MySQL)
- Script de geração de produtos aleatórios (`scripts/gerador.js`) para testes rápidos

---
