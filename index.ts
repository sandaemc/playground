const serverless = require("serverless-http");
import * as express from "express";
import * as bodyParser from "body-parser";
import { inspect } from "util";
import { record } from "./lib/record";
import { play } from "./lib/play";

// TODO: Buy a local number
// TODO: Test for payload on forwarding; can I get the number his dialing to?

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use((req, res, next) => {
  console.log({
    body: inspect(req.body, false, null),
    params: req.params,
    query: req.query,
    originalUrl: req.originalUrl,
    path: req.path,
    baseUrl: req.baseUrl,
    method: req.method
  });

  next();
});

app.get("/", function(req, res) {
  res.send("VoicePO v0.5");
});

app.post("/record", async function(req, res) {
  res.send(record().toString());
});

app.get("/play", async function(req, res) {
  const response = await play();
  res.send(response.toString());
});

export const handler = serverless(app);
