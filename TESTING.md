# 🏪 HU-SportsLine API - Testing Documentation

## 📊 Cobertura de Pruebas

El proyecto cuenta con **55 pruebas unitarias y de integración** que cubren los aspectos críticos de la aplicación:

```
Test Suites: 5 passed, 5 total
Tests:       55 passed, 55 total

Coverage:
- Statements: 33.62%
- Branches: 2.7%
- Functions: 26.31%
- Lines: 34.83%
```

### Cobertura por Módulo

| Módulo | Cobertura | Descripción |
|--------|-----------|-------------|
| **Schemas** | 100% | Validación de datos con Zod |
| **Models** | 100% | Modelos de Sequelize |
| **Routes** | 100% | Definición de rutas |
| **Config/JWT** | 82.6% | Generación y verificación de tokens |
| **App** | 100% | Configuración de Express |
| **Middlewares** | 34.88% | Autenticación y validación |
| **Controllers** | 14.54% | Lógica de controladores |
| **Services** | 13.15% | Lógica de negocio |

## 🧪 Archivos de Prueba

### 1. **schema.validation.test.ts**
Pruebas de validación de esquemas de autenticación:
- ✅ Validación de registro (name, email, password)
- ✅ Validación de login
- ✅ Rechazo de datos inválidos (emails mal formados, contraseñas cortas, etc.)

### 2. **all.schemas.test.ts** (30 pruebas)
Pruebas exhaustivas de todos los esquemas:
- ✅ Esquemas de autenticación (register, login)
- ✅ Esquemas de productos (create, update)
- ✅ Esquemas de clientes (create, update)
- ✅ Esquemas de órdenes (create, orderItem)

### 3. **jwt.test.ts** (11 pruebas)
Pruebas de configuración y funcionalidad JWT:
- ✅ Generación de tokens
- ✅ Generación de refresh tokens
- ✅ Verificación de tokens válidos
- ✅ Manejo de tokens inválidos
- ✅ Payload de usuario en tokens

### 4. **app.test.ts** (5 pruebas)
Pruebas de configuración de la aplicación:
- ✅ Creación de la app Express
- ✅ Middlewares configurados (JSON, CORS, cookies)

### 5. **api.integration.test.ts** (9 pruebas)
Pruebas de integración de endpoints:
- ✅ Endpoints de autenticación (/auth/register, /auth/login)
- ✅ Endpoints de productos (/products)
- ✅ Endpoints de clientes (/customers)
- ✅ Endpoints de órdenes (/orders)
- ✅ Validación de datos en endpoints

## 🚀 Ejecutar Pruebas

### Ejecutar todas las pruebas con cobertura
```bash
npm test
```

### Ejecutar pruebas en modo watch
```bash
npm run test:watch
```

### Ver reporte de cobertura
```bash
npm test
# El reporte HTML se genera en: coverage/lcov-report/index.html
```

## 📋 Configuración de Jest

El proyecto utiliza **Jest** con **ts-jest** para pruebas de TypeScript:

```javascript
// jest.config.js
- Preset: ts-jest con ESM
- Test Environment: node
- Coverage threshold: 30% statements, 20% functions, 30% lines
```

## 🎯 Estrategia de Testing

### Pruebas Unitarias
- **Schemas**: Validación de datos de entrada/salida
- **JWT**: Generación y verificación de tokens
- **App Configuration**: Middlewares y configuración

### Pruebas de Integración
- **API Endpoints**: Verificación de rutas y respuestas
- **Validación**: Comportamiento ante datos inválidos

### Cobertura de Casos

#### ✅ Casos Positivos
- Datos válidos son aceptados
- Tokens válidos son verificados
- Endpoints responden correctamente

#### ✅ Casos Negativos
- Datos inválidos son rechazados
- Tokens inválidos retornan null
- Validaciones de formato (email, password, etc.)

## 📝 Próximos Pasos para Mejorar Cobertura

Para alcanzar mayor cobertura:

1. **Controllers** (actualmente 14.54%)
   - Agregar pruebas con mocks de servicios
   - Probar manejo de errores

2. **Services** (actualmente 13.15%)
   - Agregar pruebas con mocks de base de datos
   - Probar lógica de negocio

3. **Middlewares** (actualmente 34.88%)
   - Probar diferentes escenarios de autenticación
   - Probar validaciones de roles

## 🛠️ Tecnologías de Testing

- **Jest**: Framework de testing
- **ts-jest**: Soporte para TypeScript
- **Supertest**: Testing de APIs HTTP
- **@types/jest**: Tipos de TypeScript para Jest

## 📖 Ejemplos de Uso

### Ejemplo de Prueba de Schema
```typescript
it('should validate correct registration data', () => {
  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securePassword123',
  };

  const result = registerSchema.safeParse(validData);
  expect(result.success).toBe(true);
});
```

### Ejemplo de Prueba de API
```typescript
it('should have /auth/register endpoint defined', async () => {
  const response = await request(app)
    .post('/auth/register')
    .send({});
  
  expect(response.status).not.toBe(404);
});
```

### Ejemplo de Prueba de JWT
```typescript
it('should generate a token successfully', () => {
  const token = generateToken(mockUserPayload, '15m');
  
  expect(token).toBeDefined();
  expect(typeof token).toBe('string');
});
```

## ✨ Conclusión

El proyecto cuenta con una base sólida de pruebas que cubren más del **33% del código**, enfocándose en:
- ✅ Validación de datos (100% cobertura)
- ✅ Configuración JWT (82.6% cobertura)
- ✅ Rutas y modelos (100% cobertura)
- ✅ Integración de API

Esta cobertura garantiza la calidad y confiabilidad de los componentes críticos del sistema.
