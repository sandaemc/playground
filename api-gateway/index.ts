import * as serverless from "serverless-http";
import * as express from "express";
import * as bodyParser from "body-parser";
import { routes as apiRoutes } from "./resource";

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.get("/", function(req, res) {
  res.send("API Gateway v1.0");
});

// POST /api
// PUT /api/:apiName
// GET /api:/apiName
app.use("/resources", apiRoutes);

export const handler = serverless(app);
