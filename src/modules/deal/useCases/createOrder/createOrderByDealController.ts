import { Request, Response } from "express";

import { CreateOrderByDealUseCase } from "./createOrderByDealUseCase";

class CreateOrderByDealController {
  constructor(private createOrderByDealUseCase: CreateOrderByDealUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    await this.createOrderByDealUseCase.execute();

    return response.status(200).json();
  }
}

export { CreateOrderByDealController };
