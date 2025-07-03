const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const app = express()

//ROTAS V
const userRoutes = require("./routes/userRoutes.js")
const complaintRoutes = require("./routes/complaintRoutes.js")
const solicitationRoutes = require("./routes/solicitationRoutes.js")
const groupRoutes = require("./routes/groupRoutes.js")
const userGroupRoutes = require("./routes/userGroupRoutes.js")
const reportRoutes = require("./routes/reportRoutes.js")

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/Kangal")

app.use('/api',reportRoutes.router)
app.use('/api',userGroupRoutes.router)
app.use('/api',groupRoutes.router)
app.use('/api',userRoutes.router)
app.use('/api',complaintRoutes.router)
app.use('/api',solicitationRoutes.router)
app.listen(5000)