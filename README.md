# 📦 ProductScope-API

ProductScope-API is a RESTful and GraphQL API for managing products, brands, and categories. Built with **Node.js**, **Express**, **Sequelize**, and **PostgreSQL**, it supports secure authentication and flexible queries using GraphQL.

---

## 🚀 Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Apollo Server (GraphQL)
- JWT Authentication
- express-validator
- dotenv
- cors
- pg

---

## 📁 Folder Structure

```
src/
├── config/           # Database config
├── controllers/      # Logic for REST controllers
├── graphql/          # GraphQL schema and resolvers
├── middlewares/      # Custom middlewares (e.g. auth, validation)
├── models/           # Sequelize models
├── routes/           # Express routes (brands, categories, products)
├── tests/            # Jest + Supertest test cases
├── index.js          # Express app export
└── server.js         # Server and Apollo Server setup
```

---

## 📌 Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```

### 3. Start the server

```bash
npm start
```

### 4. Run tests

```bash
npm test
```

---

## 🧪 API Endpoints (REST)

### 🔹 Brands (`/brands`)

| Method | Route            | Description          | Body Parameters       |
|--------|------------------|----------------------|------------------------|
| GET    | `/`              | Get all brands       | -                      |
| GET    | `/:id`           | Get a brand by ID    | -                      |
| POST   | `/create`        | Create a new brand   | `{ "name": "string" }` |
| PUT    | `/update/:id`    | Update a brand       | `{ "name": "string" }` |
| DELETE | `/delete/:id`    | Delete a brand       | -                      |

---

### 🔹 Categories (`/categories`)

| Method | Route            | Description              | Body Parameters       |
|--------|------------------|--------------------------|------------------------|
| GET    | `/`              | Get all categories       | -                      |
| GET    | `/:id`           | Get a category by ID     | -                      |
| POST   | `/create`        | Create a new category    | `{ "name": "string" }` |
| PUT    | `/update/:id`    | Update a category        | `{ "name": "string" }` |
| DELETE | `/delete/:id`    | Delete a category        | -                      |

---

### 🔹 Products (`/products`)

| Method | Route            | Description            | Body Parameters                                               |
|--------|------------------|------------------------|----------------------------------------------------------------|
| GET    | `/`              | Get all products       | -                                                              |
| GET    | `/:id`           | Get a product by ID    | -                                                              |
| POST   | `/create`        | Create a new product   | `name`, `price`, `brandId`, `categories: string[]`             |
| PUT    | `/update/:id`    | Update a product       | Same as POST                                                   |
| DELETE | `/delete/:id`    | Delete a product       | -                                                              |

---

## 🧠 GraphQL Support

You can also interact with the API using GraphQL via:

```
POST /graphql
```

### Example Queries

#### 🔍 Get all products
```graphql
query {
  products {
    id
    name
    description
    price
    brand {
      name
    }
    categories {
      name
    }
  }
}
```

#### ✏️ Create a product
```graphql
mutation CreateProduct($input: ProductInput) {
  createProduct(input: $input) {
    id
    name
    price
  }
}
```

**Variables:**
```json
{
  "input": {
    "name": "Sample Product",
    "description": "Created via GraphQL",
    "price": 99.99,
    "brandId": 1,
    "categoriesIds": [1]
  }
}
```

---

## ✅ Validation & Errors

All routes include validation using `express-validator`. Invalid inputs will return structured error responses like:

```json
{
  "errors": [
    {
      "msg": "Brand name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

---

## 🧪 Testing

The API includes integration tests using **Jest** and **Supertest**.

```bash
npm test
```

Test files are located in:

```
src/tests/
```

---

## 📫 Contact

👨‍💻 **Author**  
Matías Sebastián Benítez  
📧 [matias.benitez.2203@gmail.com](mailto:matias.benitez.2203@gmail.com)  
🔗 [https://github.com/matiassbenitez](https://github.com/matiassbenitez)

---
