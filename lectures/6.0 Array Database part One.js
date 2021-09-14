let videos = [
    {
        title: "First",
        rating: 5,
        comments:2,
        createdAt: "2 munites ago",
        id: 1,
    },
    {
        title: "Second",
        rating: 5,
        comments:98,
        createdAt: "4 munites ago",
        id: 2,
    },
    {
        title: "Third",
        rating: 5,
        comments:2,
        createdAt: "7 munites ago",
        id: 3,
    },
];

export const trending = (req,res) => {
    return res.render("home", {pageTitle : "HOME" , videos})
};
export const see = (req,res) => {
    const { id } = req.params;
    // reqest 파라미터에서 id를 얻고
    const video = videos[id - 1];
    // video를 id를 통해서 찾고
    res.render("watch", {pageTitle : `Watch ${video.title} video` });
    // watch라는 페이지를 렌더하고 몇가지 변수를 보내고있음
};
export const edit = (req, res) => {
    res.render("edit");
};
export const search = (req, res) => res.send("search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
    return res.send(`delete video no.${req.params.id}`);
};