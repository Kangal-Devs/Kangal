import { useEffect,useState } from "react"
import "./user_group_lesson.css"
import axios from "axios"

export function UserGroupLesson({userId,groupLessonId,userGroupLessonId,score,createdAt,funcAlter}){
    const [userImage,setUserImage]= useState()
    const [userName,setUserName]= useState()
    const [userGroupLessonCreatedAt,setUserGroupLessonCreatedAt]= useState()

    useEffect(()=>{
        console.log(score)
    },[])
    useEffect(()=>{
        if(createdAt){
            const data = new Date(createdAt).toLocaleDateString("pt-BR");
            setUserGroupLessonCreatedAt(data)
        }
    },[createdAt])

    useEffect(()=>{
        if(userId){
            axios.post("http://localhost:5000/api/get_user",{_id:userId})
            .then((res)=>{

                setUserName(res.data.message.name)
                setUserImage(res.data.message.image)
            })
            .catch((err)=>{console.log(err)})
        }
    },[userId])
    return(
        <div className="user_group_lesson">
            <div className="user_group_lesson_image">
                <img src={`data:image/png;base64,${userImage}`}/>
            </div>
            <p>{userName}</p>
            <p className="user_group_lesson_date">{userGroupLessonCreatedAt}</p>
            
                
            <p className="user_group_lesson_note">{score?"Nota:"+score:"Sem nota"}</p>
                
     
            
            <button onClick={()=>{
                funcAlter[0](userGroupLessonId)
                funcAlter[1](userId)
                funcAlter[2](userName)
            }}>Ver respostas</button>
        </div>
    )
}