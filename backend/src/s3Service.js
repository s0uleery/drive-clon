import {
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
   DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { s3 } from "./s3Client.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Cargar variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../../.env") });

const BUCKET = process.env.S3_BUCKET || "drive-clon-bucket";

// Subir archivo
export const uploadFile = async (file) => {
  // Arregla problema de las tildes
  const cleanName = Buffer.from(file.originalname, 'latin1').toString('utf8');
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: cleanName,
    Body: file.buffer,
    ContentType: file.mimetype,
  });
  await s3.send(command);
  return cleanName;
};
// Listar archivos
export const listFiles = async () => {
  const command = new ListObjectsV2Command({ Bucket: BUCKET });
  const response = await s3.send(command);
  return response.Contents || [];
};
// Descargar archivos
export const downloadFile = async (filename) => {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: filename,
  });
  const response = await s3.send(command);
  return response.Body;
};
// Eliminar archivos
export const deleteFile = async (filename) => {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: filename,
  });
  await s3.send(command);
  return filename;
};