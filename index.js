const express = require("express");
const app = express();
const mongoose= require("mongoose");
const dotenv= require("dotenv");
const helmet= require("helmet");
const morgan= require("morgan");
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const postRoute=require("./routes/posts");
dotenv.config();
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect(process.env.MONGO_URI, connectionParams).then(()=>{
    console.info("Connected DB")
}).catch((e)=>{
    console.log("Error",e);
});


//middlewares
app.use(express.json())
app.use(helmet());
app.use(morgan("common"))

app.use("/api/users",  userRoute)
app.use("/api/auth",  authRoute)
app.use("/api/posts", postRoute);

app.listen(8800,()=>{
    console.log("Backend server is running")
});

