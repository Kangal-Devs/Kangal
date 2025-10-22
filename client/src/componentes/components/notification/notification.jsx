import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import "./notification.css"
import axios from "axios"
export function Notification({isRead,notificationId,page}){

    const [notificationGroupImage,setNotificationGroupImage] = useState()
    const [notificationGroupName,setNotificationGroupName] = useState()
    const [notificationGroupId,setNotificationGroupId] = useState()
    const [notificationDate,setNotificationDate] = useState("")
    const [notificationText,setNotificationText] = useState("")
    const navigate = useNavigate()
    const [currentNotificationClass,setCurrentNotificationClass] = useState("")
  
    useEffect(()=>{
        if(notificationId){
        axios.get(`http://localhost:5000/api/get_notification/${notificationId}`)
        .then((res)=>{
            setNotificationText(res.data.message.text)
            axios.post('http://localhost:5000/api/get_group',{_id:res.data.message.group})
            .then((res)=>{
                setNotificationGroupImage(res.data.message.image)
                setNotificationGroupName(res.data.message.name)
                setNotificationGroupId(res.data.message._id)
            })
        })
        .catch((err)=>{console.log(err)})
        }
    },[])

    useEffect(()=>{
        isRead?
        setCurrentNotificationClass("notification_read")
        :
        setCurrentNotificationClass("notification_not_read")
    },[])

    return(
     <div className={currentNotificationClass}>
        <div className="notification_image_part">
            <div>
                <img src={`data:image/png;base64,${notificationGroupImage}`}/>
            </div>
        </div>
        <div className="notification_text_part">
            <p>{notificationGroupName}</p>
            <p>{notificationText.length>15?notificationText.slice(0,15)+"...":notificationText}</p>
        </div>
        
        <div className="notification_button_part">
            <button onClick={()=>{
                localStorage.setItem("currentGroup",JSON.stringify(notificationGroupId))
                if(page!="Grupos"){navigate("/groups")}else{window.location.reload()}
            }}>Ver grupo</button>
        </div>
     </div>   
    )
}