const source = {
  name: "SussyToons (PT-BR)",
  baseUrl: "https://www.sussytoons.wtf",
  lang: "pt",
  type: "manga",
  version: 1,

  popularManga: async (page) => {
    const res = await fetch(`${source.baseUrl}/comics/page/${page}/`);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const list = [...doc.querySelectorAll(".entry-thumb")].map((el) => ({
      title: el.querySelector("img").alt,
      url: el.querySelector("a").href,
      thumbnail: el.querySelector("img").src,
    }));
    const hasNextPage = !!doc.querySelector(".pagination .next");
    return { mangas: list, hasNextPage };
  },

  mangaDetails: async (url) => {
    const res = await fetch(url);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    return {
      title: doc.querySelector("h1")?.textContent.trim() || "",
      author: "SussyToons",
      description: doc.querySelector(".entry-content p")?.textContent.trim() || "",
      thumbnail: doc.querySelector(".entry-thumb img")?.src || "",
    };
  },

  chapterList: async (url) => {
    const res = await fetch(url);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const chapters = [...doc.querySelectorAll(".chapter a")].map((a) => ({
      name: a.textContent.trim(),
      url: a.href,
    }));
    return chapters.length ? chapters : [{ name: "Capítulo Único", url }];
  },

  pageList: async (url) => {
    const res = await fetch(url);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const pages = [...doc.querySelectorAll(".entry-content img")].map((img) => img.src);
    return pages;
  },
};

export default source;
