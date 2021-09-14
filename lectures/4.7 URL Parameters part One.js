export const trending = (req,res) => res.send("Trendings");
export const see = (req,res) => {
    return res.send(`watch video no.${req.params.id}`);
};
export const edit = (req, res) => {
    return res.send(`edit video no.${req.params.id}`);
};
export const search = (req, res) => res.send("search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
    return res.send(`delete video no.${req.params.id}`);
};

// 만약에 id가 숫자만 허용된다 치면. 누가 id를 숫자로 안적고 문자나 아무튼 존재하지않는 아이디를 적으면 어케해야되지...? 그건 다음강의에