import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "SvtTube";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.pathUrl = req.path;
  res.locals.isTheaterMode = Boolean(req.session.isTheaterMode);
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Log in first");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  // dest는 destination
  dest: "uploads/avatars/",
  limits: { fileSize: 5000000 },
});

export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: { fileSize: 100000000 },
});
