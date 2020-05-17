import { AxiosInstance } from "axios";
import select from "./select";
import { parse } from "url";

const visitedLinks = new Set<string>();

// rerursively find links
export default async function findLinks(
  instance: AxiosInstance,
  url: string,
  maxLevel = 1,
  currentLevel = 0,
  includeAssets = false
) {
  if (visitedLinks.has(url) || currentLevel >= maxLevel) {
    return [];
  } else {
    process.stdout.write(".");
    visitedLinks.add(url);
  }

  const { data } = await instance.get(url);

  const relativeLinks = select(data, "a[href^='/']").map(
    link => instance.defaults.baseURL + link.attribs.href
  );

  const isSameDomain = (link: string) => {
    const uri = parse(link);
    const base = parse(instance.defaults.baseURL || ""); // can be improved

    if (!uri.hostname) throw new Error("Shouldn't happen!");
    if (!base.hostname) throw new Error("Shouldn't happen!");

    return uri.hostname === base.hostname;
  };

  const absoluteLinks = select(data, "a[href^='http']")
    .map(link => link.attribs.href)
    .filter(isSameDomain);

  const uniqueLinks = [...new Set([...relativeLinks, ...absoluteLinks])];

  let links: string[] = [];
  for (const href of uniqueLinks) {
    const children = await findLinks(
      instance,
      href,
      maxLevel,
      currentLevel + 1,
      includeAssets
    );

    links = [...links, href, ...children];
  }

  if (includeAssets) {
    const css = select(data, "link[rel='stylesheet']").map(
      link => link.attribs.href
    );

    const js = select(data, "script,img").map(link => link.attribs.src);
    const images = select(data, "img").map(link => link.attribs.src);

    const assets = [...css, ...js, ...images]
      .filter(link => link !== undefined)
      .map(link =>
        link.match(/^http/) ? link : instance.defaults.baseURL + link
      );

    links = [...links, ...assets];
  }

  return [...new Set(links)];
}
