const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname,"db.json"));


const middleware = jsonServer.defaults();

server.use(middleware);


server.use(jsonServer.bodyParser);

server.use(function(req,res,next){
    setTimeout(next,2000);
});


server.use((req,res,next)=>{
    if(req.method === "POST"){
        req.body.createdAt = Date.now()
    }
    next();
});

server.post("/courses/",function (req,res,next){
    const error = validateCourse(req.body);
    if(error){
        res.status(400).send(error)
    }else{
        req.body.slug = createSlug(req.body.title);
        next();
    }
});

server.use(router);

const port = 3001;
server.listen(port,()=>{
    console.log("Server Listening on Port 3001");
});

function createSlug(value){
    return value
    .replace(/[^a-z0-9_]+/gi,"-")
    .replace(/^-|-$/g,"")
    .toLowerCase();
}

function validateCourse(courses){
    if(!courses.title) return "Title is Required";
    if(!courses.authorid) return "Author is Required";
    if(!courses.category) return "Category is Required";
    return "";
}

