import { Router } from "express";
import { createOrEditShop } from "../controllers/shop.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create-edit", isAuth, upload.single("image"), createOrEditShop);

export default router;
