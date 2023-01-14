import { Router } from "express";
import imagesRouter from "../controllers/images";

const router = Router();

router.post("/", imagesRouter.uploadImage);

export default router;
