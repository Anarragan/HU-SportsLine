import { Router } from 'express';
import { 
    createProductController, 
    getAllProductsController, 
    getProductByIdController, 
    updateProductController, 
    deleteProductController 
} from '../controllers/products.controllers.js';

const routerCustomers = Router();

routerCustomers.post('/', createProductController);
routerCustomers.get('/', getAllProductsController);
routerCustomers.get('/:id', getProductByIdController);
routerCustomers.patch('/:id', updateProductController);
routerCustomers.delete('/:id', deleteProductController);

export { routerCustomers };