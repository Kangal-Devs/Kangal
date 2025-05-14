import error_image from "../../../assets/all_pages/alert/error.png"
import accept_image from "../../../assets/all_pages/alert/accept.png"
import "./alert.css"

export function Alert({error,message}){
    return(
        <div id="alert">
            <div id="alert_image_part" style={error?{background:"red"}:{background:"#39A0FA"}}>
                {error==true?<img src={error_image}/>:<img src={accept_image}/>}
            </div>
            <p>{message}</p>
        </div>
    )
}