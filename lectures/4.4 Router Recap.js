import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
// default export를 사용했기땜에 변수이름이 golbalRouter가 아니어도됨. 근데 헷갈리니까.
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouters";
// /video + /warch가 알아서 되는거임 비디오라우터 안에 /watch가 들어가있으니까!


const PORT = 4000;
const app = express();
const logger = morgan("combined");
app.use(logger);

// 코드를 짤때는 그냥 막짜고 일단 돌아가게해. 일단 돌아가면 코드를 정리하는데 쓴만큼의 시간을 할애해야해.: clean code 책 참조






app.use("/", globalRouter);
app.use("/videos", videoRouter);
// 비디오 라우터 안에 들어가도록 하는 코드
app.use("/users", userRouter);





const handleListening = () => console.log(`Server Listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);





