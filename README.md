# Mini E-Commerce Backend API

## Overview
This is a minimal, secure, and scalable backend API for a small e-commerce platform built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**. The API supports user authentication using JWT, product and category management, order processing, and file uploads.

---

## Features

### User Authentication & Authorization
- User registration with hashed passwords  
- User login with JWT token generation  
- Protected routes with role-based access (Admin/User)  

### Product Management
- CRUD operations for products  
- Search, filter (by category, price, keyword), pagination, and sorting  
- Upload product images via Multer middleware  

### Category Management
- Create and list categories  

### Order Management
- Place orders linked to users  
- View order history for authenticated users  

### File Uploads
- Upload product images and store URLs in MongoDB  

---

## Tech Stack
- **Backend:** Node.js (Express.js)  
- **Language:** TypeScript  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT (JSON Web Tokens)  
- **File Uploads:** Multer  
- **Environment:** dotenv  

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)  
- MongoDB database (local or cloud)  

---

## Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/navinkumarparmar/mini-ecommerce-backend.git


2. Navigate to the project directory:
   ```bash
    cd mini-ecommerce-backend

## Install dependencies:
 npm install


## Run the development server:
npm run dev

## API Endpoints

### Authentication
- **POST** `/api/auth/register` — Register a new user  
- **POST** `/api/auth/login` — Login and get JWT token  

### Products
- **GET** `/api/products` — Get all products (with pagination & filters)  
- **POST** `/api/products` — Add new product (Admin only)  
- **PUT** `/api/products/:id` — Update product details  
- **DELETE** `/api/products/:id` — Delete product  
- **POST** `/api/products/:id/upload` — Upload product image  

### Categories
- **GET** `/api/categories` — List all categories  
- **POST** `/api/categories` — Create new category (Admin only)  

### Orders
- **POST** `/api/orders` — Place order  
- **GET** `/api/orders` — Get logged-in user’s orders  

### POSTMAN COLLECTION URL:
 -**URL** `https://documenter.getpostman.com/view/36242002/2sB3BGG9Te`
