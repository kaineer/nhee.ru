// src/item.ts

import { tag } from "./tag";
import { Link } from "./links";

export const render = (
  item: Link, active: boolean
): string => {
  return tag("li", {
    "class": active ?
      "list__item list__item--active" : "list__item"
  })(
    tag("span", { "class": "item__title" })(item.title) +
      tag("p", { "class": "item__link" })(item.url)
  );
}
