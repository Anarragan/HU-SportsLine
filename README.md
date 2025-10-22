# HU-SportsLine

Proyecto backend inicial para SportsLine: base preparada con Node.js, Typescript y PostgreSQL para desarrollo y despliegue con Docker.

## Tecnologías
- Node.js + TypeScript
- Express
- Sequelize (PostgreSQL)
- Docker / Docker Compose
- PM2 para ejecución en producción
- Supabase client (uso auxiliar)
- Herramientas de desarrollo: tsx, ts-node, jest, supertest

## Estructura principal
- [src/app.ts](src/app.ts) — exporta la función [`createApp`](src/app.ts) que monta Express.
- [src/server.ts](src/server.ts) — arranque del servidor y llamada a [`connectDB`](src/config/db.config.ts).
- [src/config/db.config.ts](src/config/db.config.ts) — configuración de Sequelize y exporta [`connectDB`](src/config/db.config.ts) y `sequelize`.
- [src/models/index.ts](src/models/index.ts) — inicializa modelos y relaciones con [`initModels`](src/models/index.ts).
- Modelos generados: [src/models/users.ts](src/models/users.ts), [src/models/products.ts](src/models/products.ts), [src/models/customers.ts](src/models/customers.ts), [src/models/orders.ts](src/models/orders.ts).
- Seeds: [src/seeders/mySeed.sql](src/seeders/mySeed.sql).
- Rutas: [src/routes/index.ts](src/routes/index.ts).

## Tareas completadas (HU)
- Nombre de la HU y setup inicial del proyecto.
- TASK1: Inicialización Node.js + TypeScript (ver [package.json](package.json) y [tsconfig.json](tsconfig.json)).
- TASK2: Estructura modular (models, controllers, routes, middlewares).
- TASK3: Configuración Sequelize + PostgreSQL (ver [src/config/db.config.ts](src/config/db.config.ts) y modelos en [src/models/index.ts](src/models/index.ts) usando [`initModels`](src/models/index.ts)).
- TASK4: Seeds iniciales para usuarios y productos ([src/seeders/mySeed.sql](src/seeders/mySeed.sql)).
- TASK5: Repositorio y estrategia Gitflow (main / develop / feature/*).
- TASK6: Docker y Docker Compose (ver [Dockerfile](Dockerfile), [docker-compose.yml](docker-compose.yml) y [docker-compose.prod.yml](docker-compose.prod.yml)).
  - Variables de entorno de pruebas en [.env.test](.env.test).

## Cómo ejecutar
Desarrollo (local sin contenedor):
- Instalar dependencias: npm ci
- Levantar en modo dev: npm run dev

Compilar y ejecutar:
- Compilar: npm run build
- Ejecutar build: npm start (arranca el archivo compilado en `dist/server.js`)

Con Docker (compose):
- Levantar servicios: docker compose up --build
- Compose de producción: docker compose -f docker-compose.prod.yml up --build

## Puntos importantes y criterios de aceptación
- Proyecto tipado con TypeScript y estructura modular.
- Integración Sequelize ↔ PostgreSQL y modelos iniciales (Usuario, Producto, Cliente, Orden).
- Seeds para datos básicos.
- Docker configurado con volúmenes, network y límites de recursos.
- Scripts de build y start en [package.json](package.json).

## Referencias rápidas en el código
- Inicialización de la app: [`createApp`](src/app.ts) — [src/app.ts](src/app.ts)  
- Conexión DB: [`connectDB`](src/config/db.config.ts) — [src/config/db.config.ts](src/config/db.config.ts)  
- Inicialización modelos: [`initModels`](src/models/index.ts) — [src/models/index.ts](src/models/index.ts)  
- Archivo de seed: [src/seeders/mySeed.sql](src/seeders/mySeed.sql)  
- Dockerfile: [Dockerfile](Dockerfile)  
- Docker Compose (dev/test): [docker-compose.yml](docker-compose.yml) (.env usado: [.env.test](.env.test))  
- PM2 config: [ecosystem.config.cjs](ecosystem.config.cjs)

## autenticacion y autorizacion por roles con jwt done

## Próximos pasos sugeridos
- Implementar controladores y DTO/DAOs completos.
- Tests automatizados para endpoints críticos.
- Pipeline CI/CD para build y despliegue.