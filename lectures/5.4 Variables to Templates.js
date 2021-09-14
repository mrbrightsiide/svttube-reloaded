export const trending = (req,res) => res.render("home", {pageTitle : "HOME"});
// export const trending = (req,res) => res.render("home", {pageTitle : "Comes from your controllers"});
// render는 두가지 인수를 받음. 1은 view의 이름. 2는 템플릿으로 보내고싶은 편수들.
export const see = (req,res) => {
    res.render("watch");
};
export const edit = (req, res) => {
    return res.render("edit");
};
export const search = (req, res) => res.send("search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
    return res.send(`delete video no.${req.params.id}`);
};