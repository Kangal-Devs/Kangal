import { useState, useEffect, useCallback, use } from "react"
import "./game.css"
import {useNavigate} from "react-router-dom"

export function Game({id,name,subject,description,thumbnail,icon,link,funcAlter}){
    const navigate = useNavigate()
    return(
    <div className="game">
       <div className="thumbnail_part">
            <div className="thumbnail_part_img">
                <img src={`data:image/png;base64,${thumbnail}`} alt="" onClick={()=>{funcAlter[3](id)}}/>
            </div>
             <div className="thumbnail_part_footer">
                <img src={`data:image/png;base64,${icon}`} alt="" onClick={(e)=>{
                e.stopPropagation()
                funcAlter[0](true);
                funcAlter[1](name)
                funcAlter[2](link)
                }}/>
            </div>
        </div> 
         <div className="about_part" onClick={()=>{funcAlter[3](id)}}>   
            <h2>{name}</h2>
            <h3>{subject}</h3>
            <p>{description}</p>
            <button onClick={(e)=>{
                e.stopPropagation()
                funcAlter[0](true);
                funcAlter[1](name)
                funcAlter[2](link)
                }}>JOGAR</button>
        </div>
    </div>)
}