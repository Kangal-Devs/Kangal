import "./support.css"
import axios from "axios"
import { BasicNavTop } from "../../components/basic_nav_top/basic_nav_top.jsx"
import {Footer} from "../../components/footer/footer.jsx"
import support_image from "../../../assets/specific_page/support/support.png"
import {complaints} from "./complaints.js"
import { useState,useEffect,useCallback } from "react"
import error from "../../../assets/specific_page/support/error.png"
import accept from "../../../assets/specific_page/support/accept.png"

const errorTypes = {
    "errorType1":"Campo nome possui palavra proibida",
    "errorType2":"Campo nome usuário possui palavra proibida",
    "errorType3":"Email muito grande",
    "errorType4":"Email muito pequeno",
    "errorType5":"Campo email é obrigatório",
    "errorType6":"Email inválido",
    "errorType7":"Campo email possui palavra proibida",
    "errorType8":"Descrição muito grande",
    "errorType9":"Descrição muito pequena",
    "errorType10":"Campo descrição é obrigatório",
    "errorType11":"Campo descrição possui palavra proibida",
    "errorType12":"O email de confirmação é diferente",

}

export function Support(){

    const [complaintsOpt,setComplaintsOpt] = useState()
    
    const [sucessStatus,setSucessStatus] = useState("sucess_inactive")
    const [errorStatus,setErrorStatus] = useState("error_inactive")

    const [errorMessage,setErrorMessage] = useState("")
    const [sucessMessage,setSucessMessage] = useState("")

    const [userName,setUserName] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [confirmationEmail,setConfirmationEmail] = useState("")
    const [category,setCategory] = useState("")
    const [description,setDescription] = useState("")

    const submit = useCallback(()=>{
        if(!(confirmationEmail == email)){
            showError("errorType12")
            console.log("EMAIL: "+email +"\n"+"EMAIL DE CONFIRMAÇÃO: "+confirmationEmail)
        }else{
        axios.post("http://localhost:5000/api/complaints",{userName,name,email,description,category})
        .then((res)=>{
            console.log(category)
            showSucess(res.data.message)
        })
        .catch((err)=>{
            console.log(err)
             showError(err.response.data.message)
        })
    }
    },[userName,name,email,description])

    const showSucess = useCallback((message)=>{
        setSucessMessage(message)
        setSucessStatus("sucess_active")
        setErrorStatus("error_inactive")
        setTimeout(()=>{
            setSucessStatus("sucess_inactive")
            window.location.reload()
        },4000)
    },[])

    const showError = useCallback((message)=>{
       
        Object.keys(errorTypes).forEach((err)=>
            {if(message.includes(err))
                {setErrorMessage(errorTypes[err])}
            
            })

        setErrorStatus("error_active")
        setTimeout(()=>{
            setErrorStatus("error_inactive")
        },4000)
    },[])

    useEffect(()=>{
        setComplaintsOpt(complaints.map((complaint,i)=>{return <option key={i} onClick={()=>{setCategory(complaint)}}>{complaint}</option>}))
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
                    <label htmlFor="input_name1" title="Esse campo é opcional">Nome  <span className="optional">(opcional)</span></label>
                    <input type="text" id="input_name1" className="input_text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </div>

                <div className="inputs_part">
                    <label htmlFor="input_name2" title="Esse campo é opcional">Nome usuário <span className="optional">(opcional)</span></label>
                    <input type="text" id="input_name2" className="input_text" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
                </div>

                <div className="inputs_part">
                    <label htmlFor="input_email1" title="Esse campo é obrigatório">Email <span className="mandatory">*</span></label>
                    <input type="text" id="input_email1" className="input_text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>

                <div className="inputs_part">
                    <label htmlFor="input_email2" title="Esse campo é obrigatório">Confirmar email <span className="mandatory" >*</span></label>
                    <input type="text" id="input_email2" className="input_text" value={confirmationEmail} onClick={(e)=>{console.log(e.target.value)}} onChange={(e)=>{setConfirmationEmail(e.target.value)}}/>
                </div>
                <div className="inputs_part">
                    <label htmlFor="select">Categtorias de Ajuda</label>
                    <select id="select"> 
                        <optgroup label="Categorias de Ajuda" >
                            {complaintsOpt}
                        </optgroup>
                       
                    </select>
                </div>
                <div className="inputs_part">
                <label htmlFor="textarea">Explicação</label>
                <textarea id="textarea" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
             
                </div>
                <button onClick={()=>{submit()}}>Enviar</button>
            </div>
            <div className="support_bar_decorations"></div>
            </div>
            <Footer/>
            <div id={errorStatus} className="response">
            <div id="error_image_div">
                    <img src={error}/>
                </div>
            <p>{errorMessage}</p>
            </div>
            <div id={sucessStatus} className="response">
            <div id="sucess_image_div">
                    <img src={accept}/>
                </div>
                <p>{sucessMessage}</p>
            </div>
        </div>
    )
}