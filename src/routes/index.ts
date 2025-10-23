import { Router } from "express";
import { routerAuth } from "./auth.routes.js";
import routerProducts from "./products.routes.js";
import {routerCustomers} from "./customers.routes.js";
import { routerOrders } from "./order.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to the SportsLine API!");
});
 
router.use("/auth", routerAuth);
router.use("/products", routerProducts);
router.use("/customers", routerCustomers);
router.use("/orders", routerOrders);

export default router;