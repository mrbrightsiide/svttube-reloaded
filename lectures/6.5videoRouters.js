import express from "express";
import {
    getUpload,
    postUpload,
    getEdit,
    postEdit,
    watch,
    }from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
// videoRouter.get("/upload", getUpload);
// videoRouter.post("/upload", postUpload);
// 이두개가 코드한줄로 축약가능
videoRouter.route("/upload").get(getUpload).post(postUpload);
export default videoRouter;