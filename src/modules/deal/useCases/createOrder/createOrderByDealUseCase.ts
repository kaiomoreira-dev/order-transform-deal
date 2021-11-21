import axios from "axios";

import { IDealDTO } from "../../dtos/IDealDTO";
import { IDealItemDTO } from "../../dtos/IDealItemDTO";

async function getDealInfo(): Promise<IDealDTO> {
  const response = await axios.get(
    `${process.env.PIPEDRIVE_URL_DEALS}${process.env.PIPEDRIVE_API_KEY}`
  );

  const { data } = response.data;

  if (data.length === null) {
    throw new Error("No have deal!");
  }

  const deal = data.map((element) => {
    if (element.status === "won") {
      const {
        id,
        title,
        value,
        status,
        products_count,
        org_name,
        person_name,
        next_activity_subject,
      } = element as IDealDTO;
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
      return dealWon;
    }
    return deal;
  });
  return deal;
}

async function getDealItem(): Promise<IDealItemDTO> {
  const responseDeals = await axios.get(
    `${process.env.PIPEDRIVE_URL_DEALS}${process.env.PIPEDRIVE_API_KEY}`
  );

  const { data } = responseDeals.data;

  if (data.length === null) {
    throw new Error("No have deal!");
  }

  const dealID = data.map((element) => {
    if (element.status === "won") {
      const { id } = element as IDealDTO;

      return id;
    }
    return dealID;
  });

  const itens: any = await Promise.all(
    await dealID.map(async (dealItem) => {
      const responseProducts = await axios.get(
        `https://api.pipedrive.com/v1/deals/${dealItem}/products?api_token=cb56f8ed2d027b2f539e93112e73ac474b00ea77`
      );
      // console.log(responseProducts.data);

      const dealItens = responseProducts.data.data;

      // const { id, item_price, name, quantity } = dealItens as IDealItemDTO;

      // const item = { id, item_price, name, quantity };

      // console.log(dealItens);

      return dealItens;
    })
  );

  return itens;
}

class CreateOrderByDealUseCase {
  //   constructor() {
  //   }

  async execute(): Promise<void> {
    // const dealInfo = await getDealInfo();
    const dealItem = await getDealItem();

    console.log(dealItem);
    // console.log(dealInfo);

    // console.log(dealWon);
  }
}

export { CreateOrderByDealUseCase };
