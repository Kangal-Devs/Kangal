import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import "./group.css"
import member_icon from "../../../assets/specific_page/group/member.png"
export function Group ({itemId,image,name,description,owner,userId,funcAlter}){

    const [ownerImage,setOwnerImage] = useState("")
    const [ownerName,setOwnerName] = useState("")
    const [membersCount,setMembersCount] = useState(0)

    useEffect(()=>{
        if(owner){axios.post("http://localhost:5000/api/get_user",{_id:owner})
        .then((res)=>{
            setOwnerName(res.data.message.name)
             setOwnerImage(res.data.message.image)
        })
        .catch((err)=>{console.log(err)})}
    },[owner])

    useEffect(()=>{
        if(itemId){
            axios.get(`http://localhost:5000/api/get_count_members_group/${itemId}`)
            .then((res)=>{setMembersCount(res.data.message)})
            .catch((err)=>{console.log(err)})
        }
    },[itemId])

    const joinGroup = useCallback(()=>{
        if(userId==owner){
           return funcAlter[0](itemId)
        }

        axios.post("http://localhost:5000/api/get_user_group",{userId,groupId:itemId})
        .then((res)=>{
            return funcAlter[0](itemId)
        })
        .catch((err)=>{
            axios.post(`http://localhost:5000/api/create_fast_user_group/${userId}/${itemId}`)
            .then((res)=>{
                
                localStorage.setItem("currentGroup",JSON.stringify(itemId))
                window.location.reload();
            })
            .catch((err)=>console.log(err))
        })
    },[userId,owner,itemId])

    return(
        <div className="group">
             
        <div className="group_principal">
           <div className="group_principal_left">
                <div className="group_principal_image">
                <img src={`data:image/png;base64,${image}`}/> 
                </div>
                <button onClick={()=>{joinGroup()}}>Entrar</button>
           </div>
           <div className="group_principal_right">
                <p className="group_principal_name">{name}</p>
                <div className="group_principal_owner">
                    <div><img src={`data:image/png;base64,${ownerImage}`}/> </div>
                    <p>{ownerName}</p>
                    </div>
                    <div className="group_principal_members_count">
                   <img src={member_icon}/><p>{membersCount}</p>
                    </div>
                    <p className="group_principal_description">{description.length>80?description.slice(0,80)+"...":description}</p>
           </div>
            
        </div>
        <div className="group_background">
           <img src={`data:image/png;base64,${image}`}/> 
        </div>
        </div>
    )
}