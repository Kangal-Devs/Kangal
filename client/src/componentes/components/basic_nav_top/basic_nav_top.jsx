import "./basic_nav_top.css"
import kangal_logo from "../../../assets/all_pages/kangal.png"
import {useEffect, useState,useCallback} from "react"
import sign from "../../../assets/all_pages/nav_top_icons/sign.png"
import {useNavigate} from "react-router-dom"
export function BasicNavTop({title,contact,login}){

   const navigate = useNavigate()

    const goToAboutUs = useCallback(()=>{
        navigate("/")
    },[])

    const goToSupport = useCallback(()=>{
        navigate("/support")
    },[])

    const goToLogin = useCallback(()=>{
        navigate("/login")
    },[])

    return(
        <div id="basic_nav_top">
            <div id="basic_nav_top_left">
            <div id="kangal_div" onClick={()=>{goToAboutUs()}}>
                <img src={kangal_logo} id="kangal_logo" draggable="false"/>
                <h2 id="kangal_name" draggable="false"> KANGAL</h2>
                
                </div>
                    {title!=null?
                <div id="name_page_div">
                        <img id="name_page_sign" src={sign}/>
                        <h4 id="name_page_text">{title}</h4>
                </div>:""}
            </div>

          
        
            <div id="basic_nav_top_buttons">
                { contact==true?
            
                    <button onClick={()=>{goToSupport()}} id="basic_nav_top_button_support" className="basic_nav_top_button">Contante-nos</button>
            
                :""}

                {login==true?
                
               
               <button onClick={()=>{goToLogin()}}id="basic_nav_top_button_login" className="basic_nav_top_button">Entrar</button>
        
:""}
                </div>
        </div>
    )
}