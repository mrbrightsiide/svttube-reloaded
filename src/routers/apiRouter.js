import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
  getVideos,
  checkTheaterMode,
} from "../controllers/videoControllers.js";

const apiRouter = express.Router();

apiRouter.get("/category/:id", getVideos);
apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/theatermode", checkTheaterMode);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter.delete("/comment/:id([0-9a-f]{24})/delete", deleteComment);

export default apiRouter;
