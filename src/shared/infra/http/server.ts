import * as express from "express";

import "dotenv/config";
import { router } from "./routes";

const app = express();

app.use(router);

app.listen(3333, () => {
  console.log("Server listening on port 3333");
});
