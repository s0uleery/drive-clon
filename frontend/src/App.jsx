import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:3000";

function App() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const res = await axios.get(`${API}/files`);
    const sorted = res.data.sort(
      (a, b) => new Date(b.LastModified) - new Date(a.LastModified)
    );
    setFiles(sorted.slice(0, 3));
  };

  const handleUpload = async (file) => {
    setUploading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`${API}/upload`, formData);
      setMessage(`"${file.name}" subido correctamente`);
      fetchFiles();
    } catch {
      setMessage("Error al subir el archivo");
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (filename) => {
    const res = await axios.get(`${API}/download/${filename}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDelete = async (filename) => {
    await axios.delete(`${API}/delete/${filename}`);
    setMessage(`"${filename}" eliminado`);
    fetchFiles();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="container">
      <h1>Drive Clon</h1>
      <p className="subtitle">Valentina López</p>
      <div className="main">
        <div className="upload-section">
          <h2>Carga de documentos</h2>
          <div
            className={`dropzone ${dragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploading ? "Subiendo..." : "Arrastra tu archivo aquí"}
          </div>
          <input
            type="file"
            id="fileInput"
            onChange={handleInputChange}
            style={{ display: "none" }}
          />
          <button onClick={() => document.getElementById("fileInput").click()}>
            Cargar archivo
          </button>
          {message && <p className="message">{message}</p>}
        </div>

        <div className="files-section">
          <h2>Archivos recientes</h2>
          {files.length === 0 ? (
            <p className="empty">No hay archivos aún</p>
          ) : (
            files.map((file) => (
              <div key={file.Key} className="file-card">
              <div className="file-info">
                <p className="filename">{file.Key}</p>
                <p className="date">{new Date(file.LastModified).toLocaleDateString()}</p>
              </div>
                <div className="actions">
                  <button onClick={() => handleDownload(file.Key)}>
                    Descargar
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(file.Key)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;