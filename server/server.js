const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const app = express()

//ROTAS V
const moduleRoutes = require("./routes/moduleRoutes.js")
const skillRoutes = require("./routes/skillRoutes.js")
const gameRoutes = require("./routes/gameRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const complaintRoutes = require("./routes/complaintRoutes.js")
const solicitationRoutes = require("./routes/solicitationRoutes.js")
const groupRoutes = require("./routes/groupRoutes.js")
const userGroupRoutes = require("./routes/userGroupRoutes.js")
const reportRoutes = require("./routes/reportRoutes.js")
const subjectRoutes = require("./routes/subjectRoutes.js")
const documentRoutes = require("./routes/documentRoutes.js")
const commonLessonRoutes = require("./routes/commonLessonRoutes.js")
require('dotenv').config();

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
.then((res)=>{
    console.log("Servidor rodando")
})
.catch((err)=>{
    console.log(err)
})

app.use('/api',commonLessonRoutes.router)
app.use('/api',moduleRoutes.router)
app.use('/api',documentRoutes.router)
app.use('/api',subjectRoutes.router)
app.use('/api',skillRoutes.router)
app.use('/api',gameRoutes.router)
app.use('/api',reportRoutes.router)
app.use('/api',userGroupRoutes.router)
app.use('/api',groupRoutes.router)
app.use('/api',userRoutes.router)
app.use('/api',complaintRoutes.router)
app.use('/api',solicitationRoutes.router)
app.listen(5000)