import { useEffect, useState } from "react"
import "./skill.css"
import cssSkill from "../../../assets/specific_page/game/cssSkill.png"
import reactSkill from "../../../assets/specific_page/game/reactSkill.png"
import javascriptSkill from "../../../assets/specific_page/game/javascriptSkill.png"

export function Skill({id,title,subject,funcAlter}){

    const [border,setBorder] = useState()
    const [image,setImage] = useState()
    const [config,setConfig] = useState()


    useEffect(()=>{
        if(subject=="JavaScript"){
            setImage(javascriptSkill)
            setBorder( "2px solid rgba(212, 180, 0, 1)")
            setConfig({padding:"5px 5px 5px 5px",
                        backgroundColor:"rgba(235, 219, 0, 1)"}
            )
        }
        else if(subject=="React"){
            setImage(reactSkill)
            setBorder( "2px solid rgba(0, 145, 212, 1)")
            setConfig({padding:"5px 5px 5px 5px",
                        backgroundColor:"rgba(0, 152, 212, 0.36)"}
            )
        }
        else{
            setImage(cssSkill)
            setBorder( "2px solid rgba(92, 0, 212, 1)")
            setConfig({padding:"5px 5px 5px 5px",
                        backgroundColor:"rgba(92, 0, 212, 0.36)"}
            )
        }
    },[subject])

    return(
        <div className="skill" style={{border:border}} onClick={()=>{funcAlter[0](id)}}>
            <div className="skill_image" style={config}>
                <img src={image} alt=""/>
            </div>
            <p>{title}</p>
        </div>
    )
}