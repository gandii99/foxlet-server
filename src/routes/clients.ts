import { Router } from "express";
import clientsRouter from "../controllers/clients";

const router = Router();

router.post("/", clientsRouter.createClient);
router.get("/", clientsRouter.getAllClients);
router.patch("/my-clients/:id", clientsRouter.updateMyClient);
router.delete("/my-clients/:id", clientsRouter.deleteClient);
router.get("/my-clients", clientsRouter.getMyClients);
router.get("/:id", clientsRouter.getSelectedClient);

export default router;
