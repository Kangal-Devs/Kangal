// const fs = require("fs")
// const mongoose = require("mongoose")
// const path = require("path")
// const {planModel} = require("./models/planModel.js")
// async function createPlans(){
//     try{
//         mongoose.connect("mongodb://localhost:27017/Kangal")

//         const local = path.join(__dirname,'assets','pro.png')
//         const img = fs.readFileSync(local)

//         const plan = await planModel.create({name:'Pro',groupMax:15,insignia:img})
//         console.log("deu certo")
//     }
//     catch(err){
//         console.log(err.message)
//     }
// }
// createPlans()