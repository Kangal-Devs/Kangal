import "./game_nav_top.css"
import axios from "axios"
export function GameNavTop({gameName}){
    return(
        <div id="game_nav_top">
            <button onClick={()=>{
            
            }}>Voltar</button>
            <h1>{gameName}</h1>
            <div></div>
        </div>
    )
}