import Axios from "axios";
import findLinks from "./find-links";
import * as yargs from "yargs";

const argv = yargs.argv;

if (!argv.url) throw new Error("Please specify a URL");

const BASE_URL: string = argv.url as string;
const MAX_CRAWLING_LEVEL = (argv.depth as number) || 1;
const INCLUDE_ASSETS = (argv.assets as boolean) || false;

console.log("Options: ");
console.log({
  BASE_URL,
  MAX_CRAWLING_LEVEL,
  INCLUDE_ASSETS
});
console.log();

const instance = Axios.create({ baseURL: BASE_URL });

(async () => {
  process.stdout.write("Crawling...");
  const links = await findLinks(
    instance,
    "/",
    MAX_CRAWLING_LEVEL,
    0,
    INCLUDE_ASSETS
  );

  console.log();

  console.log("Downloading...");
  const promises = links.map(
    link =>
      new Promise((resolve, reject) => {
        Axios.head(link)
          .then(({ headers }) => {
            resolve({
              file: link,
              size: headers["content-length"]
            });

            console.log(
              `Downloaded ${link} (${headers["content-length"]} bytes)`
            );
          })
          .catch(reject);
      })
  );

  await Promise.all(promises);
})();
