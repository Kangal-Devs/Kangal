import "./task.css"
import { useState, useEffect, useCallback, use } from "react"
import { useNavigate } from "react-router-dom"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import { NavLeft } from "../../components/nav_left/nav_left.jsx"
import axios from "axios"
import { CommonLesson } from "../../components/common_lesson/common_lesson.jsx"
import { CommonTaskButton } from "../../components/common_task_button/common_task_button.jsx"
import clouds from "../../../assets/specific_page/task/clouds.png"
import report from "../../../assets/specific_page/task/report.png"
import { wrongAnswerMessage, rightAnswerMessage } from "./task_response_messages.js"
export function Task() {



    const navigate = useNavigate()

    const [lessons, setLessons] = useState()

    const [taskResponseMessage, setTaskResponseMessage] = useState("")

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

    //Imagine que um usuário tenha selecionado o botão que acredita ser o certo
    // e então clica em verificar, esse botão está ligado ao que ele pode fazer tanto depois de verificar a
    // resposta, quanto não pode.
    const [verified, setVerified] = useState(false)

    const [buttonActive, setButtonActive] = useState([])



    const [connected, setConnected] = useState(false)
    const [tokenError, setTokenError] = useState("")

    const [currentModuleId, setCurrentModuleId] = useState()
    const [currentModuleName, setCurrentModuleName] = useState()

    const [currentCommonTaskId, setCurrentCommonTaskId] = useState()
    const [currentCommonLessonId, setCurrentCommonLessonId] = useState()

    const [userResponse, setUserResponse] = useState()

    // commonTaskTypes : select,toComplete,explanation,toCorrect,advertising

    const [currentCommonTaskText1, setCurrentCommonTaskText1] = useState(
        // "JavaScript é a linguagem que faz os sites deixarem de ser apenas páginas estáticas cheias de texto e imagens, e se transformarem em ambientes interativos onde você pode clicar, digitar e ver mudanças instantâneas sem precisar recarregar a página.<br><br><span class='wrong_context '>Com ele, é possível criar menus que se abrem ao clicar, animações suaves, validações de formulários enquanto você digita e até jogos completos que rodam direto no navegador.</span><br><span class='note_context'>Antes do JavaScript, sites eram lentos, estáticos e qualquer alteração exigia recarregar a página inteira, tornando a navegação pouco prática.</span><br><span class='right_context'>Aprender JavaScript é essencial para quem quer trabalhar com web moderna.</span><br><span class='idea_context'>Aprender JavaScript é essencial para quem quer trabalhar com web moderna.</span>JavaScript é a linguagem que faz os sites deixarem de ser apenas páginas estáticas cheias de texto e imagens, e se transformarem em ambientes interativos onde você pode clicar, digitar e ver mudanças instantâneas sem precisar recarregar a página.<br><br><span class='wrong_context '>Com ele, é possível criar menus que se abrem ao clicar, animações suaves, validações de formulários enquanto você digita e até jogos completos que rodam direto no navegador.</span>"

    )
    const [currentCommonTaskText2, setCurrentCommonTaskText2] = useState()
    const [currentCommonTaskType, setCurrentCommonTaskType] = useState("select")
    const [currentCommonTaskCode, setCurrentCommonTaskCode] = useState()
    const [currentCommonTaskImage, setCurrentCommonTaskImage] = useState()
    const [currentCommonTaskNote, setCurrentCommonTaskNote] = useState()
    const [currentCommonTaskLink, setCurrentCommonTaskLink] = useState()
    const [currentCommonTaskCorrectAnswers, setCurrentCommonTaskCorrectAnswers] = useState(["console.log(`Olá mundo!`)"])
    const [currentCommonTaskPossibleAnswers, setCurrentCommonTaskPossibleAnswers] = useState(
        [
            "console.log(`Olá mundo!`)",
            "console.log(Olá mundo!)",
            "print.log(`Olá mundo!`)",
            "console(`Olá mundo!`)",
            "Console.log(Olá mundo!)"
        ]
    )

    useEffect(() => {
        console.log(userResponse)


    }, [userResponse])

    useEffect(() => {
        if (!(localStorage.getItem("currentCommonLesson"))) {
            navigate("/campaign")
        }
    }, [])

    const temporaryTitles = [
        { realTitle: "explanation", temporary: "Explicação" },
        { realTitle: "select", temporary: "Seleção" },
        { realTitle: "toComplete", temporary: "Complete" },
        { realTitle: "toCorrect", temporary: "Corrija" },
        { realTitle: "advertising", temporary: "Publicidade" },
    ]

    const [taskTitle, setTaskTitle] = useState("")
       
    useEffect(() => {
       
         temporaryTitles.forEach((item,i)=>{
    
            if(currentCommonTaskType==item.realTitle){
                setTaskTitle(item.temporary)
            }
        })
    }, [currentCommonTaskType,temporaryTitles])

    const verify = useCallback(() => {
        if (!(currentCommonTaskCorrectAnswers.length > 1)) {

            // console.log("essa lição so tem uma resposta possível")
            // console.log(currentCommonTaskCorrectAnswers[0])
            //  console.log(userResponse)

            setVerified(true)

            if (userResponse == currentCommonTaskCorrectAnswers[0]) {
                const randomNumber = Math.floor(Math.random() * rightAnswerMessage.length);
                setTaskResponseMessage(rightAnswerMessage[randomNumber])
                console.log(rightAnswerMessage[randomNumber])
            }
            else {
                const randomNumber = Math.floor(Math.random() * wrongAnswerMessage.length);
                setTaskResponseMessage(wrongAnswerMessage[randomNumber])
                console.log(randomNumber)
                console.log(wrongAnswerMessage[randomNumber])
            }
        }
        else {
            // console.log("essa lição tem mais de uma resposta possível")
        }
    }, [userResponse, currentCommonTaskCorrectAnswers, wrongAnswerMessage, rightAnswerMessage])



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



                        <div id="task_content_principal">
                            <div id="task_part_top">
                                <h1>{taskTitle}</h1>



                                {currentCommonTaskText1 ? (<p dangerouslySetInnerHTML={{ __html: currentCommonTaskText1 }} />) : null}

                                {currentCommonTaskType == "select" ?

                                    currentCommonTaskPossibleAnswers.map((possibleAnswer, i) => {
                                        return <CommonTaskButton

                                            value={possibleAnswer}
                                            i={i}
                                            possibleAnswersCount={currentCommonTaskPossibleAnswers.length}
                                            buttonActive={buttonActive}
                                            funcAlter={[setButtonActive, setUserResponse]}
                                            verified={verified}
                                            correctAnswer={currentCommonTaskCorrectAnswers[0]}
                                        />
                                    })
                                    : null}



                                {currentCommonTaskText2 ? (<p dangerouslySetInnerHTML={{ __html: currentCommonTaskText2 }} />) : null}
                            </div>

                            {
                                (currentCommonTaskType == "explanation" || currentCommonTaskType == "advertising") ?
                                    (<div className="task_part_bottom">

                                        <button id="report_button_1">
                                            <img src={report} />
                                        </button>
                                        <button id="continue_button_1">Continuar</button>
                                    </div>) : (
                                        <div className="task_part_bottom">
                                            <button id="report_button_2">
                                                <img src={report} />
                                            </button>
                                            <p id="task_response_message">{taskResponseMessage}</p>
                                            <button id="continue_button_2"
                                                onClick={() => {
                                                    if (!verified) {
                                                        if (userResponse) {
                                                            verify()
                                                        }
                                                    }
                                                    else {

                                                    }
                                                }}>
                                                {
                                                    verified ? "Próximo" : "Verificar"
                                                }
                                            </button>
                                        </div>
                                    )
                            }
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}