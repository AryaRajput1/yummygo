import { Router } from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import { addItem, updateItem } from "../controllers/item.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/add-item", isAuth, upload.single("image"), addItem);
router.post("/update-item/:id", isAuth, upload.single("image"), updateItem);

export default router;
