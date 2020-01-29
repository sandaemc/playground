require("dotenv").config();

import Axios from "axios";

const headers = {
  Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
  g1es_token: process.env.G1ES_TOKEN,
  Origin: "https://www.globe.com.ph",
  "Content-Type": "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.0 Safari/537.36 Edg/75.0.139.1"
};

const instance = Axios.create({
  baseURL: "https://ocsp.globe.com.ph/postpaid/v2/account/",
  timeout: 10000,
  headers
});

export async function getUsage() {
  try {
    const response = await instance.post("/data-allocation", {
      forceRefresh: true,
      hasBreakdown: true,
      serviceNumber: process.env.SERVICE_NUMBER
    });

    return response.data;
  } catch (e) {
    console.error(e.message);
    console.error(e.response.data);
  }
}

getUsage().then(result => console.log(result));
