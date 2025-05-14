import axios from "axios"
import "./home.css"
import { useState,useEffect,useCallback } from "react"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"

export function Home(){
    // const resetar = useCallback(()=>{
    //     axios.post("http://localhost:5000/api/clear_cookie",{},{withCredentials:true})
    //     .then((res)=>{console.log(res.data)})
    //     .catch((err)=>{console.log(err.response.data)})
    // },[])

    const [connected,setConnected] = useState(false)
    const [tokenError,setTokenError] = useState("")
    useEffect(()=>{
        axios.post("http://localhost:5000/api/authorization",{},{withCredentials:true})
        .then((res)=>{console.log(res.data);setConnected(true)})
        .catch((err)=>{console.log(err.response.data);setTokenError(err.response.data.message)})
    },[])
    return(
        <div id="home">
            {connected==false?<TokenInvalid token_error={tokenError}/>:""}
        </div>
    )
}