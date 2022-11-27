// src/resources/links.ts

import { ItemContainer, Link } from "./item-container";
import { tag, bem } from "../markup";

const renderLink = (link: Link, active: boolean): string => {
  const { title, url } = link;

  const className = bem("list", "item", active ? "active" : []);
  const attrs = { "class": className };

  return tag("li", attrs)(
    tag("span", {"class": bem("item", "title")})(title),
    tag("p", {"class": bem("item", "link")})(url),
  );
}

export const source = (title: string, url: string): Link => {
  return { title, url };
};

export const createLinksContainer = (
  links: Link[]
) => (
  query: string
): ItemContainer => {
  const filtered = links.filter(({ title, url }) => {
    return title.includes(query) || url.includes(query);
  });

  let activeIndex = 0;

  return {
    getSize() { return filtered.length; },
    getActiveURL() { return filtered[activeIndex].url; },
    up() {
      if (activeIndex > 0) {
        activeIndex--;
      }
    },
    down() {
      if (activeIndex < filtered.length - 1) {
        activeIndex++;
      }
    },
    render() {
      return filtered.map((item, i): string => {
        return renderLink(item, i === activeIndex);
      }).join("");
    }
  };
};
