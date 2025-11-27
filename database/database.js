const mongoose = require("mongoose");
exports.connectDatabase = async()=>{
    mongoose.connect(await "mongodb+srv://nangkhanrana:Bttktt.78948@cluster0.0ljrjv6.mongodb.net/Blogs?appName=Cluster0");

    console.log("Mongodb connected successfully");
}