# Drive Clon

Aplicación web tipo Google Drive que permite subir, descargar, eliminar archivos. 
Los archivos se almacenan en un bucket S3 simulado localmente con LocalStack.

## Tecnologías utilizadas

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Almacenamiento:** LocalStack (S3)
- **Infraestructura:** Terraform
- **Contenedores:** Docker

## Requisitos previos para utilizar

Tener instalado:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/) v18 o superior
- [Terraform](https://developer.hashicorp.com/terraform/install)

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables: (tiene la variable real)

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

##  Instrucciones para iniciar

### Clonar el repositorio o descargar el repositorio

```bash
git clone https://github.com/usuario/drive-clon.git
cd drive-clon
```

### Levantar LocalStack y crear el bucket S3 con Terraform

```bash
docker compose up -d
```

```bash
cd infra
terraform init
terraform apply
```

### Iniciar el Backend

```bash
cd backend
npm install
npm run dev
```

### Iniciar el Frontend

```bash
cd frontend
npm install
npm run dev
```

### Abrir la aplicación
http://localhost:5173

## Endpoints del Backend

POST : `/upload` Sube un archivo
GET : `/files` Lista los archivos
GET : `/download/:filename` Descarga un archivo
DELETE : `/delete/:filename` Elimina un archivo 


