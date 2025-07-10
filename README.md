# 📦 ProductScope-API

This API allows you to manage products, brands, and categories using CRUD operations. It is built with:

- **Node.js**
- **Express**
- **PostgreSQL**
- **Sequelize**
- **express-validator**
- **dotenv**
- **cors**
- **pg**

---

## 📁 Endpoints

### 🔸 Brands (`/brands`)

| Method | Route              | Description                  | Body Params      |
|--------|--------------------|------------------------------|------------------|
| GET    | `/`                | Get all brands               | -                |
| GET    | `/:id`             | Get a brand by ID            | -                |
| POST   | `/create`          | Create a new brand           | `name: string`   |
| PUT    | `/update/:id`      | Update a brand by ID         | `name: string`   |
| DELETE | `/delete/:id`      | Delete a brand by ID         | -                |

---

### 🔸 Categories (`/categories`)

| Method | Route              | Description                  | Body Params      |
|--------|--------------------|------------------------------|------------------|
| GET    | `/`                | Get all categories           | -                |
| GET    | `/:id`             | Get a category by ID         | -                |
| POST   | `/create`          | Create a new category        | `name: string`   |
| PUT    | `/update/:id`      | Update a category by ID      | `name: string`   |
| DELETE | `/delete/:id`      | Delete a category by ID      | -                |

> ⚠️ **Notes**:
> - The `PUT /update/:id` route should call `categoryController.updateCategory`.
> - The `DELETE /delete/:id` route should validate `param('id')` instead of `body('name')`.

---

### 🔸 Products (`/products`)

| Method | Route              | Description                  | Body Params     |
|--------|--------------------|------------------------------|-------------------------------------------------------------------------------|
| GET    | `/`                | Get all products             | -                                                                              |
| GET    | `/:id`             | Get a product by ID          | -                                                                              |
| POST   | `/create`          | Create a new product         | `name: string`, 
                                                               `price: decimal`,
                                                               `brandId: int`, 
                                                               `categories: string[]`|
| PUT    | `/update/:id`      | Update a product by ID       | Same as POST    |
| DELETE | `/delete/:id`      | Delete a product by ID       | -               |

---

## ✅ Validations

The API uses `express-validator` and a custom middleware `handleErrorValidation` to validate request parameters and bodies. If validation errors occur, a `400` response with details will be returned.

**Example validation error**:
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

## 🌐 Headers and Format

- All responses are in **JSON** format.
- For POST/PUT requests, ensure to include:
  ```
  Content-Type: application/json
  ```

---

## 📌 Technical Notes

- Routes are organized by entity in separate files.
- Some category routes should be corrected (see notes above).
- Database connection is handled via Sequelize.