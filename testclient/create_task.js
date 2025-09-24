const axios = require("axios")

axios.post("http://localhost:5000/api/create_common_task",{
  "type": "explanation",
  "text1": ""
})
.then((res)=>{
    console.log(res.data.message)
})
.catch((err)=>{
    console.log(err)
}

)