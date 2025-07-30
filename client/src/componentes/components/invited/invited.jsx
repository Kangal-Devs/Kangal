import axios from "axios"
import { useCallback } from "react"
import "./invited.css"
export function Invited({id,image,name,toInvite,currentGroupId,userId,loadUsersInvite}){

    //o userId é do usuario que o dono enquando o id é da pessoa que esta sendo procurada

    const createSolicitation = useCallback(()=>{
        axios.post("http://localhost:5000/api/create_solicitation",{groupId:currentGroupId,userId:id})
        .then((res)=>{loadUsersInvite()})
        .catch((err)=>{console.log(err)})
    },[id,currentGroupId])

    const removeSolicitation = useCallback(()=>{
        axios.delete(`http://localhost:5000/api/delete_solicitation/${id}/${currentGroupId}`)
        .then((res)=>{loadUsersInvite()})
        .catch((err)=>{console.log(err)})
    },[id,currentGroupId])

    return (
    <div className="invited">
       <div className="invited_principal">
        <div>
            <img src={`data:image/png;base64,${image}`}/>
        </div>
        <label>
            {name.length <= 10?name:name.slice(0,9)+"..."}
        </label>
        
         {  
         userId!=id?
            toInvite?<button className="button_to_invite" onClick={()=>{createSolicitation()}}>Convidar</button>:<button className="button_invited" onClick={()=>{removeSolicitation()}}>Cancelar Solic.</button>:<label></label>
        }
   
    
        </div>
        <div className="invited_decoration"></div>
    </div>)
}