import { useEffect, useState } from "react"
import "./group_task_button.css"

export function GroupTaskButton({funcAlter,value,possibleAnswers,userResponse,i}){

    const [active,setActive] = useState()

    useEffect(()=>{
        if(userResponse==possibleAnswers[i]){
            setActive(true)
        }
        else{
            setActive(false)
        }
    },[userResponse])
 return(
    <button className={active?"group_task_button_selected":"group_task_button_unselected"} onClick={()=>{
        funcAlter[0](value)
    }}>
    {value}
    </button>
 )   
}