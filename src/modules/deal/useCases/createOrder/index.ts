import { CreateOrderByDealController } from "./createOrderByDealController";
import { CreateOrderByDealUseCase } from "./createOrderByDealUseCase";

const createOrderByDealUseCase = new CreateOrderByDealUseCase();
const createOrderByDealController = new CreateOrderByDealController(
  createOrderByDealUseCase
);

export { createOrderByDealController };
