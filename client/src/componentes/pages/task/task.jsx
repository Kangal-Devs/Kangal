import "./task.css"
import { useState, useEffect, useCallback, use } from "react"
import { useNavigate } from "react-router-dom"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import { NavLeft } from "../../components/nav_left/nav_left.jsx"
import axios from "axios"
import {CommonLesson} from "../../components/common_lesson/common_lesson.jsx"
import clouds from "../../../assets/specific_page/task/clouds.png"
export function Task(){



    const navigate = useNavigate()

    const [lessons,setLessons] = useState()

    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userPassword, setUserPassword] = useState()
    const [userXp, setUserXp] = useState()
    const [userAccountType, setUserAccountType] = useState()
    const [userDate, setUserDate] = useState()
    const [userImage, setUserImage] = useState()
    const [userGithub, setUserGithub] = useState()
    const [userGender, setUserGender] = useState()
    const [userId, setUserId] = useState()

    const [connected, setConnected] = useState(false)
    const [tokenError, setTokenError] = useState("")

    const [currentModuleId,setCurrentModuleId] = useState()
    const [currentModuleName,setCurrentModuleName] = useState()
    
    const [currentCommonTaskId,setCurrentCommonTaskId] = useState()
    const [currentCommonLessonId,setCurrentCommonLessonId] = useState()

    useEffect(()=>{
        if(!(localStorage.getItem("currentCommonLesson"))){
            navigate("/campaign")
        }
    },[])

    useEffect(() => {
        axios.post("http://localhost:5000/api/authorization", {}, { withCredentials: true })
            .then((res) => {

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
            .catch((err) => {
                console.log(err.response.data);
                setTokenError(err.response.data.message);
                localStorage.clear()
            })
    }, [])
    
    

    return (
        <div id="task">
                {connected == false ? <TokenInvalid token_error={tokenError} /> : (
                    <div id="task_principal">
                         <EnhancedNavTop
                        page="Campanha"
                        home={true}
                        group={false}
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
                    <div id="task_content">
                        
                        <div >
                            <img src={clouds}/>
                            <h1>Explicação</h1>
                        </div>
                    



                    </div>
                    </div>
                )}
        </div>
    )
}