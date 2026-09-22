import express from "express";

import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.route.js'
import memberRouter from './routes/member.route.js'
import trainerRouter from './routes/trainer.route.js'
import adminRouter from './routes/admin.route.js'
import membershipPlanRouter from './routes/membershipPlan.route.js' 
import machineRouter from "./routes/machine.route.js";
import testimonialRouter from "./routes/testimonial.route.js"


//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/members", memberRouter)
app.use("/api/v1/trainers",trainerRouter)
app.use("/api/v1/admins",adminRouter)
app.use(
    "/api/v1/membership-plans",
    membershipPlanRouter
);
app.use(
    "/api/v1/machines",
    machineRouter
);
app.use(
    "/api/v1/testimonials",
    testimonialRouter
);



export { app };