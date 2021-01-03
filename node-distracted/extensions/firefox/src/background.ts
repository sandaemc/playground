import { browser } from "webextension-polyfill-ts";

async function logURL(tabId, changeInfo, tabInfo) {
  console.log("In here");
  const result = await fetch("https://dog.ceo/api/breeds/image/random");
  console.log("XXXXXXXXXXX");
  console.log(await result.json());
  console.log("XXXXXXXXXXXYYYY");

  console.log(tabId);
  if (changeInfo.status === "complete") {
    /*
    browser.tabs.update({
      url: "http://pomometer.s3-website-us-east-1.amazonaws.com/"
    });
    */
  }
}

browser.tabs.onUpdated.addListener(logURL, {
  urls: ["https://news.ycombinator.com/"]
});
