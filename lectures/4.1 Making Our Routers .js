import express from "express";
import morgan from "morgan";

const PORT = 4000;
const app = express();
const logger = morgan("combined");
app.use(logger);


// let's make global router. how can we use?
const globalRouter = express.Router();

const handleHome = (req, res) => res.send("home");

globalRouter.get("/", handleHome);

const userRouter = express.Router();

const handleEditUser = (req, res) => res.send("EDIT USER");

userRouter.get("/edit", handleEditUser);

const handleWatchVideo = (req, res) => res.send("Watch Video");

videoRouter.get("/watch", handleWatchVideo);



// 이제 루트 url을 가져와야함
app.use("/", globalRouter);
app.use("/videos", videoRouter);
// 누군가 /videos로 시작되는 url에 접근하면, videoRouter에 있는 컨트롤러를 찾도록 하는 코드. 그리고 이 videoRouter에는 라우터 하나가 있어. watch.!
app.use("/users", userRouter);


// 이코드를 정리해서 라우터를 이해해보자.!


const handleListening = () => console.log(`Server Listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);

