import "./incomplete_group_task.css"

import delete_group_task from "../../../assets/specific_page/group/delete.png"
export function IncompleteGroupTask({title,itemId,type,index,funcAlter}){
    return(
        <div className="incomplete_group_task">
            <p>{title}</p>
            <p>{type=="free"?"Código":type=="select"?"Seleção":"Explicação"}</p>
            <button onClick={()=>{funcAlter[0](true);funcAlter[1](itemId);funcAlter[2](title)}}>
                <img src={delete_group_task}/>
            </button>
            <p>{index}</p>
        </div>
    )
} 