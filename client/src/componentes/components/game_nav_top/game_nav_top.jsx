import { useNavigate } from "react-router-dom"
import "./game_nav_top.css"
import axios from "axios"
export function GameNavTop({gameName}){
    const navigate = useNavigate();
    return(
        <div id="game_nav_top">
            <button onClick={()=>{navigate("/games")}}>Voltar</button>
            <h1>{gameName}</h1>
            <div></div>
        </div>
    )
}