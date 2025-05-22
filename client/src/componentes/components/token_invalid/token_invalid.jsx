import { useCallback ,useState} from "react"
import "./token_invalid.css"
import paper_error from "../../../assets/all_pages/error/paper_error.png"
import kangal from "../../../assets/all_pages/kangal.png"
import { useNavigate } from "react-router-dom"

export function TokenInvalid({token_error}){
  
    const navigate = useNavigate()

    const toLogin = useCallback(()=>{
        navigate("/login")
    },[])
    return(
    <div id="token_invalid">
            <img src={kangal} id="token_invalid_kangal"/>
            <img src={paper_error} id="token_invalid_paper_error"/>
        <div>

            <p> {token_error == 'jwt must be provided'?"Faça login para conseguir acessar está pagina":"Sua sessão foi expirada, faça login novamente"}</p>
            <button onClick={()=>{toLogin()}}>Login</button>
        
        </div>
    </div>
)
}