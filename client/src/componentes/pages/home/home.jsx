import axios from "axios"
import "./home.css"
import { useState,useEffect,useCallback } from "react"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import "./home.css"
export function Home(){
    // const resetar = useCallback(()=>{
    //     axios.post("http://localhost:5000/api/clear_cookie",{},{withCredentials:true})
    //     .then((res)=>{console.log(res.data)})
    //     .catch((err)=>{console.log(err.response.data)})
    // },[])

    const [userName,setUserName] = useState()
    const [userEmail,setUserEmail] = useState()
    const [userPassword,setUserPassword] = useState()
    const [userXp,setUserXp] = useState()
    const [userAccountType,setUserAccountType] = useState()
    const [userDate,setUserDate] = useState()
    const [userImage,setUserImage] = useState()
    const [userGithub,setUserGithub] = useState()
    const [userGender,setUserGender] = useState()
     const [userId,setUserId] = useState()

    const [connected,setConnected] = useState(false)
    const [tokenError,setTokenError] = useState("")
    useEffect(()=>{
        axios.post("http://localhost:5000/api/authorization",{},{withCredentials:true})
        .then((res)=>{
            console.log(res.data.message);
            setConnected(true)
            setUserName(res.data.message.name)
            setUserXp(res.data.message.xp)
            setUserEmail(res.data.message.email)
            setUserPassword(res.data.message.password)
            setUserAccountType(res.data.message.accountType)
            setUserDate(res.data.message.date)
            // setUserImage(res.data.message.image)
            setUserImage(localStorage.getItem("image"))
            setUserGithub(res.data.message.github)
            setUserGender(res.data.message.gender)
            setUserId(res.data.message._id)
        })
        .catch((err)=>{console.log(err.response.data);setTokenError(err.response.data.message)})
    },[])
    return(
        <div id="home">
            {connected==false?<TokenInvalid token_error={tokenError}/>:
                <div id="home_principal">
                    <EnhancedNavTop 
                    page="Home"
                    home={true}
                    userName={userName}
                    userImage={userImage}
                    userEmail={userEmail}
                    userPassword={userPassword}
                    userDate={userDate}
                    userAccountType={userAccountType}
                    userGithub={userGithub}
                    userGender={userGender}
                    userId={userId}
                    
                    />
                </div>
            }
        </div>
    )
}