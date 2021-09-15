import "./db";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouters";
import { localsMiddleware } from "./middlewares";


const app = express();
const logger = morgan("combined");
app.use(logger);
app.use(express.urlencoded({extended:true}));
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");


app.use(session({
    secret: "secretId",
    resave: true,
    saveUninitialized: true,
})
);

app.get("/addone",(req,res,next)=>{
    req.session.potato += 1;
    return res.send(`${req.session.id}\n${req.session.potato}`);
});

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


export default app