import { useState, useEffect, useCallback, use } from "react"
import "./game.css"
import {useNavigate} from "react-router-dom"

export function Game({name,subjects,description,thumbnail,icon,link}){
    const navigate = useNavigate()
    return(
    <div className="game">
       <div className="thumbnail_part">
            <div className="thumbnail_part_img">
                <img src={thumbnail}/>
            </div>
             <div className="thumbnail_part_footer">
                <img src={icon} onClick={()=>{navigate(link)}}/>
            </div>
        </div> 
         <div className="about_part">
            <h2>{name}</h2>
            <h3>{subjects}</h3>
            <p>{description}</p>
        </div>
    </div>)
}