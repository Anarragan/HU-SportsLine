import { Router } from 'express';
import { createProductController, getAllProductsController, getProductByIdController, updateProductController, deleteProductController } from '../controllers/products.controllers.js';

const routerProducts = Router();

routerProducts.post('/', createProductController);
routerProducts.get('/', getAllProductsController);
routerProducts.get('/:id', getProductByIdController);
routerProducts.patch('/:id', updateProductController);
routerProducts.delete('/:id', deleteProductController);

export default routerProducts;
