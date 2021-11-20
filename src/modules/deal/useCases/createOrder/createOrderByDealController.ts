import { Request, Response } from "express";

import { CreateOrderByDealUseCase } from "./createOrderByDealUseCase";

class createOrderByDealController {
  constructor(private createOrderByDealUseCase: CreateOrderByDealUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const deal = await this.createOrderByDealUseCase.execute();

    return response.status(200).json(deal);
  }
}

export { createOrderByDealController };
