import axios from "axios";

import { IDealDTO } from "../../dtos/IDealDTO";

async function getDealInfo(): Promise<IDealDTO> {
  const response = await axios.get(
    `${process.env.PIPEDRIVE_URL}${process.env.PIPEDRIVE_API_KEY}`
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

// async function getDealItem(): Promise<void> {
//   const response = await axios.get(``);
// }

class CreateOrderByDealUseCase {
  //   constructor() {
  //   }

  async execute(): Promise<void> {
    const dealInfo = await getDealInfo();
    console.log(dealInfo);

    // console.log(dealWon);
  }
}

export { CreateOrderByDealUseCase };
