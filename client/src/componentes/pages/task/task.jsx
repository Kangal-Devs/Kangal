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
import copy_code from "../../../assets/specific_page/task/copy_code.png"
import { wrongAnswerMessage, rightAnswerMessage } from "./task_response_messages.js"
export function Task() {



    //Estados para se resetar assim que começar um novo exercício:
    // saveUserResponse
    // userResponse
    // verified
    // currentCommonTaskId , text1,text2,code,image,code,possibleAnswers,correctAnswers, link
    // TaskResponseMessage

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

    // Imagine que um usuário tenha selecionado o botão que acredita ser o certo
    // e então clica em verificar, esse botão está ligado ao que ele pode fazer tanto depois de verificar a
    // resposta, quanto não pode.
    const [verified, setVerified] = useState(false)

    const [buttonActive, setButtonActive] = useState([])

    // AllTaskCount pega a quantidade de exerícios numa lição, imagine que seja 10,
    // CorrectTaskCount pega a quantidade de acertos totais, e faz um calculo;
    // esse calculo resulta em um fração, imagine que há 10 exercícios e você acertou 5,
    // então seria 5/10, você irá ganhar apenas 1/2 dos pontos da lição, imagine que
    // a lição te dê 200 pontos se você acertar tudo, então 1/2 * 200 = 100, você 
    // irá ganhar apenas 100 pontos ao final.
    const [allTaskCount,setAllTaskCount] = useState()
    const [correctTaskCount,setCorrectTaskCount] = useState()

    const [connected, setConnected] = useState(false)
    const [tokenError, setTokenError] = useState("")

    const [currentModuleId, setCurrentModuleId] = useState()
    const [currentModuleName, setCurrentModuleName] = useState()

    const [currentCommonTaskId, setCurrentCommonTaskId] = useState()
    const [currentCommonLessonId, setCurrentCommonLessonId] = useState()

    const [userResponse, setUserResponse] = useState()
    const [saveUserResponse, setSaveUserResponse] = useState()
    // commonTaskTypes : select,toComplete,explanation,toCorrect,advertising

    const [reportTaskStatus,setReportTaskStatus] = useState(false)
    const [reportTaskReason,setReportTaskReason] = useState("")

    const [currentCommonTaskText1, setCurrentCommonTaskText1] = useState(
        // "JavaScript é a linguagem que faz os sites deixarem de ser apenas páginas estáticas cheias de texto e imagens, e se transformarem em ambientes interativos onde você pode clicar, digitar e ver mudanças instantâneas sem precisar recarregar a página.<br><br><span class='wrong_context '>Com ele, é possível criar menus que se abrem ao clicar, animações suaves, validações de formulários enquanto você digita e até jogos completos que rodam direto no navegador.</span><br><span class='note_context'>Antes do JavaScript, sites eram lentos, estáticos e qualquer alteração exigia recarregar a página inteira, tornando a navegação pouco prática.</span><br><span class='right_context'>Aprender JavaScript é essencial para quem quer trabalhar com web moderna.</span><br><span class='idea_context'>Aprender JavaScript é essencial para quem quer trabalhar com web moderna.</span>JavaScript é a linguagem que faz os sites deixarem de ser apenas páginas estáticas cheias de texto e imagens, e se transformarem em ambientes interativos onde você pode clicar, digitar e ver mudanças instantâneas sem precisar recarregar a página.<br><br><span class='wrong_context '>Com ele, é possível criar menus que se abrem ao clicar, animações suaves, validações de formulários enquanto você digita e até jogos completos que rodam direto no navegador.</span>"

    )
    const [currentCommonTaskText2, setCurrentCommonTaskText2] = useState("")
    const [currentCommonTaskType, setCurrentCommonTaskType] = useState("toComplete")
    const [currentCommonTaskCode, setCurrentCommonTaskCode] = useState(
        `XXX 
    `
    )
    const [currentCommonTaskImage, setCurrentCommonTaskImage] = useState()
    const [currentCommonTaskNote, setCurrentCommonTaskNote] = useState()
    const [currentCommonTaskLink, setCurrentCommonTaskLink] = useState()
    const [currentCommonTaskCorrectAnswers, setCurrentCommonTaskCorrectAnswers] = useState([`const palavra = "A"
function write(palavra){
console.log(palavra)
}

write(palavra)`,
`B
B
B`,"TTT","BNA","A","B","L","Z"])
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

    useEffect(()=>{
        if(currentCommonTaskCode){
            console.log(currentCommonTaskCode.split("XXX")[0].length)
        }
    },[currentCommonTaskCode])
    const temporaryTitles = [
        { realTitle: "explanation", temporary: "Explicação" },
        { realTitle: "select", temporary: "Seleção" },
        { realTitle: "toComplete", temporary: "Complete" },
        { realTitle: "toCorrect", temporary: "Corrija" },
        { realTitle: "advertising", temporary: "Publicidade" },
    ]

    const [taskTitle, setTaskTitle] = useState("")

    useEffect(() => {

        temporaryTitles.forEach((item, i) => {

            if (currentCommonTaskType == item.realTitle) {
                setTaskTitle(item.temporary)
            }
        })
    }, [currentCommonTaskType, temporaryTitles])

    const reportTask = useCallback(()=>{
        
        axios.post("http://localhost:5000/api/create_common_task_report",{
            userId,
            reason:reportTaskReason,
            commonTaskId:currentCommonTaskId
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    },[userId,reportTaskReason,currentCommonTaskId])

    useEffect(()=>{
        if(saveUserResponse){
            console.log("EII"+saveUserResponse)
        }
    },[saveUserResponse])

    const verify = useCallback(() => {
        if (!(currentCommonTaskCorrectAnswers.length > 1)) {

            // console.log("essa lição so tem uma resposta possível")
            // console.log(currentCommonTaskCorrectAnswers[0])
            //  console.log(userResponse)
            setSaveUserResponse(userResponse)
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
            setSaveUserResponse(userResponse)
            setVerified(true)
            for(let j=0;j<currentCommonTaskCorrectAnswers.length;j++){
                if(currentCommonTaskCorrectAnswers[j]==userResponse){
                    const randomNumber = Math.floor(Math.random() * rightAnswerMessage.length);
                    console.log(rightAnswerMessage[randomNumber])
                    setTaskResponseMessage(rightAnswerMessage[randomNumber])
                    return;
                }
            }
             const randomNumber = Math.floor(Math.random() * wrongAnswerMessage.length);
            setTaskResponseMessage(wrongAnswerMessage[randomNumber])
            // console.log(randomNumber)
            // console.log(wrongAnswerMessage[randomNumber])
            
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



                                {currentCommonTaskText1 ?
                                    (<p dangerouslySetInnerHTML={{ __html: currentCommonTaskText1 }} />) : null
                                }

                                {
                                    currentCommonTaskType == "select" ?

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
                                        : null
                                }
                                {
                                    (currentCommonTaskCode && currentCommonTaskType!="toComplete")?
                                    currentCommonTaskType=="toCorrect"?
                                    
                                    (<>
                                    <div id="to_correct_title">
                                    <h2>❌Código errado:</h2>
                                    <button id="copy_wrong_code" onClick={()=>{
                                        navigator.clipboard.writeText(currentCommonTaskCode)
                                    }}>
                                        <img src={copy_code}/>
                                    </button>
                                    </div>
                                    <div id="to_correct_principal">
                                        <pre>{currentCommonTaskCode}</pre>
                                    </div>
                                    </>)
                                    :
                                     (<>
                                    <div id="common_code_title">
                                    <h2>Código:</h2>
                                    <button id="copy_common_code" onClick={()=>{
                                        navigator.clipboard.writeText(currentCommonTaskCode)
                                    }}>
                                        <img src={copy_code}/>
                                    </button>
                                    </div>
                                    <div id="common_code_principal">
                                        <pre>{currentCommonTaskCode}</pre>
                                    </div>
                                    </>)

                                    :null
                                    
                                }
                                {
                                    currentCommonTaskType=="toComplete"?
                                    <><div id="to_complete_title">
                                    
                                        <button>
                                            <img src={copy_code} onClick={()=>{navigator.clipboard.writeText(userResponse)}}/>
                                        </button>
                                        {verified?<div id="to_complete_title_correct_response_list">
                                        {
                                            <button className="to_complete_response" onClick={()=>{setUserResponse(saveUserResponse)}}>Minha Resposta</button>
                                        }
                                        {   
                                            currentCommonTaskCorrectAnswers.map((item,i)=>{
                                                return <button className="to_complete_response" onClick={()=>{setUserResponse(currentCommonTaskCorrectAnswers[i])}}>Corretas {i+1}</button>
                                            })
                                        }
                                    </div>:null}
                                    </div>
                                    <div id="to_complete">
                                    
                                    {
                                    
                                    (currentCommonTaskCode.split("XXX")[0].length>4 && currentCommonTaskCode.split("XXX")[1].length>4)?

                                    (<><pre>{currentCommonTaskCode.split("XXX")[0]}</pre>
                                    <textarea value={userResponse} onChange={(e)=>{setUserResponse(e.target.value)}}/>
                                    {<pre>{currentCommonTaskCode.split("XXX")[1]}</pre>}
                                    </>):

                                    <textarea value={userResponse} onChange={(e)=>{setUserResponse(e.target.value)}}/>
                                    }
                                    </div>
                                    </>
                                    :null
                                }
                                {
                                    currentCommonTaskText2 ?
                                        (<p dangerouslySetInnerHTML={{ __html: currentCommonTaskText2 }} />) : null
                                }
                                {
                                    currentCommonTaskType=="toCorrect"?
                                    (<div id="to_correct_response">
                                        <div id="to_correct_response_title">
                                        <h2>Código corrijido:</h2>
                                        <button onClick={()=>{
                                        navigator.clipboard.writeText(userResponse)
                                        }}>
                                            <img src={copy_code}/>
                                        </button>
                                        </div>
                                        <textarea type="text" 
                                        onChange={(e)=>{setUserResponse(e.target.value)}}
                                        value={userResponse}
                                        />
                                    </div>):null
                                }
                            </div>

                            {

                                (currentCommonTaskType == "explanation" || currentCommonTaskType == "advertising") ?
                                    (<div className="task_part_bottom">

                                        <button id="report_button_1" onClick={()=>{setReportTaskStatus(true);}}>
                                            <img src={report} />
                                        </button>
                                        <button id="continue_button_1">Continuar</button>
                                    </div>) : (
                                        <div className="task_part_bottom">
                                            <button id="report_button_2" onClick={()=>{setReportTaskStatus(true);}}>
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
                        {
                            reportTaskStatus?
                            <div id="report_task_background" onClick={()=>{setReportTaskStatus(false)}}>
                                <div id="report_task_bar" onClick={(e)=>{e.stopPropagation()}}>
                                    <h1>Reportar lição</h1>
                                     <p>Razão do reporte:</p>
                                     <textarea value={reportTaskReason} onChange={(e)=>{setReportTaskReason(e.target.value)}}/>
                                    <button id="create_task_report" onClick={()=>{reportTask()}}>Reportar</button>
                                    <button id="cancel_task_report" onClick={()=>{
                                        setReportTaskStatus(false)
                                        setReportTaskReason("")
                                    }}>Cancelar</button>
                                </div>
                            </div>:
                            null
                        }
                    </div>
                </div>
            )}
        </div>
    )
}