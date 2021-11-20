import { Router } from "express";

import { createOrderByDealController } from "../../../../modules/deal/useCases/createOrder";

const ordersRoutes = Router();

ordersRoutes.get("/", (request, response) => {
  return createOrderByDealController.handle(request, response);
});

export { ordersRoutes };
