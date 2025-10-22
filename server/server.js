const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const app = express()

//ROTAS V



const userNotificationRoutes = require("./routes/userNotificationRoutes.js")
const commonTaskReportRoutes = require("./routes/commonTaskReportRoutes.js")
const messageReportRoutes = require("./routes/messageReportRoutes.js")
const solicitationRoutes = require("./routes/solicitationRoutes.js")
const collectionRoutes = require("./routes/collectionRoutes.js")
const complaintRoutes = require("./routes/complaintRoutes.js")
const messageRoutes = require("./routes/messageRoutes.js")
const moduleRoutes = require("./routes/moduleRoutes.js")
const skillRoutes = require("./routes/skillRoutes.js")
const gameRoutes = require("./routes/gameRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const groupRoutes = require("./routes/groupRoutes.js")
const reportRoutes = require("./routes/reportRoutes.js")
const subjectRoutes = require("./routes/subjectRoutes.js")
const documentRoutes = require("./routes/documentRoutes.js")
const userGroupRoutes = require("./routes/userGroupRoutes.js")
const commonTaskRoutes = require("./routes/commonTaskRoutes.js")
const commonLessonRoutes = require("./routes/commonLessonRoutes.js")
const notificationRoutes = require("./routes/notificationRoutes.js")
const userCommonLessonRoutes = require("./routes/userCommonLessonRoutes.js")
require('dotenv').config();

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())

app.use(express.json({ limit: "1mb" }));

mongoose.connect(process.env.MONGODB_URI)
.then((res)=>{
    console.log("Servidor rodando")
})
.catch((err)=>{
    console.log(err)
})


app.use('/api',userNotificationRoutes.router)
app.use('/api',userCommonLessonRoutes.router)
app.use('/api',messageReportRoutes.router)
app.use('/api',notificationRoutes.router)
app.use('/api',commonLessonRoutes.router)
app.use('/api',collectionRoutes.router)
app.use('/api',commonTaskRoutes.router)
app.use('/api',documentRoutes.router)
app.use('/api',messageRoutes.router)
app.use('/api',moduleRoutes.router)
app.use('/api',skillRoutes.router)
app.use('/api',gameRoutes.router)
app.use('/api',userRoutes.router)
app.use('/api',groupRoutes.router)
app.use('/api',reportRoutes.router)
app.use('/api',subjectRoutes.router)
app.use('/api',userGroupRoutes.router)
app.use('/api',complaintRoutes.router)
app.use('/api',solicitationRoutes.router)
app.use('/api',commonTaskReportRoutes.router)

app.listen(5000)