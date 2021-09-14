import express from "express";

const PORT = 4000;


const app = express();



const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

const handelHome = (req, res) => {
    return res.send("민규야제<br>발결혼하자");
}
// 풀어쓰는 함수도 가능
const handelHome = (req, res) => res.send("민규야제<br>발결혼하자");
// 인라인함수도 가능. 니코쌤은 이게 깔끔하고 좋대.
app.get("/", logger ,handelHome);


const handleListening = () => console.log(`Server Listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);

