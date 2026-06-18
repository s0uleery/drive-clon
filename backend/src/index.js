import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { uploadFile, listFiles, downloadFile, deleteFile } from "./s3Service.js";

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

//ENDPOINTS
// Subir archivo
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filename = await uploadFile(req.file);
    res.json({ message: "Archivo subido correctamente", filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al subir el archivo" });
  }
});

// Listar archivos
app.get("/files", async (req, res) => {
  try {
    const files = await listFiles();
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar archivos" });
  }
});

// Descargar archivo
app.get("/download/:filename", async (req, res) => {
  try {
    const stream = await downloadFile(req.params.filename);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${req.params.filename}"`
    );
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al descargar el archivo" });
  }
});
// Eliminar archivo
app.delete("/delete/:filename", async (req, res) => {
  try {
    await deleteFile(req.params.filename);
    res.json({ message: "Archivo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el archivo" });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});