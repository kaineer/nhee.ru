const source = (title, url) => ({
  title,
  url
});

const sources = [
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
  source("Node package manager", "https://npmjs.com/"),
  source("GitHub", "https://github.com/"),
  source("GitLab", "https://gitlab.com/"),
  source("GitLab.Htmlacademy", "https://gitlab.htmlacademy.dev/"),
  source("OTUS DevOps", "https://otus.ru/learning/173394/"),
  source("OTUS infra", "https://github.com/Otus-DevOps-2022-05/kaineer_infra"),
  source("OTUS microservices", "https://github.com/Otus-DevOps-2022-05/kaineer_microservices"),
  // source("MOSH", "https://reg.olimpiada.ru/"),
  source("Monkey type", "https://monkeytype.com"),
];

const input = document.querySelector(".search-input");
const list = document.querySelector(".list");
let itemIndex = 0;
let itemCount = sources.length;
let filtered = sources;

const defaultUpdateItems = () => updateItems(input.value.trim());

const updateItems = (value) => {
  filtered = sources.filter((s) => {
    const v = value.toLowerCase();
    return s.title.toLowerCase().includes(v) || s.url.includes(v);
  });

  const attributes = (attrs = {}) => {
    return Object.keys(attrs).map((k) => {
      return " " + k + "=" + "\"" + attrs[k] + "\"";
    }).join("");
  }

  const tag = (name, attrs = {}) => (content) => {
    return "<" + name + attributes(attrs) + ">" + content + "</" + name + ">";
  }

  const markup = filtered.map((s, i) => {
    const li = (active) => {
      return tag("li", { "class": active ?
        "list__item list__item--active" : "list__item" });
    }

    return li(i === itemIndex)(
      tag("span", { "class": "item__title" })(s.title) +
      tag("p", { "class": "item__link" })(s.url)
    );
  }).join('');

  list.innerHTML = markup;

  itemCount = filtered.length;
};

const openUrl = (url) => {
  // document.location = url;
  window.open(url);
}

const openByTitle = (title) => {
  const source = sources.find((s) => s.title == title);
  if (source) {
    openUrl(source.url);
  }
};

const openSelectedUrl = () => {
  if (itemCount > 0) {
    const url = filtered[itemIndex].url;

    if (url) {
      openUrl(url);
    }
  }
}

input.addEventListener("input", (/* e */) => {
  itemIndex = 0;
  updateItems(input.value.trim());
});

input.addEventListener("keydown", (e) => {
  const key = e.which;
  const alt = e.altKey;

  if (key === 75 && alt && itemIndex > 0) {
    --itemIndex;
    defaultUpdateItems();
  } else if (key === 38 && itemIndex > 0) {
    --itemIndex;
    defaultUpdateItems();
  } else if (key === 74 && alt && itemIndex < itemCount - 1) {
    ++itemIndex;
    defaultUpdateItems();
  } else if (key === 40 && itemIndex < itemCount - 1) {
    ++itemIndex;
    defaultUpdateItems();
  } else if (key === 13) {
    openSelectedUrl();
  }
});

const keyupHandler = (e) => {
  const key = e.which;

  if (key === 27) {
    input.value = "";
    updateItems("");

    input.focus();
  }
};

[input, list, document].forEach((el) => {
  el.addEventListener("keyup", keyupHandler);
});

list.addEventListener("click", (e) => {
  const target = e.target;
  if (target) {
    const item = target.closest(".list__item");
    if (item) {
      const title = item.querySelector(".item__title");
      openByTitle(title.textContent);
    }
  }
});

defaultUpdateItems();
input.focus();
