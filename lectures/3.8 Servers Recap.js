import express from "express";
// node_modules에서 express 찾아서 실행
const PORT = 4000;
// 문이나 창문을 여는 코드라고 보면됨. 이 창문을 통해 서버와 대화하는거야.
// why do we use port? 컴퓨터가 모든 채널을 listen할수없기때문에, request를 보낼때 특정 port로 request를 보내는거야. 4000번은 백엔드에서 사용하는 포트번호 국룰이래. port is aleardy use라는 에러를 보면 다른 프로그램에서 이미 사용중인 포트를 사용하려는거임.

const app = express();
// express를 실행하는 함수이름 = app 


const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

const handelHome = (req, res) => {
    return res.send("this is middleware");
};

app.get("/", logger ,handelHome);
// 누군가 .get 리퀘스트를 하려고할때 뭘해야할지 알려주는 줄

const handleListening = () => console.log(`Server Listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);
// 서버는 listen을 시작하면 내가 끌때까지 listen을 하고잇는거임

console.log(process.cwd());