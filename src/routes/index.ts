import { Router } from "express";
import { routerAuth } from "./auth.routes.js";
const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to the SportsLine API!");
});

router.use("/auth", routerAuth);


export default router;