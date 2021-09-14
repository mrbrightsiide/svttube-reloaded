import express from "express";
const PORT = 4000;
const app = express();
// 여기서 서버를 만들고

// 가운데 영역에 어플을 만들고
// 어플에게 get request에 응답하는 방법 등등을 가르칠거야. 준비가되면, listen하기 시작하고, 외부에 개방될거임
const handelHome = () => console.log(" someone is trying to what?");
// app.get("/" , () => " someone is trying to " )
// 인라인함수도 가능
app.get("/" , handelHome);
// button.addEventListener("click", handeClick)이랑 비슷한거야. 누가 root page ("/")로 request를 보낸다면, handelHome 함수를 호출한다

const handleListening = () => console.log(`Server Listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);
// 여기서 외부접속을 listen하고 => 약간 샌드위치같은,,