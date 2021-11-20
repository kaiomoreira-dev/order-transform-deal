import { Router } from "express";

import { ordersRoutes } from "./order.routes";

const router = Router();

router.use("/order", ordersRoutes);

export { router };
