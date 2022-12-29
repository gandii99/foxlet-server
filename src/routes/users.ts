import { Router } from "express";
import usersRouter from "../controllers/users";

const router = Router();

router.get("/", usersRouter.getAllUsers);
router.get("/:id", usersRouter.getSelectedUsers);

export default router;
