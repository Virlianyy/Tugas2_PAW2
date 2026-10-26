const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: [true, "Judul tugas wajib diisi"],
    trim: true,
  },
  deskripsi: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["Belum Selesai", "Sedang Dikerjakan", "Selesai"],
    default: "Belum Selesai",
  },
  prioritas: {
    type: String,
    enum: ["Rendah", "Sedang", "Tinggi"],
    default: "Sedang",
  },
  tenggatWaktu: {
    type: Date,
    required: [true, "Tenggat waktu wajib diisi"],
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model("Todo", todoSchema);