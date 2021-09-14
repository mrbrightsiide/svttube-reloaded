import express from "express";
import {
    getEdit,
    postEdit,
    watch
    }from "../src/controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.get("/:id", watch);
// 정규표현식 \\d+ 는 문자와 숫자가 섞여있을때는 소용이없음
videoRouter.route("/:id/edit").get(getEdit).post(postEdit);
// 같은 url이 반복될때 사용
// 누군가 get request를 이 라우터로 보내면 getEdit을 사용하고,누군가 post request를 이 라우터로 보내면  posetEdit을 사용하라는뜻

export default videoRouter;