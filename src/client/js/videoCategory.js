export class VideoCard {
  constructor(id) {
    this.main = document.createElement("div");
    this.main.setAttribute("id", "video-contents-wrap");
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
      const videoList = document.createElement("article");
      videoList.innerHTML = `
      <div class="video-item-wrap">
        <div class="video-item">
          <a href="/videos/${item._id}">
            <div class="thumbnail-wrap">
              <div
                class="thumbnail"
                style="background-image: url(/${item.thumbUrl})"
              >
              </div>
            </div>
          </a>
          <div class="details">
              <a id="user-profilepic" href="/users/${item.owner._id}">
                <img src="/${item.owner.avatarUrl}" crossorigin="crossorigin" />
              </a>
            <div class="meta">
              <h3>
                <a href="/videos/${item._id}">
                  <div id="video-title">
                    <p>${item.title}</p>
                  </div>
                </a>
              </h3>
              <div class="video-meta-block">
                <div>
                  <p>${item.owner.username}</p>
                </div>
                <div>
                  <p>${item.createdAt}</p>
                  <p> · 조회수 ${item.meta.views}회</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>`;
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
    this.main.setAttribute("id", "video-contents-wrap");
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
      console.log(item);
      const videoList = document.createElement("article");
      videoList.innerHTML = `
      <div class="video-item-wrap">
        <div class="video-item">
          <a href="/videos/${item._id}">
            <div class="thumbnail-wrap">
              <div
                class="thumbnail"
                style="background-image: url(/${item.thumbUrl})"
              >
              </div>
            </div>
          </a>
          <div class="details">
              <a id="user-profilepic" href="/users/${item.owner._id}">
                <img src="/${item.owner.avatarUrl}" crossorigin="crossorigin" />
              </a>
            <div class="meta">
              <h3>
                <a href="/videos/${item._id}">
                  <div id="video-title">
                    <p>${item.title}</p>
                  </div>
                </a>
              </h3>
              <div class="video-meta-block">
                <div>
                  <p>${item.owner.username}</p>
                </div>
                <div>
                  <p>${item.createdAt}</p>
                  <p> · 조회수 ${item.meta.views}회</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
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
