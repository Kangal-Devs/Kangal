import { useState, useEffect, useCallback, use } from "react"
import { useNavigate } from "react-router-dom"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import { NavLeft } from "../../components/nav_left/nav_left.jsx"
import axios from "axios"
import { Upgrade } from "../../components/upgrade/upgrade.jsx"
import { Alert } from "../../components/alert/alert.jsx"
import { Game } from "../../components/game/game.jsx"
import arrow from "../../../assets/specific_page/game/arrow.png"
import "./games.css"
export function Games() {
    
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

    const [games, setGames] = useState()

    const [currentGameName, setCurrentGameName] = useState()
    const [currentGameId, setCurrentGameId] = useState()
    const [currentGameLink, setCurrentGameLink] = useState()
    const [currentGameDescription, setCurrentGameDescription] = useState()
  

    const [enterGameStatus, setEnterGameStatus] = useState(false)

    const [connected, setConnected] = useState(false)
    const [tokenError, setTokenError] = useState("")

    useEffect(()=>{
        if(currentGameId){
            axios.post("http://localhost:5000/api/get_game",{id:currentGameId})
            .then((res)=>{console.log(res)})
            .catch((err)=>{console.log(err)})
        }
    },[currentGameId])

    useEffect(() => {
        axios.get("http://localhost:5000/api/get_all_games")
            .then((res) => {
                console.log(res)
                setGames(res.data.message.map((game, i) => {
                    return <Game key={"G" + i} id={game._id}name={game.name} icon={game.icon} thumbnail={game.thumbnail} subject={game.subject} description={game.description} link={game.link}
                        funcAlter={[setEnterGameStatus,setCurrentGameName,setCurrentGameLink,setCurrentGameId]}
                    />
                }))
            })
            .catch((err) => {
                console.log(err)
            })
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

                            {!currentGameId ?
                                (<div id="list_games">
                                    {
                                        games
                                    }

                                </div>) :
                                (<div id="about_game">
                                    <button id="button_arrow" onClick={()=>{setCurrentGameId()}}>
                                        <img src={arrow} />
                                    </button>
                                </div>)
                            }

                        </div>
                    </div>
                    {enterGameStatus ? (
                        <div id="enter_game_background" onClick={()=>{setEnterGameStatus(false)}}>
                            <div onClick={(e)=>{e.stopPropagation()}}>
                                <p>Tem certeza que quer entrar no jogo:</p> <p>{currentGameName}</p>
                                 <button id="enter_game_play" onClick={()=>{navigate(currentGameLink)}}>Jogar</button>
                                <button id="enter_game_cancel" onClick={()=>{setEnterGameStatus(false)}}>Cancelar</button>
                               
                            </div>
                        </div>) : null}
                </div>

            }


        </div>
    )
}