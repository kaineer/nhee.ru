// src/resources/item-container.ts

export interface ItemContainer {
  up: () => void;
  down: () => void;
  getActiveURL: () => string;
  getSize: () => number;
  render: () => string;
};

export interface Link {
  title: string;
  url: string;
};
