---
title: "Case study – Plano boutique"
date: "2025-09-24"
description: "A helpful post."
image: "/images/posts/case-study-plano-boutique.svg"
tags:
  - webdev
---
**Case Study – Plano Boutique**
=====================================

**Introduction**
---------------

In this case study, we will explore the technical implementation of a boutique e-commerce website built using Next.js and a custom SQL database. The project aimed to provide a seamless user experience, high-performing web application, and efficient data management. We will delve into the technical details of the project, highlighting key challenges, solutions, and best practices.

**Project Overview**
-------------------

Plano Boutique is a fashion-forward e-commerce website that sells high-quality clothing and accessories. The website features a clean design, user-friendly interface, and robust functionality. The project's primary objectives were to:

* Create a visually appealing and responsive web application
* Implement a scalable and efficient database schema
* Ensure fast and secure payment processing
* Develop a robust and maintainable codebase

**Technical Requirements**
-------------------------

The project required the following technical specifications:

* Client-side: Next.js 13, React 18, and TypeScript
* Server-side: Express.js, Node.js, and SQL database (PostgreSQL)
* Payment Gateway: Stripe
* Front-end Library: Tailwind CSS
* Version Control: Git

**Database Design**
------------------

The database schema was designed to accommodate the website's requirements, including product information, customer data, orders, and payments. The schema consisted of the following tables:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255)
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) NOT NULL
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  payment_method VARCHAR(255) NOT NULL,
  payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Front-end Development**
-------------------------

The front-end was built using Next.js, React, and TypeScript. The project utilized Tailwind CSS for styling and layout management. The following components were implemented:

* **Product List**: A responsive grid component displaying product images, names, and prices.
* **Product Details**: A component showcasing product information, including descriptions, images, and reviews.
* **Shopping Cart**: A component managing cart items, quantities, and totals.
* **Checkout**: A component handling payment processing and order submission.

```jsx
// ProductList.js
import Image from 'next/image';
import { useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    // ...
  ]);

  const handleAddToCart = (product) => {
    // Add product to cart
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id}>
          <Image src={product.image_url} alt={product.name} width={200} height={200} />
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
```

**Server-side Development**
---------------------------

The server-side was built using Express.js and Node.js. The project utilized a custom SQL database (PostgreSQL) for data storage and management. The following routes were implemented:

* **GET /products**: Retrieve a list of products.
* **GET /products/:id**: Retrieve a single product by ID.
* **POST /orders**: Create a new order.
* **GET /orders**: Retrieve a list of orders.

```javascript
// server.js
const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  user: 'plano_boutique',
  host: 'localhost',
  database: 'plano_boutique',
  password: 'password',
  port: 5432,
});

app.get('/products', async (req, res) => {
  const products = await pool.query('SELECT * FROM products');
  res.json(products.rows);
});

app.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  res.json(product.rows[0]);
});

app.post('/orders', async (req, res) => {
  const { customer_id, order_date, total } = req.body;
  const order = await pool.query('INSERT INTO orders (customer_id, order_date, total) VALUES ($1, $2, $3) RETURNING *', [customer_id, order_date, total]);
  res.json(order.rows[0]);
});

app.get('/orders', async (req, res) => {
  const orders = await pool.query('SELECT * FROM orders');
  res.json(orders.rows);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

**Payment Processing**
----------------------

The project utilized Stripe for payment processing. The following functionality was implemented:

* **Checkout**: A component handling payment processing and order submission.
* **Payment Gateway**: A server-side route handling payment requests.

```jsx
// Checkout.js
import axios from 'axios';

const Checkout = () => {
  const handlePayment = async (event) => {
    event.preventDefault();
    const { amount, payment_method } = event.target;
    const response = await axios.post('/payment', { amount, payment_method });
    if (response.status === 200) {
      // Payment successful, create order
    } else {
      // Payment failed
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <input type="number" name="amount" value={19.99} />
      <select name="payment_method">
        <option value="credit_card">Credit Card</option>
        <option value="paypal">PayPal</option>
      </select>
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default Checkout;
```

```javascript
// payment.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_1234567890');

const app = express();

app.post('/payment', async (req, res) => {
  const { amount, payment_method } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method_types: [payment_method],
  });
  res.json(paymentIntent);
});

app.listen(3000, () => {
  console.log('Payment server listening on port 3000');
});
```

**Key Takeaways**
-----------------

*   **Use a robust database schema**: Design a database schema that can accommodate the project's requirements and scale with the application.
*   **Implement a scalable front-end architecture**: Use a framework like Next.js to build a scalable and maintainable front-end application.
*   **Use a secure payment gateway**: Utilize a reputable payment gateway like Stripe to handle payment processing and ensure secure transactions.
*   **Test and iterate**: Continuously test and iterate on the application to ensure it meets the project's requirements and scales with the business.

**Conclusion**
----------

Plano Boutique is a successful e-commerce website built using Next.js, React, and a custom SQL database. The project demonstrates the importance of a robust database schema, scalable front-end architecture, and secure payment processing. By following the best practices outlined in this case study, developers can build efficient, maintainable, and scalable web applications that meet the project's requirements and scale with the business.
