import "./db"
// 파일자체를 import하고있음 이파일이 서버를 db로 연결시켜줄거야.
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouters";



const PORT = 4000;
const app = express();
const logger = morgan("combined");
app.use(logger);
app.use(express.urlencoded({extended:true}));
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);





const handleListening = () => console.log(`Server Listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);





