import { useState, useEffect, useCallback, use } from "react"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import { NavLeft } from "../../components/nav_left/nav_left.jsx"
import axios from "axios"
import { Upgrade } from "../../components/upgrade/upgrade.jsx"
import { Alert } from "../../components/alert/alert.jsx"
import {Game } from "../../components/game/game.jsx"

import "./games.css"
export function Games(){

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
        const [isGamesListActive,setIsGamesListActive] = useState(true)
        const [currentSubjectId,setCurrentSubjectId] = useState("")

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
        <div id="games">
            {connected == false ? <TokenInvalid token_error={tokenError} /> :
            <div id="games_principal">
                <EnhancedNavTop
                        page="Games"
                        home={true}
                        group={true}
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
                    <div id="games_content">
                            <NavLeft

                            // requestType="games"
                            // requestLocal="http://localhost:5000/api/get_all_user_group"
                            listTitle=""
                            userId={userId}
                            topButtons={true}
                            updateButton={false}
                            local="game"
                            // code="group"
              
                           
                        />
                        <div id="games_content_principal">

                            {isGamesListActive?
                            (<div id="listGames">
                               <Game icon="https://dl2.myminifactory.com/object-assets/669c25f7d0bf44.07647377/images/720X720-4.jpg"thumbnail="https://p4.wallpaperbetter.com/wallpaper/761/716/33/look-face-predator-leopard-wallpaper-preview.jpg" name="TEST" description="Descricao aqui" subjects="CSS,JAVASCRIPT" link={"/games/hangman"}/>
                               <Game icon="https://dl2.myminifactory.com/object-assets/669c25f7d0bf44.07647377/images/720X720-4.jpg"thumbnail="https://p4.wallpaperbetter.com/wallpaper/761/716/33/look-face-predator-leopard-wallpaper-preview.jpg" name="TEST" description="Descricao aqui" subjects="CSS,JAVASCRIPT"/>
                                <Game icon="https://dl2.myminifactory.com/object-assets/669c25f7d0bf44.07647377/images/720X720-4.jpg"thumbnail="https://p4.wallpaperbetter.com/wallpaper/761/716/33/look-face-predator-leopard-wallpaper-preview.jpg" name="TEST" description="Descricao aqui" subjects="CSS,JAVASCRIPT"/>
                                 <Game icon="https://dl2.myminifactory.com/object-assets/669c25f7d0bf44.07647377/images/720X720-4.jpg"thumbnail="https://p4.wallpaperbetter.com/wallpaper/761/716/33/look-face-predator-leopard-wallpaper-preview.jpg" name="TEST" description="Descricao aqui" subjects="CSS,JAVASCRIPT"/>
                                  <Game icon="https://dl2.myminifactory.com/object-assets/669c25f7d0bf44.07647377/images/720X720-4.jpg"thumbnail="https://p4.wallpaperbetter.com/wallpaper/761/716/33/look-face-predator-leopard-wallpaper-preview.jpg" name="TEST" description="Descricao aqui" subjects="CSS,JAVASCRIPT"/>
                                   <Game icon="https://dl2.myminifactory.com/object-assets/669c25f7d0bf44.07647377/images/720X720-4.jpg"thumbnail="https://p4.wallpaperbetter.com/wallpaper/761/716/33/look-face-predator-leopard-wallpaper-preview.jpg" name="TEST" description="Descricao aqui" subjects="CSS,JAVASCRIPT"/>
                                    <Game icon="https://dl2.myminifactory.com/object-assets/669c25f7d0bf44.07647377/images/720X720-4.jpg"thumbnail="https://p4.wallpaperbetter.com/wallpaper/761/716/33/look-face-predator-leopard-wallpaper-preview.jpg" name="TEST" description="Descricao aqui" subjects="CSS,JAVASCRIPT"/>
                                 
                            </div>):
                            (<div></div>)
                            }
                            
                            </div>
                    </div>

            </div>
            }
        </div>
    )
}