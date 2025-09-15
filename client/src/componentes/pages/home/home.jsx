import axios from "axios"
import "./home.css"
import { useState, useEffect, useCallback } from "react"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import { Footer } from "../../components/footer/footer.jsx"
import { NavLeft } from "../../components/nav_left/nav_left.jsx"
import "./home.css"
import { Collection } from "../../components/collection/collection.jsx"
import add from "../../../assets/specific_page/home/add.jpg"
import { generateLevelTable } from "../../../levelGenerator.js"

import statistic_icon from "../../../assets/specific_page/home/statistic_icon.png"
import collection from "../../../assets/specific_page/home/collection.png"
import { useNavigate } from "react-router-dom"

import games_icon from "../../../assets/specific_page/home/games_icon.png"
import campaign_icon from "../../../assets/specific_page/home/campaign_icon.png"
import documents_icon from "../../../assets/specific_page/home/documents_icon.png"
import groups_icon from "../../../assets/specific_page/home/groups_icon.png"

import { Upgrade } from "../../components/upgrade/upgrade.jsx"
import { Alert } from "../../components/alert/alert.jsx"
import empty_collections from "../../../assets/specific_page/home/empty_collections1.png"
export function Home() {

    // const resetar = useCallback(()=>{
    //     axios.post("http://localhost:5000/api/clear_cookie",{},{withCredentials:true})
    //     .then((res)=>{console.log(res.data)})
    //     .catch((err)=>{console.log(err.response.data)})
    // },[])

    //Estatísticas para mostrar ao usuário:
    const [joinedGroups,setJoinedGroups] = useState(0)
    const [createdGroups,setCreatedGroups] = useState(0)
     const [userCreated, setUserCreated] = useState(0)
     const [countCollection,setCountCollection] = useState(0)
    const [countOwner,setCountOwner] = useState(0)

    const navigate = useNavigate()
    const [levelWidth, setLevelWidth] = useState()
    const [acceptSolicitationStatus, setAcceptSolicitationStatus] = useState("accept_solicitation_inactive")
    const [acceptSolicitationName, setAcceptSolicitationName] = useState('NAME')
    const [acceptSolicitationDescription, setAcceptSolicitationDescription] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has")
    const [acceptSolicitationOwner, setAcceptSolicitationOwner] = useState('Jordan')
    const [acceptSolicitationImage, setAcceptSolicitationImage] = useState("")

    const [upgradeStatus, setUpgradeStatus] = useState('upgrade_background_inactive')

    const [alertMessage, setAlertMessage] = useState("")
    const [isError, setIsError] = useState(false)
    const [alertStatus, setAlertStatus] = useState("alert_inactive")
    const [collectionStatus, setCollectionStatus] = useState(false)


    const [xpNeeded,setXpNeeded] = useState()


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
    const [groupId, setGroupId] = useState()

    const [level, setLevel] = useState()

    const [currentCollection, setCurrentCollection] = useState()

    const [collections, setCollections] = useState(0)

    

    useEffect(()=>{
        if(userId)
       { axios.post("http://localhost:5000/api/get_count_user_group",{userId:userId})
        .then((res)=>{setJoinedGroups(res.data.message)})
        .catch((err)=>{console.log(err)})

        axios.post("http://localhost:5000/api/get_count_collection",{userId:userId})
        .then((res)=>{setCountCollection(res.data.message)})
        .catch((err)=>{console.log(err)})

        axios.post("http://localhost:5000/api/get_count_owner_group",{userId:userId})
        .then((res)=>{setCountOwner(res.data.message)})
        .catch((err)=>{console.log(err)})
    
    }
    },[userId])


    const deleteCollection = useCallback(()=>{
        axios.post("http://localhost:5000/api/delete_collection",{collectionId:currentCollection})
        .then((res)=>{
            setCurrentCollection(null)
            axios.post("http://localhost:5000/api/get_all_collections", { userId })
                .then((res) => {
                    console.log(res)
                    if (res.data.message.length) {
                        setCollections(res.data.message.map((collection) => {
                            return <Collection
                            funcAlter={[setCurrentCollection]}
                                date={collection.createdAt}
                                documentId={collection.document}
                                userId={userId}
                                itemId={collection._id}
                                message={collection.message}
                            />
                        }))
                    }else{setCollections(null)}
                })
                .catch((err) => { console.log(err) })
        })
        .catch((err)=>{console.log(err)})
    },[currentCollection])

    useEffect(() => {

        generateLevelTable().forEach((item,i) => {
            if (userXp >= item.xpMin && userXp <= item.xpMax) {
                setLevel(item.level)
                console.log("seu xp: "+userXp)
                console.log("minXpLevel:"+item.xpMin)
                console.log("maxXpLevel:"+item.xpMax)
                // console.log("seu xp no intervalo:"+ userXp-item.xpMin)
                if(((userXp-item.xpMin)/(item.xpMax-item.xpMin))>=0){
                setLevelWidth(((userXp-item.xpMin)/(item.xpMax-item.xpMin))*100)
                }
                else{
                    setLevelWidth(0)
                }
                console.log(levelWidth)
                setXpNeeded(generateLevelTable()[i+1].xpMin-userXp)
            }
        })

    }, [userXp])

    useEffect(()=>{
        console.log(levelWidth)
    },[levelWidth])

    useEffect(() => {
        if (collectionStatus) {
            axios.post("http://localhost:5000/api/get_all_collections", { userId })
                .then((res) => {
                    console.log(res)
                    if (res.data.message.length) {
                        setCollections(res.data.message.map((collection) => {
                            return <Collection
                            funcAlter={[setCurrentCollection]}
                                date={collection.createdAt}
                                documentId={collection.document}
                                userId={userId}
                                itemId={collection._id}
                                message={collection.message}
                            />
                        }))
                    }
                })
                .catch((err) => { console.log(err) })
        }
    }, [collectionStatus])

    const [connected, setConnected] = useState(false)
    const [tokenError, setTokenError] = useState("")

    const showAlert = useCallback((isError, alertMessage, alertTime, reset) => {
        setIsError(isError);
        setAlertMessage(alertMessage)
        setAlertStatus('alert_active')
        setTimeout(() => {
            setAlertStatus('alert_inactive')
            if (reset == true) window.location.reload()
        }, alertTime)
    }, [])

    useEffect(() => {
        axios.post("http://localhost:5000/api/authorization", {}, { withCredentials: true })
            .then((res) => {
                console.log(res.data.message);
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
                setUserCreated(res.data.message.createdAt)
            })

            .catch((err) => {
                console.log(err.response.data);
                setTokenError(err.response.data.message);
                localStorage.clear()
            })
    }, [])



    return (

        <div id="home">

            {/* Verificação se usuário está com TOKEN válido V */}

            {connected == false ? <TokenInvalid token_error={tokenError} /> :
                <div id="home_principal">
                    <div id="home_content">
                        <EnhancedNavTop
                            page="Home"
                            home={false}
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

                        <div id="home_content_principal">
                            <NavLeft

                                requestType="solicitations"
                                requestLocal="http://localhost:5000/api/my_solicitation"
                                vars={
                                    [
                                        acceptSolicitationStatus,
                                        acceptSolicitationName,
                                        acceptSolicitationDescription,
                                        acceptSolicitationOwner,
                                        acceptSolicitationImage,
                                        groupId
                                    ]}

                                funcAlter={
                                    [
                                        setAcceptSolicitationStatus,
                                        setAcceptSolicitationName,
                                        setAcceptSolicitationDescription,
                                        setAcceptSolicitationOwner,
                                        setAcceptSolicitationImage,
                                        setGroupId
                                    ]}

                                code="home"
                                listTitle="Solicitações"
                                userId={userId}
                                topButtons={true}
                                updateButton={false}

                            />
                           <div id="home_content_principal_right">
                                    <div id="home_content_left_part">
                                        <div id="about_me_top">
                                            <div id="about_me_top_left">
                                            <img src={`data:image/png;base64,${userImage}`}/>
                                        </div>
                                        <div id="about_me_top_right">
                                                <h1 id="about_me_name">{userName}</h1>
                                                <p>
                                                    <span>Level: {level}</span>
                                                    <span id="about_me_xp">XP: {userXp}</span>
                                                </p>
                                                
                                                <div id="level_part">
                                                    <div style={{width:levelWidth+"%"}}></div>
                                                </div>
                                                
                                        </div>
                                        </div>
                                        <div id="about_info">
                                            <div id="about_info_left" onClick={()=>{navigate("/campaign")}}>
                                                <h2>Continue o modo campanha</h2>
                                                 <p>Ganhe {xpNeeded}xp para chegar ao level {level+1}</p>
                                            </div>
                                            <button onClick={()=>{setCollectionStatus(true)}}> 
                                                
                                                <img src={collection}/>
                                                Coleção</button>
                                            </div>
                                            <div id="pages_part">
                                                <div id="campaign_page" onClick={()=>{navigate("/campaign")}}>
                                                    <img src={campaign_icon}/>
                                                    <div>
                                                        <h1>Campanha</h1>
                                                        <p>Você fez -- lições</p>
                                                    </div>
                                                </div>
                                                <div id="groups_page" onClick={()=>{navigate("/groups")}}>
                                                      <img src={groups_icon}/>
                                                      <div>
                                                        <h1>Grupos</h1>
                                                        <p>Você está em {joinedGroups} grupos</p>
                                                    </div>
                                                </div>
                                                 <div id="documents_page" onClick={()=>{navigate("/documents")}}>
                                                      <img src={documents_icon}/>
                                                      <div>
                                                        <h1>Documentos</h1>
                                                        <p>Aprenda novos conceitos</p>
                                                    </div>
                                                 </div>
                                                <div id="games_page" onClick={()=>{navigate("/games")}}>
                                                      <img src={games_icon}/>
                                                      <div>
                                                        <h1>Jogos</h1>
                                                        <p>Divirta-se e aprenda</p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div id="upgrade_page" onClick={()=>{setUpgradeStatus("upgrade_background_active")}}>
                                                <p>Assinatura</p>
                                            </div>
                                            <div id="statistic_title">
                                                <img src={statistic_icon}/>
                                                Estatística:</div>
                                                <div id="statistics">
                                                    <div><h2>--</h2><p>Lições feitas</p></div>
                                                    <div><h2>--</h2><p>Lições criadas</p></div>
                                                    <div><h2>{joinedGroups}</h2><p>Grupos que participa</p></div>
                                                    <div><h2>{countOwner}</h2><p>Grupos criados</p></div>
                                                    <div><h2>{userCreated.slice(0,10)}</h2><p>Criação da conta</p></div>
                                                    <div><h2>{userXp}</h2><p>Quantidade de XP</p></div>
                                                    <div><h2>{countCollection}</h2><p>Itens na coleção</p></div>
                                                </div>
                                    </div>
                                    <div id="home_content_right_part">
                                            <img src={add}/>
                                    </div>
                           </div>
                            
                        </div>
                    </div>
                    <div id={upgradeStatus}>
                        <Upgrade exitFunction={setUpgradeStatus} />
                    </div>
                    <div id={acceptSolicitationStatus}>
                        <div id="accept_solicitation_top" >
                            <button onClick={() => { setAcceptSolicitationStatus("accept_solicitation_inactive") }}>X</button>
                        </div>
                        <div id="accept_solicitation_middle">
                            <div id="accept_solicitation_img">
                                <img src={`data:image/png;base64,${acceptSolicitationImage}`} />
                            </div>
                            <div>
                                <h4>{acceptSolicitationName}</h4>
                                <p>por: {acceptSolicitationOwner}</p>
                                <p>Descrição:</p>
                                <p>{acceptSolicitationDescription.length < 120 ? acceptSolicitationDescription : acceptSolicitationDescription.slice(0, 120) + "..."}</p>
                            </div>
                        </div>
                        <div id="accept_solicitation_bottom">
                            <button id="refuse_button" onClick={() => {
                                console.log(userId);
                                console.log(groupId);
                                axios.delete(`http://localhost:5000/api/delete_solicitation/${userId}/${groupId}`)
                                    .then((res) => {
                                        console.log("ola")
                                        setAcceptSolicitationStatus("accept_solicitation_inactive")
                                        showAlert(false, "Solicitação recusada", 1200, true)
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            }}>Recusar</button>


                            <button id="accept_button" onClick={() => {
                                axios.post("http://localhost:5000/api/create_user_group", { userId: userId, groupId: groupId })
                                    .then((res) => {
                                        setAcceptSolicitationStatus("accept_solicitation_inactive")
                                        showAlert(false, "Solicitação aceita", 1200, true)

                                        console.log(res)
                                    })
                                    .catch((err) => { console.log(err) })
                            }}>Aceitar</button>
                        </div>
                    </div>

                    <div id={alertStatus}>
                        <Alert error={isError} message={alertMessage} />
                    </div>
                    {
                        collectionStatus ?
                            (<div id="collection_background" onClick={() => { setCollectionStatus(false) }}>
                                <div id="collection_bar" onClick={(e) => { e.stopPropagation() }}>
                                    <div id="collection_bar_top">
                                        <h1>Minha coleção</h1>
                                        <button onClick={() => { setCollectionStatus(false) }}>X</button>
                                    </div>
                                    <p id="collection_introduction">Salve
                                        <span onClick={() => { 
                                            navigate("/documents");
                                            localStorage.setItem("currentDocument",null)
                                            localStorage.setItem("currentSubject",null)
                                            }}> documentos </span>
                                        que você acha ser importantes aqui.</p>
                                    {!collections ? <div id="collection_bar_bottom_empty">
                                        <img src={empty_collections} />
                                        <button onClick={() => { navigate("/documents") }}>Salvar documentos</button>
                                    </div> :
                                        <div id="collection_bar_bottom">
                                            {
                                                collections
                                            }

                                        </div>}
                                </div>
                            </div>) : null
                    }
                    {
                        currentCollection ?
                            (<div id="delete_collection_background" onClick={()=>{setCurrentCollection(null)}}>
                                <div id="delete_collection_bar" onClick={(e)=>{e.stopPropagation()}}>
                                    <p>Tem certeza que quer deletar este ítem?</p>
                                    <button id="delete_collection_confirm" onClick={()=>{deleteCollection()}}>Deletar</button>
                                    <button id="delete_collection_cancel" onClick={()=>{setCurrentCollection(null)}}>Cancelar</button>
                                </div>
                            </div>) : null
                    }
           
                </div>
            }
        </div>
    )

}



