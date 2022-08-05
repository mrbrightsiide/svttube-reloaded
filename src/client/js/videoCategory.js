export class VideoCard {
  constructor(id) {
    this.main = document.createElement("div");
    this.id = id;
    this.product = {};
  }

  async getProductData() {
    const response = await fetch(`/api/category/${this.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    this.product = await data.videos;
  }

  async setProductList() {
    await this.getProductData();
    this.product.forEach((item) => {
      const videoList = document.createElement("li");
      const productname = document.createElement("p");
      const productImg = document.createElement("img");
      productImg.setAttribute("src", `/${item.thumbUrl}`);
      productname.innerText = item.title;
      videoList.append(productname);
      videoList.append(productImg);
      return this.main.append(videoList);
    });
  }

  render() {
    this.setProductList();
    return this.main;
  }
}

export class InitPage {
  constructor() {
    this.main = document.createElement("div");
    this.product = {};
    this.mainElement = document.querySelector("#video-wrap");
  }

  async getProductData() {
    const response = await fetch(`/api/category/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    this.product = await data.videos;
  }

  async setProductList() {
    await this.getProductData();
    this.product.forEach((item) => {
      const videoList = document.createElement("li");
      const productname = document.createElement("p");
      const productImg = document.createElement("img");
      productImg.setAttribute("src", `/${item.thumbUrl}`);
      productname.innerText = item.title;
      videoList.append(productname);
      videoList.append(productImg);
      return this.main.append(videoList);
    });
  }

  render() {
    this.setProductList();
    return this.main;
  }
}

class Router {
  constructor(routes) {
    this.routes = routes;
    for (const key in routes) {
      const route = routes[key];
      if (key.indexOf(":") > -1) {
        const [_, routename, param] = key.split("/");
        this.routes["/" + routename] = route;
        delete this.routes[key];
      }
    }
  }

  init(rootElement) {
    if (!rootElement) {
      console.error("Page not found :(");
      return null;
    }
    this.rootElement = rootElement;
    this.routing(window.location.pathname);

    window.addEventListener("click", (e) => {
      if (
        e.target.tagName.toLowerCase() === "a" &&
        e.target.classList.contains("category-chip")
      ) {
        e.preventDefault();
        this.routePush(e.target.href);
      }
    });

    window.onpopstate = () => {
      this.routing(window.location.pathname);
    };
  }

  routePush(pathname) {
    window.history.pushState({}, null, pathname);
    this.routing(window.location.pathname);
  }

  routing(pathname) {
    const [_, routename, param] = pathname.split("/");
    let page = "";

    if (this.routes[pathname]) {
      const component = new this.routes[pathname]();
      page = component.render();
    } else if (param) {
      const component = new this.routes["/" + routename](param);
      page = component.render();
    }

    if (page) {
      this.render(page);
    }
  }

  render(page) {
    const rootElement = document.querySelector(this.rootElement);
    rootElement.innerHTML = "";
    rootElement.append(page);
  }
}

export class App {
  constructor(props) {
    this.props = props;
  }

  setup() {
    const { el } = this.props;
    const router = new Router({
      "/": InitPage,
      "/category/:id": VideoCard,
    });
    router.init(el);
  }
}

const config = {
  el: "#video-wrap",
};

new App(config).setup();
