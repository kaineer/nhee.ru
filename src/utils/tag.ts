// src/tag.ts

type Attributes = {
  [id: string]: (string | number | boolean)
};

const attributes = (
  attrs: Attributes
) => {
  return Object.keys(attrs).map((k) => {
    return " " + k + "=" + "\"" + attrs[k] + "\"";
  }).join("");
};

export const tag = (
  name: string,
  attrs: Attributes = {}
) => (...args: string[]): string => {
  return (
    "<" + name + attributes(attrs) + ">" +
      args.join("") +
      "</" + name + ">"
  );
};
