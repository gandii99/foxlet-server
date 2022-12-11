import { Router } from "express";
import employeesRouter from "../controllers/employees";

const router = Router();

router.post("/", employeesRouter.create);
// router.post("/login", authRouter.login);
// router.get("/logout", authRouter.logout);

export default router;
