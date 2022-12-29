import { Router } from "express";
import authRouter from "../controllers/auth";

const router = Router();

router.post("/register", authRouter.registerUser);
router.post("/login", authRouter.loginUser);
// router.get("/logout", authRouter.logout);

export default router;
