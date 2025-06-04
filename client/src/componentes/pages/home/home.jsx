import axios from "axios"
import "./home.css"
import { useState, useEffect, useCallback } from "react"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import { Footer } from "../../components/footer/footer.jsx"
import { NavLeft } from "../../components/nav_left/nav_left.jsx"
import "./home.css"
import { generateLevelTable } from "../../../levelGenerator.js"
import campaign_home_button from "../../../assets/specific_page/home/campaign_home_button.jpg"
import documents_home_button from "../../../assets/specific_page/home/documents_home_button.jpg"
import group_home_button from "../../../assets/specific_page/home/group_home_button.jpg"
import upgrade_home_button from "../../../assets/specific_page/home/upgrade_home_button.jpg"
import game_home_button from "../../../assets/specific_page/home/game_home_button.jpg"
import { useNavigate } from "react-router-dom"
import { Upgrade } from "../../components/upgrade/upgrade.jsx"
export function Home() {
    // const resetar = useCallback(()=>{
    //     axios.post("http://localhost:5000/api/clear_cookie",{},{withCredentials:true})
    //     .then((res)=>{console.log(res.data)})
    //     .catch((err)=>{console.log(err.response.data)})
    // },[])
    const navigate = useNavigate()

    const [levelWidth, setLevelWidth] = useState()

    const [upgradeStatus,setUpgradeStatus] = useState('upgrade_background_inactive')

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

    const [level, setLevel] = useState(9)

    useEffect(() => {
        console.log(generateLevelTable())
        generateLevelTable().forEach((item) => {
            if (userXp >= item.xpMin && userXp <= item.xpMax) {
                setLevel(item.level)
                setLevelWidth(userXp / item.xpMax * 100)
                console.log(levelWidth)
            }
        })
    }, [userXp])

    const [connected, setConnected] = useState(false)
    const [tokenError, setTokenError] = useState("")

    useEffect(() => {
        axios.post("http://localhost:5000/api/authorization", {}, { withCredentials: true })
            .then((res) => {
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
            .catch((err) => {
                console.log(err.response.data);
                setTokenError(err.response.data.message);
                localStorage.clear()
            })
    }, [])

    return (
        <div id="home">
            {/* Verificação se usuário está com TOKEN válido V */}
            {connected == false ? <TokenInvalid token_error={tokenError} /> :
                <div id="home_principal">
                    <div id="home_content">
                        <EnhancedNavTop
                            page="Home"
                            home={false}
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

                        <div id="home_content_principal">
                            <NavLeft
                                requestType="solicitations"
                                requestLocal="http://localhost:5000/api/my_solicitation"
                                listTitle="Solicitações"
                                userId={userId}
                                topButtons={false}
                                updateButton={true}
                                local="game"
                            />
                            <div id="home_content_principal_all">
                                <div id="home_content_principal_user">
                                    <div id="home_content_principal_user_image">
                                        <img src={`data:image/png;base64,${userImage}`} draggable={false} />
                                    </div>
                                    <div id="home_content_principal_user_info">
                                        <div id="home_content_principal_user_name">
                                            <p>{userName}</p>
                                        </div>
                                        <div>
                                            <p>{level}</p>
                                            <div id="home_content_principal_user_level">
                                                <div style={{ width: levelWidth + "%" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="home_content_principal_pages">
                                    <img src={campaign_home_button} id="campaign_button" onClick={()=>{navigate('/campaign')}}/>
                                    <img src={game_home_button} onClick={()=>{navigate('/games')}}/>
                                    <img src={group_home_button} onClick={()=>{navigate('/groups')}}/>
                                    <img src={documents_home_button} onClick={()=>{navigate('/documents')}}/>
                                    <img src={upgrade_home_button} onClick={()=>{setUpgradeStatus('upgrade_background_active')}}/>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                     <div id={upgradeStatus}>
                        <Upgrade exitFunction={setUpgradeStatus}/>
                        </div>
                    <Footer />
                      
                </div>


            }
         
        </div>
    )
}