import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to the SportsLine API!");
});

export default router;