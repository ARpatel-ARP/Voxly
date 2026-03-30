import dns from 'node:dns/promises';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRoute from './routes/userRoutes.js';
import messageRoute from "./routes/messageRoute.js"
import cookieParser from 'cookie-parser';
import cors from "cors"
import { app, server } from "./socket/socket.js"
import path from 'node:path';
dotenv.config() // call this FIRST, before anything else

const PORT = process.env.PORT || 5000

const _dirname = path.resolve()

app.get("/test-cookie", (req, res) => {
    res.cookie("testtoken", "hello123", {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    });
    return res.json({ message: "cookie set" });
});

//middleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((req, res, next) => {
    console.log("REQUEST HIT:", req.method, req.url)
    next()
})

app.use("/api/v1/user", userRoute)
app.use("/api/v1/message", messageRoute)
//http://localhost:8000/api/user/register
app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
}
)

connectDB() // call outside app.listen

server.listen(PORT, () => {
    console.log(`server listening at port ${PORT}`)
})