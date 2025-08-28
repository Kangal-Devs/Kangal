import "./documents.css"
import { useState, useEffect, useCallback, use } from "react"
import { useNavigate } from "react-router-dom"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import { NavLeft } from "../../components/nav_left/nav_left.jsx"
import axios from "axios"
import { Upgrade } from "../../components/upgrade/upgrade.jsx"
import { Alert } from "../../components/alert/alert.jsx"
import select_theme from "../../../assets/specific_page/documents/select_theme.png"
import select_topic from "../../../assets/specific_page/documents/select_topic.png"
import { Document } from "../../components/document/document.jsx"
import note3 from "../../../assets/specific_page/documents/note.png"
import collection from "../../../assets/specific_page/documents/collection1.png"
import collection_note from "../../../assets/specific_page/documents/collection_note.png"
export function Documents() {

    const navigate = useNavigate()
    const [createCollectionStatus,setCreateCollectionStatus] = useState()
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userPassword, setUserPassword] = useState()
    const [userXp, setUserXp] = useState()
    const [userAccountType, setUserAccountType] = useState()
    const [userDate, setUserDate] = useState()
    const [userImage, setUserImage] = useState()
    const [userGithub, setUserGithub] = useState()
    const [userGender, setUserGender] = useState()
    const [userId, setUserId] = useState()

    const [currentDocumentTitle, setCurrentDocumentTitle] = useState()
    const [currentDocumentId, setCurrentDocumentId] = useState()
    const [currentDocumentNote, setCurrentDocumentNote] = useState("")
    const [currentDocumentCode1, setCurrentDocumentCode1] = useState("")
    const [currentDocumentCode2, setCurrentDocumentCode2] = useState("")
    const [currentDocumentDescription1, setCurrentDocumentDescription1] = useState()
    const [currentDocumentDescription2, setCurrentDocumentDescription2] = useState()

    const [copyDocumentCode1, setCopyDocumentCode1] = useState()
    const [copyDocumentCode2, setCopyDocumentCode2] = useState()
    const [codeToCopy, setCodeToCopy] = useState()
    const [codeToCopyButton, setCodeToCopyButton] = useState("Copiar código")
    const [documents, setDocuments] = useState()

    const [collectionDescription,setCollectionDescription] = useState("")

    const [currentSubjectId, setCurrentSubjectId] = useState()

    const [connected, setConnected] = useState(false)
    const [tokenError, setTokenError] = useState("")

    const createCollection = useCallback(()=>{
        axios.post("http://localhost:5000/api/create_collection",{
            userId,
            documentId:currentDocumentId,
            message:collectionDescription
        })
        .then((res)=>{
            setCreateCollectionStatus(false)
            setCollectionDescription("")
        })
        .catch((err)=>{console.log(err)})
    },[collectionDescription,userId,currentDocumentId])

    useEffect(() => {
        if (localStorage.getItem("currentSubject")) {

            setCurrentSubjectId(JSON.parse(localStorage.getItem("currentSubject")))
        }
        if (localStorage.getItem("currentDocument")) {
            setCurrentDocumentId(JSON.parse(localStorage.getItem("currentDocument")))
        }

    }, [])

    useEffect(() => {
        if (currentDocumentId) {
            localStorage.setItem("currentDocument", JSON.stringify(currentDocumentId))
            axios.post("http://localhost:5000/api/get_document", { documentId: currentDocumentId })
                .then((res) => {
                    setCurrentDocumentTitle(res.data.message.title)
                    setCurrentDocumentCode2(res.data.message.code2)
                    setCurrentDocumentCode1(res.data.message.code1)
                    setCurrentDocumentDescription1(res.data.message.description1)
                    setCurrentDocumentDescription2(res.data.message.description2)
                    setCurrentDocumentNote(res.data.message.note)
                    setCopyDocumentCode1("Copiar código");
                    setCopyDocumentCode2("Copiar código")
                })
                .catch((err) => { console.log(err) })
        }
    }, [currentDocumentId])
    useEffect(() => {
        if (currentSubjectId) {
            localStorage.setItem("currentSubject", JSON.stringify(currentSubjectId))
            axios.post("http://localhost:5000/api/get_all_documents", { subjectId: currentSubjectId })
                .then((res) => {

                    setDocuments(res.data.message.map((document, i) => {
                        return <Document title={document.title} itemId={document._id} funcAlter={[setCurrentDocumentId]} />
                    }))
                })
                .catch((err) => { console.log(err) })
        }
    }, [currentSubjectId])
    useEffect(() => {
        axios.post("http://localhost:5000/api/authorization", {}, { withCredentials: true })
            .then((res) => {

                setConnected(true)
                setUserName(res.data.message.name)
                setUserXp(res.data.message.xp)
                setUserEmail(res.data.message.email)
                setUserPassword(res.data.message.password)
                setUserAccountType(res.data.message.accountType)
                setUserDate(res.data.message.date)
                // setUserImage(res.data.message.image)
                setUserImage(localStorage.getItem("image"))
                setUserGithub(res.data.message.github)
                setUserGender(res.data.message.gender)
                setUserId(res.data.message._id)
            })
            .catch((err) => {
                console.log(err.response.data);
                setTokenError(err.response.data.message);
                localStorage.clear()
            })
    }, [])

    return (
        <div id="documents">
            {connected == false ? <TokenInvalid token_error={tokenError} /> : (
                <div id="documents_principal">
                    <EnhancedNavTop
                        page="Documentos"
                        home={true}
                        group={false}
                        userName={userName}
                        userImage={userImage}
                        userEmail={userEmail}
                        userPassword={userPassword}
                        userDate={userDate}
                        userAccountType={userAccountType}
                        userGithub={userGithub}
                        userGender={userGender}
                        userId={userId}

                    />

                    <div id="documents_content">
                        <NavLeft

                            requestType="documents"
                            requestLocal="http://localhost:5000/api/get_all_subjects"
                            listTitle="Tema"
                            userId={userId}
                            topButtons={true}
                            updateButton={false}
                            local="documents"
                            code="document"

                            funcAlter={[setCurrentSubjectId, setCurrentDocumentId]}
                        />
                        {!currentSubjectId ?
                            <div id="documents_content_empty">
                                <img src={select_theme} />
                            </div>
                            :
                            <div id="documents_content_principal">
                                {!currentDocumentId ?
                                    <div id="about_document_empty">
                                        <img src={select_topic} />
                                    </div> :
                                    <div id="about_document">
                                        <div id="collection_part">

                                            <button onClick={()=>{setCreateCollectionStatus(true)}}>

                                                <img src={collection} />
                                            </button>
                                        </div>
                                        <h1>{currentDocumentTitle}</h1>
                                        <p>{currentDocumentDescription1}</p>

                                        <p id="about_document_code_title">Código:</p>
                                        <div id="about_document_codes_part">

                                            <div className="about_document_code_part">
                                                <div className="about_document_code_decoration"></div>
                                                <div className="about_document_code_content">
                                                    <div className="about_document_code_principal">
                                                        <pre className="pre">{currentDocumentCode1}</pre>
                                                    </div>
                                                    <div className="about_document_code_blur">
                                                        {
                                                            currentDocumentCode1.split("\n").length > 3 ? <button onClick={() => { setCodeToCopy(currentDocumentCode1) }}>Ver tudo</button> : <button onClick={() => { setCopyDocumentCode1("Código copiado"); navigator.clipboard.writeText(currentDocumentCode1) }}>{copyDocumentCode1}</button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            {currentDocumentCode2 ? (<div className="about_document_code_part">
                                                <div className="about_document_code_decoration"></div>
                                                <div className="about_document_code_content">
                                                    <div className="about_document_code_principal">
                                                        <pre className="pre">{currentDocumentCode2}</pre>
                                                    </div>
                                                    <div className="about_document_code_blur">
                                                        {
                                                            currentDocumentCode2.split("\n").length > 3 ? <button onClick={() => { setCodeToCopy(currentDocumentCode2) }}>Ver tudo</button> : <button onClick={() => { setCopyDocumentCode2("Código copiado"); navigator.clipboard.writeText(currentDocumentCode2) }}>{copyDocumentCode2}</button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>) : null}

                                        </div>
                                        <p id="description2">{currentDocumentDescription2}</p>
                                        {
                                            !(currentDocumentNote == "null") ? (
                                                <div id="note">
                                                    <div id="note_title">
                                                        <img src={note3} />
                                                        <h2>Nota:</h2>
                                                    </div>
                                                    <p>
                                                        {currentDocumentNote}
                                                    </p>
                                                </div>
                                            ) : null
                                        }
                                    </div>}
                                <div id="list_documents">
                                    <div id="list_documents_title"><p> Tópicos:</p></div>
                                    <div id="documents1">
                                        {documents}


                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    {
                        createCollectionStatus ?
                            <div id="create_collection_background" onClick={()=>{setCollectionDescription("");setCreateCollectionStatus(false)}}>
                                <div id="create_collection_bar" onClick={(e)=>{e.stopPropagation()}}>
                                    <h1>Coleção</h1>
                                    <p>Não perda documentos, salve eles.</p>
                                     <div id="create_collection_bar_note">
                                        <img src={collection_note}/>
                                        <p>Encontre os documentos salvos na página home na aba coleções</p>
                                        </div>
                                        <label>Documento: {currentDocumentTitle}</label>
                                        <label>Descrição:</label>
                                        <textarea value={collectionDescription} onChange={(e)=>{setCollectionDescription(e.target.value)}}/>
                                        <div>
                                            <button id="create_collection" onClick={()=>{createCollection()}}>Criar</button>
                                            <button id="cancel_collection" onClick={()=>{setCollectionDescription("");setCreateCollectionStatus(false)}}>Cancelar</button>
                                        </div>
                                        </div>
                            </div> : null
                    }

                    {codeToCopy ?
                        (<div id="code_to_copy_background" onClick={() => { setCodeToCopy(null); setCodeToCopyButton("Copiar código") }}>

                            <div id="code_to_copy_bar" onClick={(e) => { e.stopPropagation() }}>
                                <div id="code_to_copy_title">
                                    <p> Código:</p>
                                    <button onClick={() => { setCodeToCopy(null); setCodeToCopyButton("Copiar código") }}> X</button>
                                </div>
                                <pre>
                                    {codeToCopy}
                                </pre>
                                <button id="code_to_copy_button" onClick={() => { navigator.clipboard.writeText(codeToCopy); setCodeToCopyButton("Código copiado") }}>{codeToCopyButton}</button>
                            </div>
                        </div>)
                        : null}
                </div>


            )
            }
        </div>
    )
}