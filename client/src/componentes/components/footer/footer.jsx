import "./footer.css"
import footerkangal from "../../../assets/all_pages/footer/footerkangal.jpg"
import mail from "../../../assets/all_pages/footer/mail.png"
import instagram from "../../../assets/all_pages/footer/instagram.png"

export function Footer (){
    return(
        <div id="footer" >
            <div id="footer_decoration"></div>
            <img src={footerkangal} id="footer_kangal_image" draggable="false"/>
            <div id="footer_buttons">
                <img src={instagram}/>
                <img src={mail}/>
            </div>
            <div id="footer_end">

            </div>
        </div>
    )
}