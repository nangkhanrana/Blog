const express = require("express")
const app = express()
const { connectDatabase } = require("./database/database.js");
const Blog = require("./Model/blogModel.js");
connectDatabase();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CREATE BLOG API
app.post("/createBlog", async (req,res)=>{
    //Alternatibe object destructuring  
    const {title,subtitle,description} = req.body
    //console.log(req.body);

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

//Fetching or reading all data from Blog collection
app.get("/getBlog", async (req, res) => {
    const blogs = await Blog.find();
    if (blogs.length == 0) {
        res.json({ 
            status: 404,
            message: "No blogs found",
        });
    } else {
        res.json({
            status: 200,
            message: "Blogs fetched successfully",
            abcd: blogs,
        });
    }
});

//fetching single blog by id 
app.get("/Blog/:id", async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const blog = await Blog.find({ _id: id });
    res.status(200).json({
        message: "Blog fetched successfully",
        data: blog,
    });
}); 

//Deleting single blog by id 
app.delete("/Blog/:id", async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const blog = await Blog.findByIdAndDelete({ _id: id });
    res.status(200).json({
        message: "Blog Deleted successfully",
        data: blog,
    });
}); 

app.get("/", (req, res) => {
    res.send("Hello I am home page");
});

app.get("/about", (req, res) => {
    res.send("This is about page");
});

app.get("/contact", (req, res) => {
    res.send("This is contact page");
});

app.listen(5000, (req, res) => {
    console.log("Server is running on port 5000");
});
