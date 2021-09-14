import User from "../models/User"


export const getJoin = (req, res) => res.render("join", {pageTitle : "Join"});
export const postJoin = async (req, res) => {
    const { name, email, username, password, password2, location } = req.body;
    const pageTitle = "join";
    if(password !== password2){
        return res.render("join",{
            pageTitle,
            errorMessage: "Pasword confirmation does not match :(",
        });
    }
    const exists = await User.exists({ $or : [{ email } , { username }] });
    if(exists){
        return res.render("join", {
            pageTitle,
            errorMessage: "This email/username is already taken :(",
        });
    }
    await User.create({
        name,
        email,
        username,
        password,
        location,
    });
    return res.redirect("/login");
};
export const edit = (req,res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const login = (req,res) => res.send("login");
export const logout = (req,res) => res.send("logout");
export const see = (req,res) => res.send("See User");