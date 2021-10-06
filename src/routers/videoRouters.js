import express from "express";
import {
    getUpload,
    postUpload,
    getEdit,
    postEdit,
    watch,
    deleteVideo,
    }from "../controllers/videoControllers.js";
import { protectorMiddleware } from "../middlewares.js";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(postUpload);

// to give an owner to the video , we're gonna connect video and user models. 로그인한사람만 에딧,딜리트,업로드 비디오를 할수있게

export default videoRouter;