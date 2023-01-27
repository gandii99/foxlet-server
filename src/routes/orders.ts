import { Router } from "express";
import ordersRouter from "../controllers/orders";

const router = Router();

router.post("/", ordersRouter.createOrder);
router.delete("/:id", ordersRouter.deleteOrder);
router.get("/my-orders", ordersRouter.getMyOrders);

export default router;
