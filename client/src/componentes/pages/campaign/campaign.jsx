import "./campaign.css"
import { useState, useEffect, useCallback, use } from "react"
import { useNavigate } from "react-router-dom"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import { NavLeft } from "../../components/nav_left/nav_left.jsx"
import axios from "axios"
import select_module from "../../../assets/specific_page/campaign/select_module.png"
import ad1 from "../../../assets/specific_page/campaign/ad1.jpg"
import ad2 from "../../../assets/specific_page/campaign/ad2.jpg"
import {CommonLesson} from "../../components/common_lesson/common_lesson.jsx"
export function Campaign(){

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


    const [currentCommonLessonPoints,setCurrentCommonLessonPoints] = useState()
    const [currentCommonLessonId,setCurrentCommonLessonId] = useState()
    const [currentCommonLessonIntroduction,setCurrentCommonLessonIntroduction] = useState()

    const startingLesson = useCallback(()=>{
        localStorage.setItem("currentCommonLesson",JSON.stringify(currentCommonLessonId))
        navigate("/task")
    },[currentCommonLessonId])

    useEffect(()=>{
        if(localStorage.getItem("currentModule")){
            setCurrentModuleId(JSON.parse(localStorage.getItem("currentModule")))
        }
    },[])

    const [ad,setAd] = useState()

    useEffect(()=>{
        if(currentModuleId){

        setCurrentCommonLessonId(null)
        if((Math.random()*10) >5){
            setAd(ad1)
        }
        else{
            setAd(ad2)
        }

        if(currentModuleId){
        localStorage.setItem("currentModule",JSON.stringify(currentModuleId))
        axios.post("http://localhost:5000/api/get_all_common_lessons",{moduleId:currentModuleId})
        .then((res)=>{
      
            setLessons(res.data.message.map((common_lesson,i)=>{
                if(i<30){
                return <CommonLesson 
                funcAlter={[setCurrentCommonLessonId]}
                itemId={common_lesson._id}
                name={common_lesson.name} 
                introduction={common_lesson.introduction} 
                image={common_lesson.image} 
                color={common_lesson.color}
                blocked={false}/>
                }
                else{
                return <CommonLesson 
                funcAlter={[setCurrentCommonLessonId]}
                itemId={common_lesson._id}
                name={common_lesson.name} 
                introduction={common_lesson.introduction} 
                image={common_lesson.image} 
                color={common_lesson.color}
                blocked={true}/>
                }
              
            }))
        })
        .catch((err)=>{console.log(err)})
        }
    }
    },[currentModuleId])

    useEffect(()=>{
        if(currentModuleId){
            axios.get(`http://localhost:5000/api/get_module/${currentModuleId}`)
            .then((res)=>{
                console.log(res)
                setCurrentModuleName(res.data.message.name)
            })
            .catch((err)=>{console.log(err)})
        }
    },[currentModuleId ])

    useEffect(()=>{
        if(currentModuleName){
            console.log(currentModuleName)
        }
    },[currentModuleName])
    useEffect(() => {
        localStorage.removeItem("currentCommonLesson")
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

    useEffect(()=>{
        if(currentCommonLessonId){
            axios.post("http://localhost:5000/api/get_common_lesson",{commonLesson:currentCommonLessonId})
            .then((res)=>{
                setCurrentCommonLessonIntroduction(res.data.message.introduction)
                setCurrentCommonLessonPoints(res.data.message.points)
            })
            .catch((err)=>{console.log(err)})
        }
},[currentCommonLessonId])

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
                            listTitle="Módulo"
                            userId={userId}
                            topButtons={true}
                            updateButton={false}
                            local="campaign"
                            code="campaign"
                            funcAlter={[setCurrentModuleId]}
                        />
                        {
                            !currentModuleId?
                            (<div id="campaign_content_empty">
                                <img src={select_module}/>
                            </div>)
                            :
                            (<div id="campaign_content_principal">
                                
                                    
                                    <div id="introduction_part">
                                        <h1>{currentModuleName}</h1>
                                        {currentCommonLessonId?<div>
                                        <div>
                                            <h2>Introdução</h2>
                                            <p>{currentCommonLessonIntroduction}</p>
                                        </div>
                                        <button onClick={()=>{startingLesson()}}>Começar <span>+{currentCommonLessonPoints}XP</span></button>
                                       
                                            </div>:<div></div>}
                                            <div></div>
                                    </div>
                                
                                <div id="lessons_part" onClick={()=>{
                                    setCurrentCommonLessonId(null)
                                }}>
                                    {lessons}
                                </div>
                                <div id="ad_part" onClick={()=>{
                                    setCurrentCommonLessonId(null)
                                }}>
                                    <img src={ad}/>
                                </div>
                            </div>)
                        }
                    



                    </div>
                    </div>
                )}
        </div>
    )
}