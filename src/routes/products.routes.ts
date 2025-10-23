import { Router } from 'express';
import { createProductController, getAllProductsController, getProductByIdController, updateProductController, deleteProductController } from '../controllers/products.controllers.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchema.js';
import { createProductSchema, updateProductSchema } from '../schema/product.schema.js';
import { checkUniqueProductCode } from '../middlewares/validateCode.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { rolMiddleware } from '../middlewares/role.middleware.js';

const routerProducts = Router();

routerProducts.post('/', authenticateToken, rolMiddleware('admin') , validateSchemaMiddleware(createProductSchema), checkUniqueProductCode, createProductController);
routerProducts.get('/', authenticateToken, getAllProductsController);
routerProducts.get('/:id', authenticateToken, getProductByIdController);
routerProducts.patch('/:id', authenticateToken, rolMiddleware('admin'), validateSchemaMiddleware(updateProductSchema), updateProductController);
routerProducts.delete('/:id', authenticateToken, rolMiddleware('admin'), deleteProductController);

export default routerProducts;
