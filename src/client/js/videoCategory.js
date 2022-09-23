const THUMB_ONERROR = "'/static/img/thumb_default.jpg'";
const AVATAR_ONERROR = "'/static/img/profile_default.jpg'";
let isLoading = false;
const mainElement = document.querySelector(".contents-container");

export class VideoCard {
  constructor(id) {
    this.main = document.querySelector("#video-contents-wrap");
    this.id = id;
    this.product = {};
  }

  handleLoading = () => {
    if (isLoading) {
      mainElement.classList.add("is-loading");
    } else {
      mainElement.classList.remove("is-loading");
    }
  };

  async getVideoData() {
    const response = await fetch(`/api/category/${this.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    this.product = await data.videos;
  }

  async getVideoList() {
    await this.getVideoData().then(() => {
      const div = document.createElement("div");
      this.product.forEach((item) => {
        const videoList = document.createElement("article");
        videoList.innerHTML = `
      <div class="video-item-wrap">
        <div class="video-item">
          <a href="/videos/${item._id}">
          <div class="thumbnail-wrap">
            <div class="thumbnail">
              <img
                class="thumbnail-img"
                src="${item.thumbUrl}" onerror="this.src=${THUMB_ONERROR};" crossorigin="crossorigin"
              />
            </div>
        </div>
          </a>
          <div class="details">
            <div class="meta">
              <a id="user-profilepic" href="/users/${item.owner._id}">
                <img src="${item.owner.avatarUrl}" onerror="this.src=${AVATAR_ONERROR};" crossorigin="crossorigin"/>
              </a>
              <div class="meta-txt">   
                <a class="video-title-anchor" href="/videos/${item._id}">
                    <h3 id="video-title">
                      <p>${item.title}</p>
                    </h3>
                  </a>
                <div class="video-meta-block">
                  <a href="/users/${item.owner._id}">
                    <p>${item.owner.name}</p>
                  </a>
                  <p>${item.createdAt} · 조회수 ${item.meta.views}회</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>`;
        return div.append(videoList);
      });
      isLoading = false;
      this.handleLoading();
      this.main.innerHTML = "";
      this.main.append(div);
    });
  }

  render() {
    isLoading = true;
    this.handleLoading();
    this.getVideoList();
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
      "/category/:id": VideoCard,
    });
    router.init(el);
  }
}

const config = {
  el: "#video-wrap",
};

new App(config).setup();
