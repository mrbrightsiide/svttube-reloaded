import "./db";
import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouters";


const app = express();
const logger = morgan("combined");
app.use(logger);
app.use(express.urlencoded({extended:true}));
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


export default app