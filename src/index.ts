require('dotenv').config();
import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.send("API v1.0");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Listening on port: " + PORT));
