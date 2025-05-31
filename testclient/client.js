import axios from "axios"

// axios.post("http://localhost:5000/api/get_user",{})

axios.post("http://localhost:5000/api/create_group",{name:"groupTest3",description:"descriptionTest3",owner:"Jacu"})
.then((res)=>{console.log(res.data.message)})
.catch((err)=>{console.log(err.response.data.message)})