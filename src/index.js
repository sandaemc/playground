const express = require("express");
const bodyParser = require("body-parser");
const transactions = require("./transactions");
const { dbMiddleware } = require("./database");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(dbMiddleware);

app.get("/", function(req, res) {
  res.send("Budget API v1.0");
});

app.use("/transactions", transactions.routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Listening on port: " + PORT));
