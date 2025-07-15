import axios from "axios"
import {skillMemoryGame,skillPingPong,skillTicTacToe,skillsHangman} from "./skills.js"
// axios.post("http://localhost:5000/api/get_user",{})

// let id;
// axios.get("http://localhost:5000/api/get_all_games")
// .then((res)=>{


//    Promise.all(
//     skillPingPong.map((skill)=>{
//         return axios.post("http://localhost:5000/api/create_skill",{
//             gameId:res.data.message[3]._id,
//             subject:skill.subject,
//             title:skill.title,
//             description:skill.description,
//             code:skill.code,
//             descriptionExample:skill.descriptionExample,
//             codeExample:skill.codeExample
        
//         })
//    })
//    )

//    .then((res)=>{console.log(JSON.stringify(res.data.message))})
//    .catch((err)=>{console.log(err.response.data.message)})
   
// })
// .catch((err)=>{console.log(err)})