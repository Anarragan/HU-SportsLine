# 🏪 HU-SportsLine API

API REST para gestión de productos y clientes de SportsLine, construida con Node.js, TypeScript y PostgreSQL. Incluye autenticación JWT, autorización por roles y gestión completa de órdenes con transacciones.

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Pruebas con Postman](#-pruebas-con-postman)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Modelos de Datos](#-modelos-de-datos)

## 🛠 Tecnologías

### Backend
- **Node.js** v20+ - Entorno de ejecución
- **TypeScript** v5.9 - Lenguaje de programación tipado
- **Express** v5.1 - Framework web

### Base de Datos
- **PostgreSQL** - Base de datos relacional
- **Sequelize** v6.37 - ORM para Node.js
- **Supabase** - Servicio de base de datos PostgreSQL en la nube

### Autenticación & Seguridad
- **JSON Web Tokens (JWT)** - Autenticación stateless
- **bcrypt** v6.0 - Hashing de contraseñas
- **Zod** v4.1 - Validación de esquemas

### DevOps
- **Docker** & **Docker Compose** - Contenedorización
- **PM2** v6.0 - Process Manager para producción
- **tsx** - Ejecución de TypeScript en desarrollo

### Testing
- **Jest** v30.2 - Framework de testing
- **Supertest** v7.1 - Testing de endpoints HTTP

## ✨ Características

- ✅ **Autenticación JWT** con tokens de acceso y refresh
- ✅ **Autorización por roles** (admin, seller, customer)
- ✅ **Gestión de productos** con códigos únicos y validación de stock
- ✅ **Gestión de clientes** con validaciones
- ✅ **Sistema de órdenes** con transacciones atómicas
- ✅ **Detalles de órdenes** con cálculo automático de subtotales
- ✅ **Validación de datos** con Zod schemas
- ✅ **Actualización automática de inventario** al crear órdenes
- ✅ **CORS habilitado** para integración con frontends
- ✅ **Containerización** con Docker

## 📁 Estructura del Proyecto

```
HU-SportsLine/
├── src/
│   ├── app.ts                      # Configuración de Express
│   ├── server.ts                   # Punto de entrada del servidor
│   ├── config/
│   │   ├── db.config.ts           # Configuración de Sequelize y Supabase
│   │   └── jwt.config.ts          # Configuración de JWT
│   ├── controllers/
│   │   ├── auth.controller.ts     # Controlador de autenticación
│   │   ├── customer.controllers.ts # Controlador de clientes
│   │   ├── products.controllers.ts # Controlador de productos
│   │   └── order.controller.ts    # Controlador de órdenes
│   ├── middlewares/
│   │   ├── auth.middleware.ts     # Middleware de autenticación JWT
│   │   ├── role.middleware.ts     # Middleware de autorización por roles
│   │   ├── validateSchema.ts      # Middleware de validación Zod
│   │   └── validateCode.ts        # Middleware de validación de códigos únicos
│   ├── models/
│   │   ├── index.ts               # Inicialización de modelos y relaciones
│   │   ├── users.ts               # Modelo de usuarios
│   │   ├── customers.ts           # Modelo de clientes
│   │   ├── products.ts            # Modelo de productos
│   │   ├── orders.ts              # Modelo de órdenes
│   │   └── order_details.ts       # Modelo de detalles de órdenes
│   ├── routes/
│   │   ├── index.ts               # Enrutador principal
│   │   ├── auth.routes.ts         # Rutas de autenticación
│   │   ├── customers.routes.ts    # Rutas de clientes
│   │   ├── products.routes.ts     # Rutas de productos
│   │   └── order.routes.ts        # Rutas de órdenes
│   ├── schema/
│   │   ├── auth.schema.ts         # Esquemas de validación de autenticación
│   │   ├── customers.schema.ts    # Esquemas de validación de clientes
│   │   ├── product.schema.ts      # Esquemas de validación de productos
│   │   └── order.schema.ts        # Esquemas de validación de órdenes
│   ├── services/
│   │   ├── auth.services.ts       # Lógica de negocio de autenticación
│   │   ├── customers.services.ts  # Lógica de negocio de clientes
│   │   ├── products.services.ts   # Lógica de negocio de productos
│   │   └── order.service.ts       # Lógica de negocio de órdenes
│   └── seeders/
│       └── mySeed.sql             # Seeds iniciales de la base de datos
├── .env                            # Variables de entorno (no versionado)
├── .env.test                       # Variables de entorno para testing
├── docker-compose.yml              # Configuración de Docker Compose (desarrollo)
├── docker-compose.prod.yml         # Configuración de Docker Compose (producción)
├── Dockerfile                      # Imagen de Docker
├── ecosystem.config.cjs            # Configuración de PM2
├── package.json                    # Dependencias del proyecto
└── tsconfig.json                   # Configuración de TypeScript
```

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v20 o superior - [Descargar](https://nodejs.org/)
- **npm** v10 o superior (viene con Node.js)
- **PostgreSQL** v14 o superior - [Descargar](https://www.postgresql.org/download/) (opcional si usas Supabase)
- **Docker** y **Docker Compose** (opcional) - [Descargar](https://www.docker.com/)
- **Postman** - [Descargar](https://www.postman.com/downloads/)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Anarragan/HU-SportsLine.git
cd HU-SportsLine
```

### 2. Instalar dependencias

```bash
npm install
```

## ⚙️ Configuración

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Supabase Configuration
SUPABASE_URL=tu_supabase_url
SUPABASE_ANON_KEY=tu_supabase_anon_key

# Database Configuration
DB_NAME=postgres
DB_HOST=tu_host_de_supabase
DB_PORT=6543
DB_USER=postgres.tu_proyecto
DB_PASSWORD=tu_password

# Server Configuration
PORT=3002

# JWT Secrets (genera tus propios secrets seguros)
JWT_SECRET=tu_jwt_secret_muy_largo_y_seguro
JWT_REFRESH=tu_jwt_refresh_secret_muy_largo_y_seguro
```

**Nota**: Puedes generar secrets seguros ejecutando en Node.js:
```javascript
require('crypto').randomBytes(64).toString('hex')
```

### 2. Configurar Base de Datos

#### Opción A: Usar Supabase (Recomendado)

1. Crea una cuenta en [Supabase](https://supabase.com/)
2. Crea un nuevo proyecto
3. Ve a `Settings > Database` y copia las credenciales de conexión
4. Ejecuta el script de seeds en el SQL Editor de Supabase:

```bash
# El contenido del archivo src/seeders/mySeed.sql
```

#### Opción B: PostgreSQL Local

1. Instala PostgreSQL en tu máquina
2. Crea una base de datos:
```bash
createdb sportsline
```
3. Ejecuta el script de seeds:
```bash
psql -d sportsline -f src/seeders/mySeed.sql
```

## 🏃 Ejecución

### Modo Desarrollo (recomendado para pruebas)

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:3002`

### Modo Producción

```bash
# Compilar TypeScript a JavaScript
npm run build

# Ejecutar el build
npm start
```

### Con Docker

```bash
# Desarrollo
docker compose up --build

# Producción
docker compose -f docker-compose.prod.yml up --build
```

## 🧪 Pruebas con Postman

### 1. Configurar Postman

1. Abre Postman
2. Crea una nueva colección llamada "HU-SportsLine API"
3. Configura una variable de entorno:
   - Variable: `baseUrl`
   - Valor: `http://localhost:3002`

### 2. Flujo de Pruebas Completo

#### A. Registro de Usuario

**Request:**
```http
POST {{baseUrl}}/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@sportsline.com",
  "password": "Admin123!",
  "role": "admin"
}
```

**Response esperado:**
```json
{
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@sportsline.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### B. Login

**Request:**
```http
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "admin@sportsline.com",
  "password": "Admin123!"
}
```

**Response esperado:**
```json
{
  "user": {
    "id": 1,
    "email": "admin@sportsline.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**⚠️ IMPORTANTE**: Copia el `token` de la respuesta para usarlo en las siguientes peticiones.

#### C. Crear Producto (requiere rol admin)

**Request:**
```http
POST {{baseUrl}}/products
Authorization: Bearer {tu_token_aqui}
Content-Type: application/json

{
  "code": "BAL-001",
  "name": "Balón de Fútbol Nike",
  "description": "Balón profesional tamaño 5",
  "price": 89.99,
  "stock": 50
}
```

**Response esperado:**
```json
{
  "id": 1,
  "code": "BAL-001",
  "name": "Balón de Fútbol Nike",
  "description": "Balón profesional tamaño 5",
  "price": 89.99,
  "stock": 50,
  "user_id": 1,
  "created_at": "2025-10-22T10:30:00.000Z",
  "updated_at": "2025-10-22T10:30:00.000Z"
}
```

#### D. Listar Productos

**Request:**
```http
GET {{baseUrl}}/products
Authorization: Bearer {tu_token_aqui}
```

#### E. Crear Cliente (requiere rol seller o admin)

**Request:**
```http
POST {{baseUrl}}/customers
Authorization: Bearer {tu_token_aqui}
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "phone": "+57 300 123 4567",
  "address": "Calle 123 #45-67"
}
```

#### F. Crear Orden

**Request:**
```http
POST {{baseUrl}}/orders
Authorization: Bearer {tu_token_aqui}
Content-Type: application/json

{
  "customer_id": 1,
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    }
  ]
}
```

**Response esperado:**
```json
{
  "id": 1,
  "customer_id": 1,
  "user_id": 1,
  "total": 179.98,
  "order_date": "2025-10-22T10:30:00.000Z",
  "created_at": "2025-10-22T10:30:00.000Z",
  "updated_at": "2025-10-22T10:30:00.000Z"
}
```

### 3. Configurar Autorización en Postman

Para no tener que copiar el token en cada petición:

1. En la colección "HU-SportsLine API", ve a la pestaña "Authorization"
2. Selecciona "Type: Bearer Token"
3. Crea una variable `{{token}}` y pégala ahí
4. Todas las peticiones heredarán automáticamente esta autorización

## 📚 Endpoints de la API

### Autenticación
| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Registrar nuevo usuario | No |
| POST | `/auth/login` | Iniciar sesión | No |
| POST | `/auth/refresh-token` | Refrescar token | No |
| POST | `/auth/logout` | Cerrar sesión | No |

### Productos
| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| POST | `/products` | Crear producto | admin |
| GET | `/products` | Listar productos | Autenticado |
| GET | `/products/:id` | Obtener producto | Autenticado |
| PATCH | `/products/:id` | Actualizar producto | admin |
| DELETE | `/products/:id` | Eliminar producto | admin |

### Clientes
| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| POST | `/customers` | Crear cliente | seller, admin |
| GET | `/customers` | Listar clientes | Autenticado |
| GET | `/customers/:id` | Obtener cliente | Autenticado |
| PATCH | `/customers/:id` | Actualizar cliente | admin |
| DELETE | `/customers/:id` | Eliminar cliente | admin |

### Órdenes
| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| POST | `/orders` | Crear orden | Autenticado |
| GET | `/orders` | Listar órdenes | Autenticado |

## 🗄️ Modelos de Datos

### Users (Usuarios)
```typescript
{
  id: number
  name: string
  email: string (unique)
  password: string (hashed)
  role: 'admin' | 'seller' | 'customer'
  created_at: Date
  updated_at: Date
}
```

### Products (Productos)
```typescript
{
  id: number
  code: string (unique)
  name: string
  description?: string
  price: number
  stock: number
  user_id: number (FK -> users)
  created_at: Date
  updated_at: Date
}
```

### Customers (Clientes)
```typescript
{
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  created_at: Date
  updated_at: Date
}
```

### Orders (Órdenes)
```typescript
{
  id: number
  customer_id: number (FK -> customers)
  user_id: number (FK -> users)
  order_date: Date
  total: number
  created_at: Date
  updated_at: Date
}
```

### Order Details (Detalles de Órdenes)
```typescript
{
  id: number
  order_id: number (FK -> orders)
  product_id: number (FK -> products)
  quantity: number
  unit_price: number
  subtotal: number (calculado automáticamente)
  created_at: Date
  updated_at: Date
}
```

## 🔐 Roles y Permisos

| Rol | Permisos |
|-----|----------|
| **admin** | Acceso total: crear/editar/eliminar productos, clientes y órdenes |
| **seller** | Crear clientes, crear órdenes, ver productos |

## 🐛 Solución de Problemas

### Error: "Unable to connect to the database"
- Verifica que las credenciales de la base de datos en `.env` sean correctas
- Asegúrate de que Supabase esté activo o PostgreSQL esté corriendo

### Error: "Token expired"
- El token JWT tiene una duración de 15 minutos
- Usa el endpoint `/auth/refresh-token` con tu refresh token para obtener un nuevo token

### Error: "Port 3002 is already in use"
- Cambia el puerto en el archivo `.env`
- O detén el proceso que está usando el puerto 3002

## 📝 Scripts Disponibles

```bash
npm run dev          # Ejecutar en modo desarrollo con hot-reload
npm run build        # Compilar TypeScript a JavaScript
npm start            # Ejecutar la versión compilada
npm test             # Ejecutar tests (si están configurados)
```

## 👥 Autores

- **Anarragan** - [GitHub](https://github.com/Anarragan)

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella en GitHub!