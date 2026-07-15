# Camlage Backend — Express + MongoDB API

REST API for the Camlage watch store. Handles user accounts, the product catalog, per-user carts, and order history.

## Setup

```bash
npm install
cp .env.example .env   # fill in your own MONGO_URI and JWT_SECRET
node seed.js             # populates the Product collection (run once)
npm run dev                # starts the server on http://localhost:5000
```

## Environment Variables

See `.env.example`:
- `MONGO_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — any long random string, used to sign auth tokens
- `PORT` — defaults to 5000

## Folder Structure

```
server/
├── server.js         Express app entry point
├── seed.js            populates Product collection
├── config/db.js        Mongoose connection
├── models/             User, Product, Cart, Order schemas
├── middleware/auth.js    JWT verification (protects routes)
└── routes/
    ├── auth.js           signup / login
    ├── products.js        product CRUD
    └── cart.js             cart + checkout + order history
```

## API Endpoints

| Method | Route | Auth required | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Create account, returns JWT |
| POST | `/api/auth/login` | No | Log in, returns JWT |
| GET | `/api/products` | No | List all watches |
| GET | `/api/products/:id` | No | Get one watch |
| POST | `/api/products` | No | Create a watch |
| PUT | `/api/products/:id` | No | Update a watch |
| DELETE | `/api/products/:id` | No | Delete a watch |
| GET | `/api/cart` | Yes | Get current user's cart |
| POST | `/api/cart` | Yes | Add item to cart |
| DELETE | `/api/cart/:id` | Yes | Remove item from cart |
| POST | `/api/cart/checkout` | Yes | Convert cart into an Order, empty the cart |
| GET | `/api/cart/orders` | Yes | List current user's past orders |

Protected routes require an `Authorization: Bearer <token>` header, using the JWT returned from signup/login.
