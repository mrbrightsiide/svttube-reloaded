import regeneratorRuntime from "regenerator-runtime";
import "../../scss/styles.scss";
export class VideoCard {
  constructor(id) {
    this.id = id;
    this.product = {};
    this.mainElement = document.querySelector("#video-wrap");
  }

  async getProductData() {
    const response = await fetch(`/api/category/${this.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data.videos);
    this.product = await data.videos;
  }

  async setProductList() {
    await this.getProductData();
    this.product.forEach((item) => {
      const videoList = document.createElement("li");
      const productname = document.createElement("p");
      productname.innerText = item.title;
      videoList.append(productname);
      const productImg = document.createElement("img");
      productImg.setAttribute("src", `/${item.thumbUrl}`);
      videoList.append(productImg);
      this.mainElement.append(videoList);
    });
  }

  render() {
    this.setProductList();
    return this.mainElement;
  }
}

export class InitPage {
  async getProductData() {
    const response = await fetch(`/api/category/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    this.product = await data.videos;
  }

  async setProductList() {
    await this.getProductData();
    this.product.forEach((item) => {
      const videoList = document.createElement("li");
      const productname = document.createElement("p");
      productname.innerText = item.title;
      videoList.append(productname);
      const productImg = document.createElement("img");
      productImg.setAttribute("src", `/${item.thumbUrl}`);
      videoList.append(productImg);
      this.mainElement.append(videoList);
    });
  }

  render() {
    this.setProductList();
    return this.mainElement;
  }

  // const categorylist = [
  //   { title: "전체", id: "" },
  //   { title: "음악", id: "music" },
  //   { title: "랩", id: "rap" },
  //   { title: "요리", id: "cooking" },
  //   { title: "애완동물", id: "pet" },
  //   { title: "최근에 업로드된 동영상", id: "recent" },
  // ];
  // const bar = document.querySelector(".category-bar");
  // const ul = document.querySelector("#category_bar_chips");
  // // 이거 forEach나 map으로 바꿀수잇겠다
  // for (let i = 0; i < categorylist.length; i++) {
  //   const anchor = document.createElement("a");
  //   const list = document.createElement("li");
  //   list.innerText = categorylist[i].title;
  //   anchor.href = `/category/${categorylist[i].id}`;
  //   anchor.append(list);
  //   ul.append(anchor);
  //   bar.append(ul);
  // }
  // return bar;
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
    console.log(window);

    this.routing(window.location.pathname);

    window.addEventListener("click", (e) => {
      // e.preventDefault();
      //이거 조건문 바꿔야됨
      console.log(e.target);
      if (e.target.tagName.toLowerCase() === "a") {
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
