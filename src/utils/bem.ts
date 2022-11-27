// src/utils/bem.ts

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
