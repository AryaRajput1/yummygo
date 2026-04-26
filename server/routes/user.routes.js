import { Router } from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/current", isAuth, getCurrentUser);

export default router;