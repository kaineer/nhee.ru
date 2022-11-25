// src/links.ts

import { render as renderItem } from "./item";

export interface Link {
  title: string;
  url: string;
}

const source = (title: string, url: string): Link => {
  return {
    title,
    url
  };
}

const links: Link[] = [
  source("Twitter", "https://twitter.com"),
  source("TweetDesk", "https://tweetdeck.twitter.com/"),
  source("VKontakte", "https://vk.com/"),
  source("Linktree", "https://linktr.ee/kaineer"),
  source("Eljur", "https://lycreg.urfu.ru/"),
  source("LK sunts", "https://lycedu.urfu.ru/login"),
  source("GMail", "https://gmail.com/"),
  source("ZSfond", "https://zsfond.ru/"),
  source("Whatsapp", "https://web.whatsapp.com/"),
  source("DevDocs", "https://devdocs.io/"),
  source("Node package manager", "https://npm.io/"),
  source("GitHub", "https://github.com/kaineer"),
  source("GitLab", "https://gitlab.com/kaineer"),
  source("GitLab.Htmlacademy", "https://gitlab.htmlacademy.dev/"),
  source("OTUS DevOps", "https://otus.ru/learning/173394/"),
  source("OTUS infra", "https://github.com/Otus-DevOps-2022-05/kaineer_infra"),
  source("OTUS microservices", "https://github.com/Otus-DevOps-2022-05/kaineer_microservices"),
  source("Sirius main site", "https://sochisirius.ru/"),
  source("Sirius courses", "https://edu.sirius.online"),
  source("MOSH", "https://reg.olimpiada.ru/"),
  source("Monkey type", "https://monkeytype.com"),
  source("Anime Go", "https://animego.org"),
  source("Docker docs", "https://docs.docker.com/"),
];

const render = (items: Link[], activeItem: number = 0): string => {
  return items.map((item, idx) => {
    return renderItem(item, idx === activeItem);
  }).join("");
};

const selectItems = (query: string): Link[] => {
  if (query.length) {
    return links.filter(({ title, url }) => {
      return (
        title.includes(query) ||
          url.includes(query)
      );
    });
  }

  return links;
}

export const filterItems = (query: string) => {
  const items = selectItems(query);
  let activeItem = 0;

  return {
    render() {
      return render(items, activeItem);
    },
    up() {
      if (activeItem > 0) {
        activeItem--;
      }
    },
    down() {
      if (activeItem < items.length - 1) {
        activeItem++;
      }
    },
    activeURL() {
      return items[activeItem].url;
    }
  }
}
