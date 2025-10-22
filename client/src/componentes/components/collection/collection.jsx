import { useCallback, useEffect, useState } from "react"
import "./collection.css"
import {useNavigate} from "react-router-dom"
import collection_java from "../../../assets/specific_page/home/collection_java.png"
import collection_html from "../../../assets/specific_page/home/collection_html.png"
import collection_js from "../../../assets/specific_page/home/collection_js.png"
import axios from "axios"
import delete_collection from "../../../assets/specific_page/home/delete_collection.png"
export function Collection({documentId,date,itemId,message,funcAlter}){
    const navigate = useNavigate()
    const [chosen,setChosen] = useState(true)
    const [documentImage,setDocumentImage] = useState()
    const [documentTitle,setDocumentTitle] = useState()
   
    const [subjectId,setSubjectId] = useState()
    const seeDocument = useCallback(()=>{
        localStorage.setItem("currentSubject",JSON.stringify(subjectId))
        localStorage.setItem("currentDocument",JSON.stringify(documentId))
        navigate("/documents")
    },[subjectId,documentId])

    useEffect(()=>{
        axios.post("http://localhost:5000/api/get_document",{documentId})
        .then((res)=>{
            setDocumentTitle(res.data.message.title)
            setSubjectId(res.data.message.subject)
            axios.post("http://localhost:5000/api/get_subject",{subjectId:res.data.message.subject})
            .then((res2)=>{
                if(res2.data.message.name == "HTML"){setDocumentImage(collection_html)}
                else if(res2.data.message.name == "JavaScript"){setDocumentImage(collection_js)}
                 else if(res2.data.message.name == "Java"){setDocumentImage(collection_java)}
            })
            .catch((err)=>{console.log(err)})
        })
        .catch((err)=>{console.log(err)})
    },[documentId])

    return(
        <>
        {chosen?<div className="collection_chosen">
            <img src={documentImage} className="document_image" onClick={()=>{
                navigate("/documents")
                localStorage.setItem("currentSubject",JSON.stringify(subjectId))
                localStorage.setItem("currentDocument",null)
            }}/>
            {/* <button onClick={()=>{setChosen(false)}}>APERTE</button> */}
            <p>título:{documentTitle}</p>
            <button onClick={()=>{seeDocument()}} className="see_document"> Ver documento</button>
            <button className="my_collection_description" onClick={()=>{setChosen(false)}}>Ver minha descrição</button>
             <button className="delete_collection" onClick={()=>{funcAlter[0](itemId)}}>
                <img src={delete_collection}/>
             </button>
        </div>:

        <div className="collection_increased">
            <div className="collection_chosen">
            <img src={documentImage} className="document_image" onClick={()=>{
                navigate("/documents")
                localStorage.setItem("currentSubject",JSON.stringify(subjectId))
                localStorage.setItem("currentDocument",null)
            }}/>
            {/* <button onClick={()=>{setChosen(false)}}>APERTE</button> */}
            <p>título:{documentTitle}</p>
            <button onClick={()=>{seeDocument()}} className="see_document"> Ver documento</button>
            <button className="my_collection_description" onClick={()=>{setChosen(true)}}>Esconder minha descrição</button>
             <button className="delete_collection" onClick={()=>{funcAlter[0](itemId)}}>
                <img src={delete_collection}/>
             </button>
            
        </div>
        <p className="collection_description_title">Descrição:</p>
        <p className="collection_description">{message}</p>
        </div>}
        </>
    )
}