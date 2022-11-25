// src/tag.ts

type Attributes = {
  [id: string]: (string | number)
};

const attributes = (attrs: Attributes) => {
  return Object.keys(attrs).map((k) => {
    return " " + k + "=" + "\"" + attrs[k] + "\"";
  }).join("");
};

export const tag = (
  name: string, attrs: Attributes = {}
) => (content: string): string => {
  return "<" + name + attributes(attrs) + ">" + content + "</" + name + ">";
};
