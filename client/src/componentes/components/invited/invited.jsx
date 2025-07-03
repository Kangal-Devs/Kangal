import axios from "axios"
import { useCallback } from "react"
import "./invited.css"
export function Invited({id,image,name,toInvite,currentGroupId,get_solicitations,setUsersSearched}){

    const createSolicitation = useCallback(()=>{
        console.log(currentGroupId)
        axios.post(`http://localhost:5000/api/create_solicitation`,{userId:id,groupId:currentGroupId})
        .then((res)=>{ 
            get_solicitations(true)})
            setUsersSearched("")
        .catch((err)=>{console.log(err)})
    },[id,currentGroupId])

    const removeSolicitation = useCallback(()=>{
        axios.delete(`http://localhost:5000/api/delete_solicitation/${id}/${currentGroupId}`)
        .then((res)=>{
            get_solicitations()
        })
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
            toInvite?<button className="button_to_invite" onClick={()=>{createSolicitation()}}>Convidar</button>:<button className="button_invited" onClick={()=>{removeSolicitation()}}>Cancelar Solic.</button>
        }
        
        </div>
        <div className="invited_decoration"></div>
    </div>)
}