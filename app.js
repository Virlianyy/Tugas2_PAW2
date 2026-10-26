require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routing Utama untuk To-Do
app.use("/todo", todoRoutes);

// Handling Route yang Tidak Ditemukan (404)
app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Route ${req.originalUrl} tidak ditemukan`));
});

// Middleware Error Handling Terpusat
app.use(errorHandler);

// Koneksi ke MongoDB Server & Jalankan Server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Terhubung ke MongoDB Server");
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Gagal terhubung ke MongoDB:", err.message);
  });