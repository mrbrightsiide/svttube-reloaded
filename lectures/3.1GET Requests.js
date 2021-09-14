import express from "express";
// i'm looking for express in node_modules에서 express폴더를 찾을때까지 찾다가 찾으면 그폴더의 index.js를 실행함
const PORT = 4000;
const app = express();
// creats express application function
// 여기서 서버를 만들고

const handleListening = () => console.log(`Server Listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);
// 서버는 항상 듣고있음.

// 서버가 만들어졌고, 4000 포트를 listening하고있어.

// 내 서버에 어떻게 갈수있을까? -> localhost로 접속가능
