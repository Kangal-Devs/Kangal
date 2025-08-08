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
import { Skill } from "../../components/skill/skill.jsx"
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

    const [copyCodeGame,setCopyCodeGame] = useState("Copiar código")
    const [copyCodeSkill,setCopyCodeSkill] = useState("Copiar código")
    const [copyCodeExampleSkill,setCopyCodeExampleSkill] = useState("Copiar código")

    const [currentGameName, setCurrentGameName] = useState()
    const [currentGameId, setCurrentGameId] = useState()
    const [currentGameLink, setCurrentGameLink] = useState()
    const [currentGameDescription, setCurrentGameDescription] = useState()
    const [currentGameIcon, setCurrentGameIcon] = useState()
    const [currentGameSubject, setCurrentGameSubject] = useState()
    const [currentGameCode, setCurrentGameCode] = useState()

    const [currentSkillId,setCurrentSkillId] = useState()
    const [currentSkillTitle,setCurrentSkillTitle] = useState()
    const [currentSkillDescription,setCurrentSkillDescription] = useState()
    const [currentSkillCode,setCurrentSkillCode] = useState()
    const [currentSkillDescriptionExample,setCurrentSkillDescriptionExample] = useState()
    const [currentSkillCodeExample,setCurrentSkillCodeExample] = useState()
    const [currentSkillSubject,setCurrentSkillSubject] = useState()

    const [gameCodeStatus, setGameCodeStatus] = useState(false)
    const [enterGameStatus, setEnterGameStatus] = useState(false)
    const [skills, setSkills] = useState()

    const [connected, setConnected] = useState(false)
    const [tokenError, setTokenError] = useState("")

    useEffect(()=>{
        if(currentSkillId){
            axios.post("http://localhost:5000/api/get_skill",{skillId:currentSkillId})
            .then((res)=>{
                setCurrentSkillSubject(res.data.message.subject)
                setCurrentSkillTitle(res.data.message.title)  
                setCurrentSkillCode(res.data.message.code)
                setCurrentSkillCodeExample(res.data.message.codeExample)
                setCurrentSkillDescription(res.data.message.description)
                setCurrentSkillDescriptionExample(res.data.message.descriptionExample)
                setCopyCodeSkill("Copiar código")
                setCopyCodeExampleSkill("Copiar código")
            })  
            .catch(err=>console.log(err))
        }
    },[currentSkillId])

    useEffect(() => {
        if (currentGameId) {
            axios.post("http://localhost:5000/api/get_game", { id: currentGameId })
                .then((res) => {
                    
                    setCurrentGameIcon(res.data.message.icon)
                    setCurrentGameDescription(res.data.message.description)
                    setCurrentGameSubject(res.data.message.subject)
                    setCurrentGameCode(res.data.message.code)
                    setCurrentGameName(res.data.message.name)
                    setCurrentGameLink(res.data.message.link)
                    axios.post("http://localhost:5000/api/get_skills",{gameId:currentGameId})
                    .then((res)=>{
                 
                        setSkills(res.data.message.map((skill)=>{
                            return <Skill subject={skill.subject} id={skill._id}image={skill.image} title={skill.title} funcAlter={[setCurrentSkillId]}/>
                        }))
                    })
                    .catch((err)=>{console.log(err)})
                })
                .catch((err) => { console.log(err) })
        }
    }, [currentGameId])

    useEffect(() => {
        axios.get("http://localhost:5000/api/get_all_games")
            .then((res) => {
                console.log(res)
                setGames(res.data.message.map((game, i) => {
                    return <Game key={"G" + i} id={game._id} name={game.name} icon={game.icon} thumbnail={game.thumbnail} subject={game.subject} description={game.description} link={game.link}
                        funcAlter={[setEnterGameStatus, setCurrentGameName, setCurrentGameLink, setCurrentGameId]}
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
                        page="Jogos"
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

                                !currentSkillId?(<div id="about_game">
                                    <div>
                                        <button className="button_arrow" onClick={() => { setCurrentGameId() }}>
                                            <img src={arrow} />
                                        </button>
                                    </div>
                                    <div id="about_game_principal">
                                        <div id="about_game_top">
                                            <div id="about_game_top_icon">
                                                <img src={`data:image/png;base64,${currentGameIcon}`} />
                                            </div>
                                            <div>
                                                <h1>{currentGameName}</h1>
                                                <p>{currentGameSubject}</p>
                                                <button onClick={() => { setEnterGameStatus(true) }}>Jogar</button>
                                            </div>
                                        </div>
                                        <p id="about_game_description">{currentGameDescription}</p>
                                        <p id="about_game_code_title">Código</p>
                                        <div id="about_game_code_part">
                                            <div id="about_game_code_part_decoration"></div>
                                            <div id="about_game_code_part_content">
                                                <div id="about_game_code_part_principal">
                                                    <pre>{currentGameCode}</pre>
                                                </div>
                                                <div id="about_game_code_part_blur">
                                                    <button onClick={() => { setGameCodeStatus(true);setCopyCodeGame("Copiar código") }}>Ver tudo</button>
                                                </div>
                                            </div>
                                        </div>
                                        <p id="about_game_skill_title">Aprenda:</p>
                                        <div id="about_game_skill_part">
                                               {skills}
                                                
                                        </div>
                                    </div>
                                </div>):(
                                    <div id="about_skill">
                                        <div>
                                        <button className="button_arrow" onClick={() => { setCurrentSkillId() }}>
                                            <img src={arrow} />
                                        </button>
                                    </div>
                                    <div id="about_skill_principal">
                                            <h1>{currentSkillSubject}</h1>
                                            <h2>{currentSkillTitle}</h2>
                                            <p>{currentSkillDescription}</p>
                                            <p className="about_skill_code_title">Código no jogo:</p>
                                            <div className="about_skill_code_part">
                                            <div className="about_skill_code_decoration">
                                            </div>
                                            <div className="about_skill_code_principal">
                                                <pre>
                                                    {currentSkillCode}
                                                </pre>
                                                <button onClick={()=>{setCopyCodeSkill("Código copiado");navigator.clipboard.writeText(currentSkillCode)}}>{copyCodeSkill}</button>
                                            </div>
                                            </div>
                                            <p>{currentSkillDescriptionExample}</p>
<div className="about_skill_code_part">
                                            <div className="about_skill_code_decoration">
                                            </div>
                                            <div className="about_skill_code_principal">
                                                <pre>
                                                    {currentSkillCodeExample}
                                                </pre>
                                                <button onClick={()=>{setCopyCodeExampleSkill("Código copiado");navigator.clipboard.writeText(currentSkillCodeExample)}}>{copyCodeExampleSkill}</button>
                                            </div>
                                            </div>


                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                    {enterGameStatus ? (
                        <div id="enter_game_background" onClick={() => { setEnterGameStatus(false) }}>
                            <div onClick={(e) => { e.stopPropagation() }}>
                                <p>Tem certeza que quer entrar no jogo:</p> <p>{currentGameName}</p>
                                <button id="enter_game_play" onClick={() => { navigate(currentGameLink) }}>Jogar</button>
                                <button id="enter_game_cancel" onClick={() => { setEnterGameStatus(false) }}>Cancelar</button>

                            </div>
                        </div>) : null}

                    {
                        gameCodeStatus ? 
                        (<div id="code_game_background" onClick={() => { setGameCodeStatus(false); }}>
                            <div onClick={(e) => { e.stopPropagation() }} id="code_game_bar">
                                <div id="code_game_bar_top">
                                    <p>Código:</p>
                                    <button onClick={() => { setGameCodeStatus(false); }}>X</button>
                                </div>
                                <pre>{currentGameCode}</pre>
                                <button id="code_game_bar_copy_button"onClick={()=>{setCopyCodeGame("Código copiado");navigator.clipboard.writeText(currentGameCode)}}>{copyCodeGame}</button>
                    
                            </div>
                        </div>) : null
                    }
                    
                </div>

            }


        </div>
    )
}


