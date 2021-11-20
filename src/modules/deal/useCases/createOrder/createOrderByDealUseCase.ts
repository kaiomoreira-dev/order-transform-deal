import axios from "axios";

import { IDealDTO } from "../../dtos/IDealDTO";

async function getDealInfo(): Promise<IDealDTO> {
  const response = await axios.get(
    `https://api.pipedrive.com/v1/deals/?api_token=cb56f8ed2d027b2f539e93112e73ac474b00ea77`
  );
  const data = response.data.data[2] as IDealDTO;

  return data;
}

async function getDealItem(): Promise<IDealItem>;

class CreateOrderByDealUseCase {
  //   constructor() {
  //   }

  async execute(): Promise<void> {
    const deal = await getDealInfo();

    console.log(deal);

    const {
      id,
      title,
      value,
      status,
      products_count,
      org_name,
      person_name,
      next_activity_subject,
    } = deal as IDealDTO;

    const dealWon = {
      id,
      title,
      value,
      status,
      products_count,
      org_name,
      person_name,
      next_activity_subject,
    };

    console.log(dealWon);
  }
}

export { CreateOrderByDealUseCase };
