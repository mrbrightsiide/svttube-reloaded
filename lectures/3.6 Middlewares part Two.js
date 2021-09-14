*import* express *from* "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {

console.log(`${req.method} ${req.url}`);

next();

}

const privateMiddleware = (req, res, next) => {

const url = req.url;

if (url === "/protected"){

return res.send("<h1>not allowed</h1>");

}

console.log("Allowed, you may continue");

next();

}

const handelHome = (req, res) => {

return res.send("this is middleware");

};

const handleProtected = (req, res) => {

}

app.use(logger);

app.use(privateMiddleware);

app.get("/", handelHome);

app.get("/protected", handleProtected);

// middleware가 controller가 된거임.*

// const handelLogin = (req, res) =>{*

//     return res.send({massage : "log in here"});*

// }*

// app.get("/login", handelLogin);*

const handleListening = () => console.log(`Server Listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);