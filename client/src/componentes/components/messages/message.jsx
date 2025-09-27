import { useState } from "react"
import "./message.css"
import more_black from "../../../assets/specific_page/group/3points_black.png"
import more_white from "../../../assets/specific_page/group/3points_white.png"
export function Message({value,status,fontColor,backgroundColor,funcAlter,itemId}){
    const [showMore,setShowMore] = useState()


    return(
        <div className="message" style={{background:backgroundColor}} onMouseEnter={()=>{setShowMore(true)}}
        
        onMouseLeave={()=>{setShowMore(false)}}>
            
            {status=="A"||status=="E"?
            <>
            
            <p style={{color:fontColor}}>{value}
                {status=="E"?
                
                backgroundColor=="#ecececff"?
                <span className="edited_message edited_black">Editado</span>
                :
                 <span className="edited_message edited_white">Editado</span>
                :null}
               
            </p>
             {showMore?
             backgroundColor=="#ecececff"?
                  <div className="show_more" onClick={(e)=>{funcAlter[0](itemId);funcAlter[1]([e.clientX,e.clientY]);funcAlter[2](value)}}><img src={more_black}/></div>
           
             :
               <div className="show_more" onClick={(e)=>{funcAlter[0](itemId);funcAlter[1]([e.clientX,e.clientY]);funcAlter[2](value)}}><img src={more_white}/></div>
             :null}
             </>
             :
             <p style={{color:fontColor}} className="deleted_or_blocked_message">{
                status=="D"?"Mensagem deletada":
                "A mensagem foi deletada por conter conteúdo inadequado."
             }</p>
                }
             
        </div>

    )
}