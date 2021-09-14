import mongoose from "mongoose"


mongoose.connect("mongodb://127.0.0.1:27017/svttube", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅Connected to DB");
const handleError = (error) => console.log("❌DB Error", error);
db.on("error", handleError);
// db.on("error",(error) => console.log("DB Error", error));
// 요거를 저 위에두줄로!
db.once("open",handleOpen);
// on은 클릭처럼 여러번 일어날수있고, once는 딱 한번만 일어날수있음! 연결이 됨/안됨 딱한번