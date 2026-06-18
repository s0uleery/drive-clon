# Drive Clon

Aplicación web tipo Google Drive que permite subir, visualizar y descargar archivos. Los archivos se almacenan en un bucket S3 simulado localmente con LocalStack.

## Tecnologías utilizadas

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Almacenamiento:** LocalStack (S3)
- **Infraestructura:** Terraform
- **Contenedores:** Docker

## Requisitos previos

Tener instalado:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/) v18 o superior
- [Terraform](https://developer.hashicorp.com/terraform/install)

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
LOCALSTACK_AUTH_TOKEN=ls-nANA8409-BAZi-0724-xIGI-lUqiSAKo418c
```

Crea un archivo `.env` dentro de la carpeta `backend/` con:

```env
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_REGION=us-east-1
S3_ENDPOINT=http://127.0.0.1:4566
S3_BUCKET=drive-clon-bucket
PORT=3000
```

##  Instrucciones para ejecutar

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/drive-clon.git
cd drive-clon
```

### 2. Levantar LocalStack

```bash
docker compose up -d
```

### 3. Crear el bucket S3 con Terraform

```bash
cd infra
terraform init
terraform apply
cd ..
```

### 4. Iniciar el Backend

```bash
cd backend
npm install
npm run dev
```

### 5. Iniciar el Frontend

Abre una nueva terminal:

```bash
cd frontend
npm install
npm run dev
```

### 6. Abrir la aplicación

Abre tu navegador en:
http://localhost:5173

## Estructura del proyecto
drive-clon/

├── frontend/          # React + Vite

├── backend/           # Node.js + Express

│   ├── src/

│   │   ├── index.js

│   │   ├── s3Client.js

│   │   └── s3Service.js

├── infra/             # Terraform

│   └── main.tf

├── docker-compose.yml

└── README.md

## Endpoints del Backend

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/upload` | Sube un archivo a S3 |
| GET | `/files` | Lista los archivos en S3 |
| GET | `/download/:filename` | Descarga un archivo |
| DELETE | `/delete/:filename` | Elimina un archivo |