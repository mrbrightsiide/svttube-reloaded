import User from "../models/User";
import bcrypt from "bcrypt";

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
    const ok = await bcrypt.compare(password, user.password);
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
    const baseUrl = `https://github.com/login/oauth/authorize`;
    const config = {
        client_id : "8216876d47ede3638433",
        allow_signup: false,
        scope:"read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};

export const finishGithubLogin = (req,res) => {

};

export const logout = (req,res) => res.send("logout");
export const edit = (req,res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const see = (req,res) => res.send("See User");