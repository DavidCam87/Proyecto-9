require("dotenv").config();
const portatilesRouter = require("./src/api/routes/portatil")
const { connectDB } = require("./src/config/db");
const express = require("express");



const app = express();
app.use(express.json());
connectDB()
const PORT = 3000;



app.use("/api/v1/portatiles", portatilesRouter);


app.use("*", (req, res, next) => {
  return res.status(404).json("Rute not foud 😢😢😭")
});
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT} 👌🏼🆗😉`);
}); 