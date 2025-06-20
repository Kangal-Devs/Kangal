import { useEffect, useState } from "react"
import "./member.css"
import { generateLevelTable } from "../../../levelGenerator.js"
export function Member({image,name,gender,xp,isOwner,funcAlter}){

    const [level,setLevel] = useState(0)
    const [levelWidth,setLevelWidth] = useState(0)
useEffect(()=>{
    generateLevelTable().forEach((item) => {
       if (xp >= item.xpMin && xp <= item.xpMax) {
                setLevel(item.level)
                setLevelWidth(xp/item.xpMax*100)
       }
    })


},[level])


    return(
        <div className="member" onClick={()=>{
            funcAlter[5](false)
            funcAlter[6](name)
            funcAlter[7](image)
            funcAlter[8](level)
            funcAlter[9](levelWidth)
            
        }}>
            <div className="member_img_part">
            <div className="member_img">
                <img src={`data:image/png;base64,${image}`} draggable={false}/>
            </div>
            </div>
            <div className="member_name_part">
            {isOwner?<p className="ownerName">{name}</p>:<p>{name}</p>}
            <p>{level}</p>
            </div>
        </div>
    )
}