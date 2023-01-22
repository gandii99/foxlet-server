import { Router } from "express";
import clientsRouter from "../controllers/clients";

const router = Router();

router.post("/", clientsRouter.createClient);
router.get("/", clientsRouter.getAllClients);
router.patch("/my-client/:id", clientsRouter.updateMyClient);
router.get("/my-client", clientsRouter.getMyClients);
router.delete("/my-client/:id", clientsRouter.deleteMyCompany);
router.get("/:id", clientsRouter.getSelectedClient);

export default router;
