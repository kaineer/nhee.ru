// src/tag.ts

// --- tag
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

// --- bem
const addModifier = (
  baseClass: string,
  modifier: string
): string => (
  baseClass + "--" + modifier
);

const addElement = (
  block: string,
  element: string
) => (
  block + "__" + element
);

export const bem = (
  block: string,
  element: string | undefined,
  modifiers: string | string[] = []
): string => {
  const baseClass = (!!element) ?
    addElement(block, element) : block;

  if (Array.isArray(modifiers)) {
    return ([
      baseClass,
      ...modifiers.map((mod) => addModifier(baseClass, mod))
    ].join(" "));
  } else if (typeof modifiers === "string") {
    return [
      baseClass,
      addModifier(baseClass, modifiers)
    ].join(" ");
  }

  return baseClass;
}
