import express from "express"
import cors from "cors"

const app=express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    sameSite: 'none',
}))

app.use(express.json({limit: "16kb"})) 
app.use(express.urlencoded({extended: true,limit: "16kb"}))  //it means we can pass nested objects if we dont mention anything it will still run fine..no need to do so.
app.use(express.static("public"))




//importing routes

import questionRoute from "./routes/question.route.js";
import voteRoute from "./routes/vote.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import blogRoute from "./routes/blog.route.js";

//using routes
app.use("/api/v1/questions",questionRoute)
app.use("/api/v1/votes",voteRoute)
app.use("/api/v1/users",userRoute)
app.use("/api/v1/chats",chatRoute)
app.use("/api/v1/blogs",blogRoute)


export { app }