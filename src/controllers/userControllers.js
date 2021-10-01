import User from "../models/User.js";
import fetch from "node-fetch";
import bcryptjs from "bcryptjs";
// import { token } from "morgan";

export const getJoin = (req, res) => res.render("join", {pageTitle : "Join"});
export const postJoin = async (req, res) => {
    const { name, email, username, password, password2, location } = req.body;
    const pageTitle = "join";
    if(password !== password2){
        return res.status(400).render("join",{
            pageTitle,
            errorMessage: "Pasword confirmation does not match :(",
        });
    }
    const exists = await User.exists({ $or : [{ email } , { username }] });
    if(exists){
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "This email/username is already taken :(",
        });
    }
try{
    await User.create({
        name,
        email,
        username,
        password,
        location,
    });
    return res.redirect("/login");
    }catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req,res) => res.render("login",{pageTitle:"Login"});

export const postLogin = async (req,res) => {
    const { username, password } = req.body;
    const pageTitle = "Login"
    const user = await User.findOne({ username });
    if (!user){
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "An account with this username does not exist",
    });
    }
    const ok = await bcryptjs.compare(password, user.password);
    if(!ok){
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
        client_id : process.env.GH_CLIENT,
        allow_signup: false,
        scope:"read:user user:email",
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
    const tokenRequest = await(
        await fetch(finalUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
      },
    })
    ).json();
    if("access_token" in tokenRequest) {
        const { access_token }= tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await(
            await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`,
              },
        })
        ).json();
        console.log(userData);
        const emailData =  await(
            await fetch(`${apiUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`,
              },
        })
        ).json();
        const email = emailData.find( (email) => email.primary === true && email.verified === true 
        );
        if (!email){
            return res.redirect("/login");
        }
    }else{
        return res.redirect("/login");
    }
  };

export const logout = (req,res) => res.send("logout");
export const edit = (req,res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const see = (req,res) => res.send("See User");