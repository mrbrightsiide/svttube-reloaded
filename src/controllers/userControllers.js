import User from "../models/User.js";
import Video from "../models/Video.js";
import fetch from "node-fetch";
import bcryptjs from "bcryptjs";
import formatCreatedDate from "../utils/formatCreatedDate.js";
import { isHeroku } from "../middlewares.js";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
  const { name, email, userid, password, password2, location } = req.body;
  const pageTitle = "join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Pasword confirmation does not match :(",
    });
  }
  const exists = await User.exists({ $or: [{ email }, { username: userid }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This email/id is already taken :(",
    });
  }
  try {
    await User.create({
      name,
      email,
      username: userid,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { userid, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username: userid, socialOnly: false });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this id does not exist",
    });
  }
  const ok = await bcryptjs.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.user = false;
  req.session.loggedIn = false;
  req.flash("info", "Bye Bye");
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { email, userid, name, location },
    file,
  } = req;
  const user = await User.findOne({ _id });
  if (user.email !== email) {
    const exists = await User.exists({ email });
    if (exists) {
      return res.status(400).render("edit-profile", {
        errorMessage: "This email has already taken :(",
        pageTitle: "Edit Profile",
      });
    }
  }
  if (user.username !== userid) {
    const exists = await User.exists({
      username: userid,
    });
    if (exists) {
      return res.status(400).render("edit-profile", {
        errorMessage: "This id has already taken :(",
        pageTitle: "Edit Profile",
      });
    }
  }
  try {
    await User.findByIdAndUpdate(_id, {
      avatarUrl: file ? (isHeroku ? file.location : file.path) : avatarUrl,
      email,
      username: userid,
      name,
      location,
    });
    const user = await User.findOne({ _id });
    req.session.user = user;
  } catch (err) {
    console.log(err);
  }
  return res.redirect("/");
};

export const getChnagePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "Can't change password!");
    res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Passsword" });
};
export const postChnagePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcryptjs.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Passsword",
      errorMessage: "The current password is incorrect.",
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Passsword",
      errorMessage: "The password does not match the confirmation",
    });
  }
  user.password = newPassword;
  await user.save();
  req.flash("info", "Password Updated");
  return res.redirect("/users/logout");
};

export const see = async (req, res) => {
  res.locals.formatCreatedDate = formatCreatedDate;
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "video",
    populate: { path: "owner" },
  });
  let mainVideo = user.video[Math.floor(Math.random() * user.video.length)];
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User Not Found." });
  }
  return res.render("users/profile", {
    pageTitle: user.name,
    user,
    mainVideo,
  });
};
