import { Router } from "express";
import { createOrderController, getOrdersController } from "../controllers/order.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { createOrderSchema } from "../schema/order.schema.js";

const routerOrders = Router();

routerOrders.post("/", authenticateToken, validateSchemaMiddleware(createOrderSchema), createOrderController);
routerOrders.get("/", authenticateToken, getOrdersController);

export { routerOrders };
