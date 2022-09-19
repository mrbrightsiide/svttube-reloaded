import express from "express";
import Video from "../models/Video.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import formatCreatedDate from "../utils/formatCreatedDate.js";
import shuffle from "../utils/suffle.js";
import { isHeroku } from "../middlewares.js";

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const watch = async (req, res) => {
  res.locals.formatCreatedDate = formatCreatedDate;
  const { id } = req.params;
  const video = await Video.findById(id)
    .populate("owner")
    .populate({ path: "comments", populate: { path: "owner" } });
  const relatedVideos = shuffle(await Video.find({}).populate("owner")).slice(
    0,
    8
  );
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found :(" });
  }
  return res.render("watch", {
    pageTitle: video.title,
    video,
    relatedVideos,
  });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found :(" });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const videoExist = await Video.exists({ _id: id });
  const video = await Video.findById(id);
  if (!videoExist) {
    return res.status(404).render("404", { pageTitle: "Video not found :(" });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: isHeroku ? video[0].location : video[0].path,
      thumbUrl: isHeroku
        ? thumb[0].location
        : thumb[0].destination + thumb[0].filename,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.video.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found :(" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  res.locals.formatCreatedDate = formatCreatedDate;
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    })
      .populate("video")
      .populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    body: { text },
    session: { user },
    params: { id },
  } = req;
  const video = await Video.findById(id);
  const owner = await User.findById(user._id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  owner.comments.push(comment._id);
  video.save();
  owner.save();
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const {
    body: { videoid },
    session: { user },
    params: { id },
  } = req;
  const video = await Video.findById(videoid);
  const owner = await User.findById(user._id);
  const comment = await Comment.findById(id);
  if (String(user._id) !== String(comment.owner)) {
    return res.sendStatus(403);
  }
  await Comment.findByIdAndDelete(id);
  const commentIndex = video.comments.indexOf(id);
  video.comments.splice(commentIndex, 1);
  owner.comments.splice(commentIndex, 1);
  video.save();
  owner.save();
  return res.sendStatus(201);
};

export const getVideos = async (req, res) => {
  const { id } = req.params;
  let videos = [];
  const videosInType = async (obj) => {
    let newVideos = JSON.stringify(await Video.find(obj).populate("owner"));
    let newVideosInObj = JSON.parse(newVideos);
    videos = newVideosInObj.map((item) => {
      const newItem = {
        ...item,
        createdAt: formatCreatedDate(item.createdAt),
      };
      return newItem;
    });
    return videos;
  };

  if (id === "all") {
    await videosInType({});
  } else if (id === "recent") {
    videos = await videosInType({});
    videos.reverse();
  } else {
    await videosInType({ hashtags: `#${id}` });
  }

  return res.status(201).json({ videos });
};

export const getCategory = (req, res) => {
  res.redirect("/");
};

export const checkTheaterMode = (req, res) => {
  const { mode } = req.body;
  req.session.isTheaterMode = mode === "theater" ? true : false;
  res.sendStatus("201");
};
