import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
// import mongoose from "mongoose";

const app = express();

app.use(cookieParser());

// .env 사용하려면 dotenv 필요
dotenv.config();

const origin = process.env.ORIGIN;

// cors 에러 없애기
app.use(cors({
    origin,
    credentials: true
}));

app.use(express.json());

// 서버 로그 관리를 위해 morgan 사용
app.use(morgan("dev"));

// .env 파일로 연괄 되는지 확인 필요
// const mongo_URI = process.env.MONGODB_URI;

const mongo_URI = "mongodb://127.0.0.1:27017/lm";

const mongoose = require("mongoose");

// 몽고db 연결
mongoose.connect(mongo_URI, {
    useNewUrlParser: true, useUnifiedTopology: true,
})
.then(() => console.log("DB Connected."))
.catch(err => console.log(err));

app.get("/", (_, res) => res.send("Server is running."));

let port = 4000;

app.listen(port, async() => {
    console.log(`Server running at http://localhost:${port}`);
})