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
import ad from "../../../assets/specific_page/task/ad.jpg"
import confetti from "../../../assets/specific_page/task/confetti.gif"
import return_img from "../../../assets/specific_page/task/return.png"
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

    const [isCorrect,setIsCorrect] = useState()

    const [time,setTime] = useState(0)

    

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

    const [pageName,setPageName] = useState("")

    useEffect(()=>{
        if(localStorage.getItem("currentCommonLesson")){
            
    
        axios.post("http://localhost:5000/api/get_common_lesson",{commonLesson:JSON.parse(localStorage.getItem("currentCommonLesson"))})
    .then((res)=>{
        setCurrentCommonLessonPoints(res.data.message.points)
        setPageName(`Campanha/${res.data.message.name}`)
    })
    .catch((err)=>{console.log(err)})
        }
    },[])
    
    const [connected, setConnected] = useState(false)
    const [tokenError, setTokenError] = useState("")

    const [currentModuleId, setCurrentModuleId] = useState()
    const [currentModuleName, setCurrentModuleName] = useState()

    const [currentCommonTaskId, setCurrentCommonTaskId] = useState()
    const [currentCommonLessonId, setCurrentCommonLessonId] = useState()
    const [currentCommonLessonPoints, setCurrentCommonLessonPoints] = useState()

    useEffect(()=>{
        setCurrentCommonLessonId(JSON.parse(localStorage.getItem("currentCommonLesson")))
    },[])

    const [userResponse, setUserResponse] = useState()
    const [saveUserResponse, setSaveUserResponse] = useState()
    // commonTaskTypes : select,toComplete,explanation,toCorrect,advertising

    const [reportTaskStatus,setReportTaskStatus] = useState(false)
    const [reportTaskReason,setReportTaskReason] = useState("")

    const [currentCommonTaskText1, setCurrentCommonTaskText1] = useState(
        ""

    )//Mas o que isso significa na prática?
    const [currentCommonTaskText2, setCurrentCommonTaskText2] = useState(
        ""
        )
    const [currentCommonTaskType, setCurrentCommonTaskType] = useState("")
    const [currentCommonTaskCode, setCurrentCommonTaskCode] = useState(
        ``
    )
    const [currentCommonTaskImage, setCurrentCommonTaskImage] = useState()
    const [currentCommonTaskLink, setCurrentCommonTaskLink] = useState()
    const [currentCommonTaskCorrectAnswers, setCurrentCommonTaskCorrectAnswers] = useState([])
    const [currentCommonTaskPossibleAnswers, setCurrentCommonTaskPossibleAnswers] = useState([])

    const [countCorrectUserAnswer,setCountCorrectUserAnswer] = useState(0)

    const [isFinished,setIsFinished] = useState(false)

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(!isFinished){
                
            setTime(time=>time+100);
            }
        },100)
        return ()=> clearInterval(interval)
    },[isFinished])

    const [allCommonTask,setAllCommonTask] = useState([])
    const [countAllCommonTask,setCountAllCommonTask] = useState("")
    const [currentCountCommonTask,setCurrentCountCommonTask] = useState(0)
    

    const [isCommonLessonAlreadyDid,setIsCommonLessonAlreadyDid] = useState()

    useEffect(()=>{
        if(currentCommonLessonId){
        axios.get(`http://localhost:5000/api/get_user_common_lesson/${currentCommonLessonId}/${userId}`)
        .then((res)=>{
            console.log(res.data.message.status)
            if(res.data.message.status == "did"){
                setIsCommonLessonAlreadyDid(true)
            }
            else{
                setIsCommonLessonAlreadyDid(false)
            }
        })
        .catch((err)=>{console.log(err)})
        }
    },[currentCommonLessonId,userId])

    const finishLesson = useCallback(()=>{

        if(isCommonLessonAlreadyDid){
            return navigate("/campaign")
        }

        const newUserXp = Number(userXp)+Number((countCorrectUserAnswer/countAllCommonTask * currentCommonLessonPoints).toFixed(0))
        console.log(newUserXp)
        axios.put(`http://localhost:5000/api/user_update/${userId}`,{xp:newUserXp},{ withCredentials: true })
        .then((res)=>{
            axios.post("http://localhost:5000/api/create_user_common_lesson",{userId,commonLessonId:currentCommonLessonId})
            .then((res)=>{
                navigate("/campaign")
            })
            .catch((err)=>{console.log(err)})
        })
        .catch((err)=>{console.log(err)})
    },[userXp,countCorrectUserAnswer,countAllCommonTask,currentCommonLessonPoints,userId,currentCommonLessonId])

    useEffect(()=>{
        if(localStorage.getItem("currentCommonLesson")){
            console.log(localStorage.getItem("currentCommonLesson"))
        axios.get(`http://localhost:5000/api/get_all_common_task/${JSON.parse(localStorage.getItem("currentCommonLesson"))}`)
        .then((res)=>{
            if(res.data.message.length){
           
            setAllCommonTask(res.data.message)
            setCountAllCommonTask(res.data.message.length)
            }
        })
        .catch((err)=>{console.log(err)})
        }
    },[])

    useEffect(()=>{
        if(allCommonTask.length){
       
            setCurrentCommonTaskCode(allCommonTask[0]?.code)
            setCurrentCommonTaskText1(allCommonTask[0]?.text1)
            setCurrentCommonTaskText2(allCommonTask[0]?.text2)
            setCurrentCommonTaskType(allCommonTask[0]?.type)
            setCurrentCommonTaskLink(allCommonTask[0]?.link)
            setCurrentCommonTaskImage(allCommonTask[0]?.image)
            setCurrentCommonTaskPossibleAnswers(allCommonTask[0]?.possibleAnswer)
            setCurrentCommonTaskCorrectAnswers(allCommonTask[0]?.correctAnswers)
        }
    },[allCommonTask])


    const nextTask = useCallback((isCorrect1)=>{
        if(isCorrect1){
            console.log("acertei")
            setCountCorrectUserAnswer(count=> count+1 )
            setCurrentCountCommonTask(count => count+1)
        }else{
            console.log("perdi")
            setCurrentCountCommonTask(count => count+1)
        }
    },[countCorrectUserAnswer,currentCountCommonTask])

    useEffect(()=>{
        
        if(currentCountCommonTask){
            console.log(currentCountCommonTask)
            if(allCommonTask[currentCountCommonTask]){
                setSaveUserResponse()
                setVerified(false)
                setUserResponse()
                setTaskResponseMessage("")
                setButtonActive([])

                console.log(allCommonTask[currentCountCommonTask])
                setCurrentCommonTaskCode(allCommonTask[currentCountCommonTask]?.code)
            setCurrentCommonTaskText1(allCommonTask[currentCountCommonTask]?.text1)
            setCurrentCommonTaskText2(allCommonTask[currentCountCommonTask]?.text2)
            setCurrentCommonTaskType(allCommonTask[currentCountCommonTask]?.type)
            setCurrentCommonTaskLink(allCommonTask[currentCountCommonTask]?.link)
            setCurrentCommonTaskImage(allCommonTask[currentCountCommonTask]?.image)
                 setCurrentCommonTaskPossibleAnswers(allCommonTask[currentCountCommonTask]?.possibleAnswer)
            setCurrentCommonTaskCorrectAnswers(allCommonTask[currentCountCommonTask]?.correctAnswer)
            }
            else{
                console.log("Quantidade de exercícios:"+countAllCommonTask)
                console.log("Quantidade de exercícios corretos:"+countCorrectUserAnswer)
                setIsFinished(true)
            }
        }
    },[currentCountCommonTask])

    // useEffect(() => {
    //     console.log(userResponse)


    // }, [userResponse])

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
            console.log(""+saveUserResponse)
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
                // console.log(rightAnswerMessage[randomNumber])
                setIsCorrect(true)
            }
            else {
                const randomNumber = Math.floor(Math.random() * wrongAnswerMessage.length);
                setTaskResponseMessage(wrongAnswerMessage[randomNumber])
                
                // console.log(wrongAnswerMessage[randomNumber])
                setIsCorrect(false)
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
                    setIsCorrect(true)
                    return;
                }
            }
             const randomNumber = Math.floor(Math.random() * wrongAnswerMessage.length);
            setTaskResponseMessage(wrongAnswerMessage[randomNumber])
            setIsCorrect(false)
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
                        page={pageName}
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


                        {!isFinished?
                        (
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
                                        (<p className="text2"dangerouslySetInnerHTML={{ __html: currentCommonTaskText2 }} />) : null
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
                                {
                                    currentCommonTaskLink?
                                    (<a className="link_context" href={currentCommonTaskLink} target="_blank">
                                        {currentCommonTaskLink}
                                    </a>):null
                                }
                            </div>

                            {

                                (currentCommonTaskType == "explanation" || currentCommonTaskType == "advertising") ?
                                    (<div className="task_part_bottom">

                                        <button id="report_button_1" onClick={()=>{setReportTaskStatus(true);}}>
                                            <img src={report} />
                                        </button>
                                        <button id="continue_button_1" onClick={()=>{nextTask(true)}}>Continuar</button>
                                    </div>) 
                                    :
                                     (
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
                                                        nextTask(isCorrect)
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
                        )
                        :
                        (
                            <>
                            <img id="confetti" src={confetti}/>  
                            <h1 id="finished_lesson_message">Lição terminada</h1>
                                <div id="task_content_finished">
                                <img src={ad}/>
                                <div id="task_finished_buttons">
                                    <button onClick={()=>{window.location.reload()}}> <img src={return_img}/></button>
                                    <button id="finish_lesson" onClick={()=>{
                                        finishLesson()
                                    }}>
                                        Terminar 
                                        {isCommonLessonAlreadyDid?
                                        null
                                        :
                                        " +"+
                                        (countCorrectUserAnswer/countAllCommonTask * currentCommonLessonPoints).toFixed(0)
                                        +
                                        " XP"}
                                        
                                        
                                        
                                        </button>
                                </div>
                                
                                   {/* {time} {countCorrectUserAnswer}{countAllCommonTask}{countCorrectUserAnswer/countAllCommonTask*100} */}
                                   <div id="task_statistic">
                                    <div>
                                        <h2>Tempo</h2>
                                        {time/1000}s
                                    </div>
                                    <div>
                                        <h2>Total</h2>
                                        {countAllCommonTask}
                                    </div>
                                    <div>
                                        <h2>Acertos</h2>
                                        {countCorrectUserAnswer}
                                    </div>
                                    <div>
                                        <h2>Porcentagem de acertos</h2>
                                        {(countCorrectUserAnswer/countAllCommonTask*100).toFixed(0)}%
                                    </div>
                                    </div>
                            </div>
                            </>
                            
                        )}
                        
                        {
                            reportTaskStatus?
                            <div id="report_task_background" onClick={()=>{setReportTaskStatus(false)}}>
                                <div id="report_task_bar" onClick={(e)=>{e.stopPropagation()}}>
                                    <h1>Reportar lição</h1>
                                     <p>Razão do reporte:</p>
                                     <textarea value={reportTaskReason} placeholder="O problema é..."onChange={(e)=>{setReportTaskReason(e.target.value)}}/>
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