# Roxiler Transactions Dashboard

## 📌 Live Demo
🔗 **[Live Deployed Link](https://roxiler-app-ten.vercel.app/)**

## 📜 Project Overview
This is a full-stack MERN application that provides a transactions dashboard with various data visualizations. The backend fetches and processes data, while the frontend displays transaction statistics, bar charts, and pie charts.

## 🏗️ Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Joi,
- **Frontend**: React, Redux Toolkit, Chart.js, Axios, Tailwind CSS

---

## 🖥️ Backend Setup
### 📂 Install Dependencies
```sh
cd backend
npm install
```

### 🔌 Backend Dependencies
```sh
npm i axios cors dotenv express express joi mongoose path
```

### ▶️ Start Backend Server
```sh
npm start
```
---

## 🌐 Frontend Setup
### 📂 Install Dependencies
```sh
cd frontend
npm install
```

### 🎨 Frontend Dependencies
```sh
 npm i @reduxjs/toolkit axios chart.js react-chartjs-2 react-redux
```

### ▶️ Start Frontend Server
```sh
npm start
```

---

## 🔥 API Endpoints
### 🌱 **Database Initialization**
- **`GET /api/initialize-database`** → Seeds data from a third-party API to MongoDB.

### 📊 **Transactions**
- **`GET /api/transactions?month=<number>`** → Returns transactions for a given month. Default: `3` (March).

### 📈 **Statistics**
- **`GET /api/statistics?month=<number>`** → Returns transaction statistics: total amount, total sold items, total not sold items.

### 📊 **Bar Chart Data**
- **`GET /api/bar-chart?month=<number>`** → Returns total items sold and their price distribution.

### 🥧 **Pie Chart Data**
- **`GET /api/pie-chart?month=<number>`** → Returns category-wise data for a pie chart.

### 🔄 **Combined Data**
- **`GET /api/combined-data?month=<number>`** → Returns a combined response of transactions, statistics, and chart data.

---

## 🚀 Deployment
The frontend is deployed on **Vercel**, and the backend is deployed on **Render**.

---

## 📞 Contact
For any queries, feel free to reach out!

🚀 **Happy Coding!** 🎉

