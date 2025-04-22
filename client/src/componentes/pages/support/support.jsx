import "./support.css"
import { BasicNavTop } from "../../components/basic_nav_top/basic_nav_top.jsx"
import {Footer} from "../../components/footer/footer.jsx"
import support_image from "../../../assets/specific_page/support/support.png"
import {complaints} from "./complaints.js"
import { useState,useEffect,useCallback } from "react"
export function Support(){

    const [complaintsOpt,setComplaintsOpt] = useState()

    

    useEffect(()=>{
        setComplaintsOpt(complaints.map((complaint)=>{return <option> {complaint}</option>}))
    },[])

   
    return(
        <div id="support">
            <BasicNavTop title="Contate-nos"contact={false} login={true}/>
            <div id="support_bar">
            <div className="support_bar_decorations"></div>
            <div id="support_bar_principal">
                <div id="support_title_part">
                    <img src={support_image}/>
                    <h1> Contate-nos</h1>
                </div>

                <div className="inputs_part" >
                    <label for="input_name1" title="Esse campo é opcional">Nome  <span className="optional">(opcional)</span></label>
                    <input type="text" id="input_name1" className="input_text"/>
                </div>

                <div className="inputs_part">
                    <label for="input_name2" title="Esse campo é opcional">Nome usuário <span className="optional">(opcional)</span></label>
                    <input type="text" id="input_name2" className="input_text"/>
                </div>

                <div className="inputs_part">
                    <label  for="input_email1" title="Esse campo é obrigatório">Email <span className="mandatory">*</span></label>
                    <input type="text" id="input_email1" className="input_text"/>
                </div>

                <div className="inputs_part">
                    <label for="input_email2" title="Esse campo é obrigatório">Confirmar email <span className="mandatory" >*</span></label>
                    <input type="text" id="input_email2" className="input_text"/>
                </div>
                <div className="inputs_part">
                    <label>Categtorias de Ajuda</label>
                    <select> 
                        <optgroup label="Categorias de Ajuda" >
                            {complaintsOpt}
                        </optgroup>
                       
                    </select>
                </div>
                <div className="inputs_part">
                <label>Explicação</label>
                <textarea></textarea>
             
                </div>
                <button>Enviar</button>
            </div>
            <div className="support_bar_decorations"></div>
            </div>
            <Footer/>
        </div>
    )
}