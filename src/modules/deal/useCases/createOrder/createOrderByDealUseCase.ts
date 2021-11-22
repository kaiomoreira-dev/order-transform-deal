import axios from "axios";
import { Builder } from "xml2js";

import { ICreateOrderDTO } from "../../dtos/ICreateOrderDTO";
import { IDealDTO } from "../../dtos/IDealDTO";

async function getDealInfo(): Promise<IDealDTO[]> {
  const response = await axios.get(
    `${process.env.PIPEDRIVE_URL_DEALS}${process.env.PIPEDRIVE_API_KEY}`
  );

  const { data } = response.data;
  console.log(data);
  if (data === null) {
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
      const dealWon: IDealDTO = {
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

async function getDealIProduct(): Promise<any[]> {
  const responseDeals = await axios.get(
    `${process.env.PIPEDRIVE_URL_DEALS}${process.env.PIPEDRIVE_API_KEY}`
  );

  const { data } = responseDeals.data;

  if (data === null) {
    throw new Error("No have deal!");
  }

  const dealID = data.map((element) => {
    if (element.status === "won") {
      const { id } = element;

      return id;
    }
    return dealID;
  });

  // console.log(dealID);

  // BUSCA PRODUTOS COM ID WON------
  const itens = await Promise.all(
    dealID.map(async (dealItem) => {
      const responseProducts = await axios.get(
        `https://api.pipedrive.com/v1/deals/${dealItem}/products?api_token=cb56f8ed2d027b2f539e93112e73ac474b00ea77`
      );

      const { data } = responseProducts.data;

      // console.log(data);

      if (data !== null) {
        const dataProd = await Promise.all(
          data.map(async (element) => {
            const { id, item_price, name, quantity, sum } = element;

            const product = {
              id,
              item_price,
              name_prod: name,
              quantity,
              sum,
            };

            // console.log(product);
            return product;
          })
        );
        // const { ...prod } = dataProd;

        // const pordObj = { ...prod };

        // console.log(pordObj);
        return dataProd;
      }

      // console.log(itens);
      return itens;
    })
  );

  // console.log(r);
  return itens as any[];
}

class CreateOrderByDealUseCase {
  //   constructor() {
  //   }

  async execute(): Promise<void> {
    const dealInfo = await getDealInfo();
    const dealProd = await getDealIProduct();

    // console.log(...dealProd);

    const unionInfo = [];

    const deal = unionInfo.concat(dealInfo, ...dealProd);

    const orderFull = deal.map((element) => {
      if (element !== undefined) {
        const {
          name_prod,
          quantity,
          item_price,
          person_name,
          status,
          title,
          value,
          org_name,
        } = element as ICreateOrderDTO;
        const order = {
          pedido: {
            titulo: title,
            cliente: {
              name: person_name,
            },
            volume: {
              service: "SEDEX",
            },
            item: {
              description: name_prod,
              qtde: quantity,
              vlr_unit: item_price,
            },
            parcela: {
              vlr: value,
            },
            status_won: status,
            organization: org_name,
          },
        };
        return order;
      }

      return orderFull;
    });

    const builder = new Builder();
    const xml = builder.buildObject(orderFull);

    console.log(xml);

    await axios
      .post(
        `https://bling.com.br/Api/v2/pedido/json/?apikey=c0cd88b8b5fc20d4176fed4a9c518ba264546244e14dfbabda5a42ecfa9934639d3b6d02?xml=${xml}`
      )
      .then((result) => {
        console.log("Pedido cadastrado", result);
      })
      .catch((err) => {
        console.log("Erro no cadastro do pedido", err.message);
      });

    // console.log(JSON.stringify(orderFull));

    // deal.forEach((element) => {
    //   console.log(element.org_name);
    // });

    // dealProd.forEach((element, index) => {
    //   if (element !== undefined) {
    //     const { ...sum } = element;
    //     console.log(sum);
    //   }
    // });

    // console.log(deal);
  }
}

export { CreateOrderByDealUseCase };
