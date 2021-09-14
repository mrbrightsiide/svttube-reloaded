import express from "express";
const PORT = 4000;
const app = express();

const handelHome = (req, res) => {
    return res.send("안뇽하세용");
};
// 콘솔을보면 request object가 한 이백줄있는데, 지금은 이게 expres에서 주는 request object라는것만 알고있음돼.
app.get("/" , handelHome);

const handelLogin = (req, res) =>{
    return res.send("log in here");
}
app.get("/login", handelLogin);



const handleListening = () => console.log(`Server Listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);
