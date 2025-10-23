import { Router } from 'express';
import { 
    createCustomerController,
    getAllCustomersController,
    getCustomerByIdController,
    updateCustomerController,
    deleteCustomerController
} from '../controllers/customer.controllers.js';
import { createCustomerSchema } from '../schema/customers.schema.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchema.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { rolMiddleware } from '../middlewares/role.middleware.js';

const routerCustomers = Router();

routerCustomers.post('/', authenticateToken, rolMiddleware('seller'), validateSchemaMiddleware(createCustomerSchema), createCustomerController);
routerCustomers.get('/', authenticateToken, getAllCustomersController);
routerCustomers.get('/:id', authenticateToken, getCustomerByIdController);
routerCustomers.patch('/:id', authenticateToken, rolMiddleware('admin'), updateCustomerController);
routerCustomers.delete('/:id', authenticateToken, rolMiddleware('admin'), deleteCustomerController);

export { routerCustomers };