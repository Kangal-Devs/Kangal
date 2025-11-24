import "./user_group_task.css"
import axios from "axios"
import { useEffect,useState } from "react"

export function UserGroupTask({response,userGroupTaskId,groupTaskId,i,funcAlter}){
    return(
       <div className="user_group_task"> 
            <p>{i+1}</p>
            <button onClick={()=>{funcAlter[0](groupTaskId);funcAlter[1](response)}}>Ver exercício</button>
             <p>{response?.length>15?response.slice(0,13)+"...":response}</p>
            {/* {userGroupTaskId} */}
         
       </div>
    )
}