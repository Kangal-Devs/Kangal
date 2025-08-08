import "./campaign.css"
import { useState, useEffect, useCallback, use } from "react"
import { useNavigate } from "react-router-dom"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import { NavLeft } from "../../components/nav_left/nav_left.jsx"
import axios from "axios"

export function Campaign(){

    const navigate = useNavigate()

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
   

    
    const [currentCommonLessonId,setCurrentCommonLessonId] = useState()
    const [currentCommonLessonIntroduction,setCurrentCommonLessonIntroduction] = useState()


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
        <div id="campaign">
                {connected == false ? <TokenInvalid token_error={tokenError} /> : (
                    <div id="campaign_principal">
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
                    <div id="campaign_content">
                        <NavLeft

                            requestType="campaign"
                            requestLocal="http://localhost:5000/api/get_all_modules"
                            listTitle="Tema"
                            userId={userId}
                            topButtons={true}
                            updateButton={false}
                            local="campaign"
                            code="campaign"

                        />

                    



                    </div>
                    </div>
                )}
        </div>
    )
}