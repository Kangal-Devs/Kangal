const axios = require("axios")

axios.get("http://localhost:5000/api/get_all_groups")
.then((res)=>{console.log(JSON.stringify(res.data.message))})
.catch((err)=>{console.log(err)})