import axios from "axios";

class CreateOrderByDealUseCase {
  //   constructor() {
  //   }

  async execute(): Promise<any> {
    const dealPipeDrive = await axios.get(
      `${process.env.PIPEDRIVE_URL}/${process.env.PIPEDRIVE_API_KEY}`
    );

    return dealPipeDrive;
  }
}

export { CreateOrderByDealUseCase };
