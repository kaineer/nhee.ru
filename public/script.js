const source = (title, url) => ({
  title,
  url
});

const sources = [
  source("Twitter", "https://twitter.com"),
  source("Linktree", "https://linktr.ee/kaineer"),
  source("Taplink", "https://taplink.cc/kaineer"),
  source("Sunts/Eljur", "https://lycreg.urfu.ru/"),
  source("Sunts/LK", "https://lycedu.urfu.ru/login"),
  source("Sunts/absence", "https://lyceum.urfu.ru/fileadmin/user_upload/zamUchRab/absentApp.pdf"),
  source("ZSfond", "https://zsfond.ru/"),
  source("OTUS/DevOps", "https://otus.ru/learning/173394/"),
  source("OTUS/infra", "https://github.com/Otus-DevOps-2022-05/kaineer_infra"),
  source("OTUS/microservices", "https://github.com/Otus-DevOps-2022-05/kaineer_microservices"),
  source("Sirius/main site", "https://sochisirius.ru/"),
  source("Sirius/courses", "https://edu.sirius.online"),
  source("Monkey type", "https://monkeytype.com"),
  source("Japanese/yume zoom", "https://us02web.zoom.us/j/85667645171?pwd=9V9lALZmoG0z0qIeQmK48XQRcl9hWe.1"),
  source("Japanese/moe", "https://learnjapanese.moe/"),
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

const keysDown = (key, alt) => {
  return (key === 75 && alt) || key === 38;
}

const keysUp = (key, alt) => {
  return (key === 74 && alt) || key === 40;
}

const keysGo = (key, alt) => {
  return (key === 72 && alt) || key === 13;
}

const keysEsc = (key) => {
  return key === 27;
}

input.addEventListener("keydown", (e) => {
  const key = e.which;
  const alt = e.altKey;

  if (keysDown(key, alt)) {
    --itemIndex;
    defaultUpdateItems();
  } else if (keysUp(key, alt)) {
    ++itemIndex;
    defaultUpdateItems();
  } else if (keysGo(key, alt)) {
    openSelectedUrl();
  } else if (keysEsc(key)) {
    e.stopPropagation();
    e.preventDefault();

    input.value = "";
  }
}, true);

const keyupHandler = (e) => {
  const key = e.which;

  if (key === 27) {
    e.preventDefault();

    input.value = "";
    updateItems("");

    input.focus();
  }
};

[list, document].forEach((el) => {
  el.addEventListener("keyup", keyupHandler, true);
});

input.addEventListener("keydown", (e) => {
  if (e.which === 27) {
    e.preventDefault();
    input.value = "";
    updateItems("");
  }
}, true);

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
