// src/dom.ts

export const first = (selector: string): HTMLElement | null => {
  return document.querySelector(selector);
}

export const all = (selector: string): Element[] => {
  return [...document.querySelectorAll(selector)];
}
