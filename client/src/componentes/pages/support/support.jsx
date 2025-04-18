import { BasicNavTop } from "../../components/basic_nav_top/basic_nav_top"
import "./support.css"
import background2 from "../../../assets/all_pages/background2.jpg"
export function Support(){
    return(
        <div id="support">
            
            <img id="background" src={background2}/>
            <div id="support_principal_div">
            <BasicNavTop title="Contante-nos" login={true}/>

            <div id="support_principal_bar">
                
            </div>

            </div>
        </div>
    )
}