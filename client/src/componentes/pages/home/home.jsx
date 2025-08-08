import axios from "axios"
import "./home.css"
import { useState, useEffect, useCallback } from "react"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import { Footer } from "../../components/footer/footer.jsx"
import { NavLeft } from "../../components/nav_left/nav_left.jsx"
import "./home.css"
import { generateLevelTable } from "../../../levelGenerator.js"
import campaign_home_button from "../../../assets/specific_page/home/campaign_home_button2.png"
import documents_home_button from "../../../assets/specific_page/home/documents_home_button2.png"
import group_home_button from "../../../assets/specific_page/home/group_home_button2.png"
import upgrade_home_button from "../../../assets/specific_page/home/upgrade_home_button2.png"
import game_home_button from "../../../assets/specific_page/home/game_home_button3.png"
import { useNavigate } from "react-router-dom"
import { Upgrade } from "../../components/upgrade/upgrade.jsx"
import { Alert } from "../../components/alert/alert.jsx"
export function Home() {

    // const resetar = useCallback(()=>{
    //     axios.post("http://localhost:5000/api/clear_cookie",{},{withCredentials:true})
    //     .then((res)=>{console.log(res.data)})
    //     .catch((err)=>{console.log(err.response.data)})
    // },[])

    const navigate = useNavigate()
    const [levelWidth, setLevelWidth] = useState()
    const [acceptSolicitationStatus, setAcceptSolicitationStatus] = useState("accept_solicitation_inactive")
    const [acceptSolicitationName, setAcceptSolicitationName] = useState('NAME')
    const [acceptSolicitationDescription, setAcceptSolicitationDescription] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has")
    const [acceptSolicitationOwner, setAcceptSolicitationOwner] = useState('Jordan')
    const [acceptSolicitationImage, setAcceptSolicitationImage] = useState("")

    const [upgradeStatus, setUpgradeStatus] = useState('upgrade_background_inactive')

    const [alertMessage, setAlertMessage] = useState("")
    const [isError, setIsError] = useState(false)
    const [alertStatus, setAlertStatus] = useState("alert_inactive")

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
    const [groupId, setGroupId] = useState()

    const [level, setLevel] = useState(9)

    useEffect(() => {
      
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

    const showAlert = useCallback((isError, alertMessage, alertTime, reset) => {
        setIsError(isError);
        setAlertMessage(alertMessage)
        setAlertStatus('alert_active')
        setTimeout(() => {
            setAlertStatus('alert_inactive')
            if (reset == true) window.location.reload()
        }, alertTime)
    }, [])

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
                                vars={
                                    [
                                        acceptSolicitationStatus,
                                        acceptSolicitationName,
                                        acceptSolicitationDescription,
                                        acceptSolicitationOwner,
                                        acceptSolicitationImage,
                                        groupId
                                    ]}

                                funcAlter={
                                    [
                                        setAcceptSolicitationStatus,
                                        setAcceptSolicitationName,
                                        setAcceptSolicitationDescription,
                                        setAcceptSolicitationOwner,
                                        setAcceptSolicitationImage,
                                        setGroupId
                                    ]}

                                code="home"
                                listTitle="Solicitações"
                                userId={userId}
                                topButtons={false}
                                updateButton={true}
                              
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
                                            <p >Level: {level}</p>
                                            <div id="home_content_principal_user_level">
                                                <div style={{ width: levelWidth + "%" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="home_content_principal_pages">
                                    <img src={campaign_home_button} id="campaign_button" onClick={() => { navigate('/campaign') }} />
                                    <img src={game_home_button} onClick={() => { navigate('/games') }} />
                                    <img src={group_home_button} onClick={() => { navigate('/groups') }} />
                                    <img src={documents_home_button} onClick={() => { navigate('/documents') }} />
                                    <img src={upgrade_home_button} onClick={() => { setUpgradeStatus('upgrade_background_active') }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id={upgradeStatus}>
                        <Upgrade exitFunction={setUpgradeStatus} />
                    </div>
                    <div id={acceptSolicitationStatus}>
                        <div id="accept_solicitation_top" >
                            <button onClick={() => { setAcceptSolicitationStatus("accept_solicitation_inactive") }}>X</button>
                        </div>
                        <div id="accept_solicitation_middle">
                            <div id="accept_solicitation_img">
                                <img src={`data:image/png;base64,${acceptSolicitationImage}`} />
                            </div>
                            <div>
                                <h4>{acceptSolicitationName}</h4>
                                <p>por: {acceptSolicitationOwner}</p>
                                <p>Descrição:</p>
                                <p>{acceptSolicitationDescription.length < 120 ? acceptSolicitationDescription : acceptSolicitationDescription.slice(0, 120) + "..."}</p>
                            </div>
                        </div>
                        <div id="accept_solicitation_bottom">
                            <button id="refuse_button" onClick={() => {
                                    console.log(userId);
                                    console.log(groupId);
                                    axios.delete(`http://localhost:5000/api/delete_solicitation/${userId}/${groupId}`)
                                    .then((res)=>{
                                        console.log("ola")
                                        setAcceptSolicitationStatus("accept_solicitation_inactive")
                                        showAlert(false, "Solicitação recusada", 1200, true)
                                    })
                                    .catch((err)=>{
                                            console.log(err)
                                    })
                            }}>Recusar</button>


                            <button id="accept_button" onClick={() => {
                                axios.post("http://localhost:5000/api/create_user_group", { userId: userId, groupId: groupId })
                                    .then((res) => {
                                        setAcceptSolicitationStatus("accept_solicitation_inactive")
                                        showAlert(false, "Solicitação aceita", 1200, true)

                                        console.log(res)
                                    })
                                    .catch((err) => { console.log(err) })
                            }}>Aceitar</button>
                        </div>
                    </div>

                    <div id={alertStatus}>
                        <Alert error={isError} message={alertMessage} />
                    </div>
                    <Footer />
                </div>
            }
        </div>
    )

}



