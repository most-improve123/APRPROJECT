const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "comercial_palermo"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Conectado a MySQL");
});

// 🔹 Ruta: Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      res.json({ message: "✅ Login exitoso", success: true });
    } else {
      res.json({ message: "❌ Usuario o contraseña incorrectos", success: false });
    }
  });
});

// 🔹 Ruta: Registro
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const checkQuery = "SELECT * FROM usuarios WHERE username = ?";
  db.query(checkQuery, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      return res.json({ message: "⚠️ El usuario ya existe", success: false });
    }

    const insertQuery = "INSERT INTO usuarios (username, password) VALUES (?, ?)";
    db.query(insertQuery, [username, password], (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ message: "🎉 Usuario registrado con éxito", success: true });
    });
  });
});

app.listen(5000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:5000");
});
