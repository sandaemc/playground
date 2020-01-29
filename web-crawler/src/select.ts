import * as Cheerio from "cheerio";

/**
 *
 * @param data HTML input
 * @param selector CSS selector
 */
export default function select(data: string, selector: string) {
  const $ = Cheerio.load(data);

  return $(selector).toArray();
}
