# 🛒 Ecommerce Project (Demo)

This is a full-stack ecommerce demo application built using **Spring Boot** (backend) and **React** (frontend).

The project allows users to:
- View products
- Add products to cart
- Update cart items
- Checkout and place an order
- Complete a **simulated card payment** (demo only)

> ⚠️ This project uses a **demo payment flow**. No real credit card is charged.



## 🧱 Project Structure

Ecommerce-Project
│
├── frontend-react
│   ├── node_modules
│   ├── public
│   │
│   ├── src
│   │   ├── api
│   │   │   └── client.js
│   │   │
│   │   ├── assets
│   │   │
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartDrawer.jsx
│   │   │   └── CheckoutModal.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   └── Success.jsx
│   │   │
│   │   ├── styles
│   │   │   └── app.css
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── .gitignore
│   └── README.md
│
├── backend-springboot
│   ├── .idea
│   ├── .mvn
│   │
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com.nauman.nauman_api
│   │   │   │       ├── config
│   │   │   │       │   └── CorsConfig.java
│   │   │   │       │
│   │   │   │       ├── Controller
│   │   │   │       │   ├── ProductController.java
│   │   │   │       │   ├── CartController.java
│   │   │   │       │   ├── CheckoutController.java
│   │   │   │       │   └── PaymentController.java
│   │   │   │       │
│   │   │   │       ├── dto
│   │   │   │       │   ├── AddToCartRequest.java
│   │   │   │       │   └── UpdateCartRequest.java
│   │   │   │       │
│   │   │   │       ├── model
│   │   │   │       │   ├── Product.java
│   │   │   │       │   ├── Cart.java
│   │   │   │       │   ├── CartItem.java
│   │   │   │       │   ├── Order.java
│   │   │   │       │   ├── OrderItem.java
│   │   │   │       │   └── OrderStatus.java
│   │   │   │       │
│   │   │   │       ├── payment
│   │   │   │       │   └── NetsPaymentService.java
│   │   │   │       │
│   │   │   │       ├── repository
│   │   │   │       │   ├── ProductRepository.java
│   │   │   │       │   ├── CartRepository.java
│   │   │   │       │   └── OrderRepository.java
│   │   │   │       │
│   │   │   │       ├── service
│   │   │   │       │   ├── ProductService.java
│   │   │   │       │   ├── CartService.java
│   │   │   │       │   ├── CheckoutService.java
│   │   │       │       └── PaymentService.java
│   │   │       │
│   │   │       └── NaumanApiApplication.java
│   │   │
│   │   └── resources
│   │       └── application.properties
│   │
│   ├── target
│   ├── pom.xml
│   └── README.md
│
└── README.md   (main project README)




## ⚙️ Technologies Used

### Backend
- Java
- Spring Boot
- REST API
- In-memory storage (no database)

### Frontend
- React
- Vite
- Axios
- CSS

---

## 🚀 How to Run the Project

### 1️⃣ Run Backend (Spring Boot)

1. Open `backend-springboot` in **IntelliJ**
2. Run the main Spring Boot application
3. Backend runs at:
http://localhost:8080



Test backend:
http://localhost:8080/api/products



### 2️⃣ Run Frontend (React)

1. Open `frontend-react` in **VS Code**
2. Run:
   ```bash
   npm install
   npm run dev
Frontend runs at:


http://localhost:5173
🧪 Demo Payment
Use the following dummy card details:


Card Number: 4111 1111 1111 1111
Expiry: 12/29
CVC: 123
Name: John Doe
📌 Notes
This project uses in-memory storage, so data resets when backend restarts

Payment is simulated

CORS is enabled for frontend-backend communication

👤 Author
Nauman



