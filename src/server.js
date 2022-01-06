import "./db.js";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouters.js";
import { localsMiddleware } from "./middlewares.js";

const app = express();
// const logger = morgan("combined");
// app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use(
  session({
    secret: "secretId",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/svttube" }),
  })
);

app.get("/addone", (req, res, next) => {
  req.session.potato += 1;
  return res.send(`${req.session.id}\n${req.session.potato}`);
});

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
