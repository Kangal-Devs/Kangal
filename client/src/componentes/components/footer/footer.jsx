import "./footer.css"
import footerkangal from "../../../assets/all_pages/footer/footerkangal.jpg"
import mail from "../../../assets/all_pages/footer/mail.png"
import instagram from "../../../assets/all_pages/footer/instagram.png"
import {Link} from "react-router-dom"

export function Footer (){
    return(
        <div id="footer" >
            <div id="footer_decoration"></div>
            <img src={footerkangal} id="footer_kangal_image" draggable="false"/>
            <div id="footer_buttons">
                <img src={instagram} id="instagram"/>
                <img src={mail} id="mail"/>
            </div>
            <div id="footer_end">
                <p> Copyright ©2025 <span style={{color:"#1c63ce"}}>KANGAL</span></p>
                <li>
                    <Link to="/support"><ul>Contate-nos</ul></Link>
                    <Link to="/"><ul>Sobre nós</ul></Link>
                    <Link to="/home"><ul>Home</ul></Link>
                </li>
            </div>
        </div>
    )
}