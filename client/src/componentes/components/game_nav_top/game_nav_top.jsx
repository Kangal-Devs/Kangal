import "./game_nav_top.css"
import axios from "axios"
export function GameNavTop(){
    return(
        <div id="game_nav_top">
            <button onClick={()=>{
                axios.post("http://localhost:5000/api/create_game")
                .then((res)=>{console.log(res)})
                .catch((err)=>{console.log(err)})
            }}>mandar</button>
        </div>
    )
}