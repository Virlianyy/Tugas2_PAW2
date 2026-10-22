// Mini Project - Pertemuan 3-4: RESTful API CRUD dengan Express.js 
// Entitas: To-Do Tugas (id, judul, deskripsi, tenggatWaktu, status) 
// Memudahkan mahasiswa dan karyawan dalam mengelola deadline.
 
const express = require("express"); 
const app = express(); 
const PORT = 3000; 
 
app.use(express.json()); 
 
// Data awal untuk simulasi database tugas
let daftarTugas = [ 
  { 
    id: 1, 
    judul: "Revisi Laporan Magang", 
    deskripsi: "Memperbaiki bab 2 sesuai masukan dosen pembimbing", 
    tenggatWaktu: "2026-10-01", 
    status: "Belum Selesai" 
  }, 
  { 
    id: 2, 
    judul: "Kumpul Tugas Besar Pemrograman Web", 
    deskripsi: "Link repo GitHub dikirim ke portal kampus", 
    tenggatWaktu: "2026-09-28", 
    status: "Belum Selesai" 
  }, 
  { 
    id: 3, 
    judul: "Kumpul Laporan Proyek Akhir ANSI", 
    deskripsi: "Kirimkan file PDF ke spon", 
    tenggatWaktu: "2026-09-30", 
    status: "Selesai" 
  }, 
]; 
 
// TODO 1: GET /todo -> kirim seluruh data tugas sebagai JSON 
app.get("/todo", (req, res) => { 
  res.json(daftarTugas); 
}); 
 
// TODO 2: GET /todo/:id -> cari data tugas berdasarkan id, 
// kirim 404 dengan { message: 'Tugas tidak ditemukan' } jika tidak ada 
app.get("/todo/:id", (req, res) => { 
  const id = parseInt(req.params.id); 
 
  const tugas = daftarTugas.find((item) => item.id === id); 
 
  if (!tugas) { 
    return res.status(404).json({ 
      message: "Tugas tidak ditemukan", 
    }); 
  }

  res.json(tugas);
}); 
 
// TODO 3: POST /todo -> ambil { judul, deskripsi, tenggatWaktu, status } dari req.body, 
// buat objek baru dengan id = daftarTugas.length + 1, simpan ke array, 
// kirim response dengan status 201 
app.post("/todo/post", (req, res) => { 
  const { judul, deskripsi, tenggatWaktu, status } = req.body; 
 
  const tugasBaru = { 
    id: daftarTugas.length + 1, 
    judul: judul, 
    deskripsi: deskripsi || "", 
    tenggatWaktu: tenggatWaktu, 
    status: status || "Belum Selesai", 
  }; 
 
  daftarTugas.push(tugasBaru); 
 
  res.status(201).json(tugasBaru); 
}); 
 
// TODO 4: PUT /todo/:id -> cari index berdasarkan id, 
// jika tidak ditemukan kirim 404, jika ditemukan gabungkan data lama 
// dengan req.body lalu kirim data yang telah diperbarui 
app.put("/todo/put/:id", (req, res) => { 
  const id = parseInt(req.params.id); 
 
  const index = daftarTugas.findIndex((item) => item.id === id); 
 
  if (index === -1) { 
    return res.status(404).json({ 
      message: "Tugas tidak ditemukan", 
    }); 
  } 
 
  daftarTugas[index] = { 
    ...daftarTugas[index], 
    ...req.body, 
  }; 
 
  res.json(daftarTugas[index]); 
}); 
 
// TODO 5: DELETE /todo/:id -> cari index berdasarkan id, 
// jika tidak ditemukan kirim 404, jika ditemukan hapus dari array 
// dan kirim response dengan status 204 
app.delete("/todo/delete/:id", (req, res) => { 
  const id = parseInt(req.params.id); 
 
  const index = daftarTugas.findIndex((item) => item.id === id); 
 
  if (index === -1) { 
    return res.status(404).json({ 
      message: "Tugas tidak ditemukan", 
    }); 
  } 
 
  daftarTugas.splice(index, 1); 
 
  res.status(204).send(); 
}); 
 
app.listen(PORT, () => { 
  console.log(`Server berjalan di http://localhost:${PORT}`); 
}); 
