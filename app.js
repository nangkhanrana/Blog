const express= require("express")
const app = express()
const {connectDatabase} = require("./database/database.js");
const Blog = require("./Model/blogModel.js");
connectDatabase();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//CREATE BLOG API
app.post("/createBlog", async (req,res)=>{
    
    
    //Alternatibe object destructuring  
    const {title,subtitle,description} = req.body
    console.log(req.body);

    //Inserting data into database
    await Blog.create({
        title,
        subtitle,
        description
    });

    res.json({
        status:201,
        message:"Blog created successfully"
    });

}),

app.get("/",(req,res)=>{
    res.send("Hello I am home page");
});

app.get("/about",(req,res)=>{
    res.send("This is about page");
});

app.get("/contact",(req,res)=>{
    res.send("This is contact page");
});

app.listen(5000,(req,res)=>{
    console.log("Server is running on port 5000");
});
