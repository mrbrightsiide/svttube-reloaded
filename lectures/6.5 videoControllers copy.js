let videos = [
    {
        title: "First",
        rating: 5,
        comments:2,
        createdAt: "2 munites ago",
        views: 1,
        id: 1,
        
    },
    {
        title: "Second",
        rating: 3,
        comments:98,
        views: 34,
        createdAt: "4 munites ago",
        id: 2,
    },
    {
        title: "Third",
        rating: 2,
        comments:2,
        views: 69,
        createdAt: "7 munites ago",
        id: 3,
    },
];

export const trending = (req,res) => {
    return res.render("home", {pageTitle : "HOME" , videos})
};
export const watch = (req,res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    res.render("watch", {pageTitle : `Watch ${video.title} video`, video
    });
};

export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    res.render("edit", {pageTitle : `Editing: ${video.title} video`, video});
};
export const postEdit = (req, res) =>{
    const { id } = req.params;
    const { title } = req.body;
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    // get을 실행하는 컨트롤러라는 뜻에서 getUpload라고 이름지은것, 따른 이름이어도 상관은없음
    return res.render("upload",{pageTitle : "upload Video"});
};

export const postUpload = (req, res) => {
    // ? here we will add a video to the videos array
    return res.redirect("/");
};