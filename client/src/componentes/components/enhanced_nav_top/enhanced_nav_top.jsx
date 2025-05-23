import { useEffect, useState, useCallback, useRef } from "react"
import kangal from "../../../assets/all_pages/kangal2.png"
import sign_img from "../../../assets/all_pages/nav_top_icons/sign.png"
import home_img from "../../../assets/all_pages/nav_top_icons/house.png"
import bell_img from "../../../assets/all_pages/nav_top_icons/bell.png"
import group_img from "../../../assets/specific_page/group/group.png"
import config_img from "../../../assets/specific_page/update/config.png"
import { genders } from "./genders.js"
import { Alert } from "../alert/alert.jsx"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./enhanced_nav_top.css"

export function EnhancedNavTop({ page, home, group, host, search, userName, userImage, userEmail, userPassword, userDate, userAccountType, userGithub, userGender, userId }) {

    const [gendersOpt, setGendersOpt] = useState()

    const [modifiedName, setModifiedName] = useState(null)
    const [updateName, setUpdateName] = useState(userName)
    const [updateEmail, setUpdateEmail] = useState(userEmail)
    const [updateImage, setUpdateImage] = useState(`data:image/png;base64,${userImage}`)
    const [updatePassword, setUpdatePassword] = useState(userPassword)
    const [updateDate, setUpdateDate] = useState(userDate)
    const [updateGender, setUpdateGender] = useState(userGender)
    const [updateGithub, setUpdateGithub] = useState("")

    const [inputImage, setInputImage] = useState("")



    const [backgroundUpdate, setBackgroundUpdate] = useState("background_update_inactive")
    const [backgroundOptions, setBackgroundOptions] = useState("background_options_inactive")

    const [alertMessage, setAlertMessage] = useState("")
    const [alertError, setAlertError] = useState(false)
    const [alertStatus, setAlertStatus] = useState("alert_inactive")

    const imageRef = useRef()

    useEffect(() => {
        console.log(userGithub)
        userGithub == null ? setUpdateGithub("") : setUpdateGithub(userGithub)
    }, [])

    const alterImage = useCallback(() => {
        imageRef.current.click()
    }, [updateImage])


    const disconnect = useCallback(() => {
        axios.post("http://localhost:5000/api/clear_cookie", {}, { withCredentials: true })
            .then(() => { navigate("/login") })
            .catch((err) => { console.log("erro ao desconectar") })
    })




    useEffect(() => {
        console.log(updateImage)
    }, [])
    useEffect(() => {
        if (inputImage == "" || inputImage == null) {
            setUpdateImage(`data:image/png;base64,${userImage}`)
            setModifiedName(null)
        }

        else {
            console.log(inputImage)

            if (typeof (inputImage) == "object") {


                setModifiedName(inputImage)
                const url = URL.createObjectURL(inputImage)
                console.log(url)
                setUpdateImage(url)
                console.log(inputImage)
            }
        }
    }, [inputImage])
    useEffect(() => {
        console.log(genders)
        setGendersOpt(genders.map((gender, i) => (
            <option key={i} value={gender.value}>{gender.name}</option>
        )))
    }, [])

    const resetUpdate = useCallback(() => {
        setBackgroundUpdate("background_update_inactive")
        setUpdateEmail(userEmail)
        setUpdateImage(`data:image/png;base64,${userImage}`)
        setUpdateGender(userGender)
        setUpdateDate(userDate)
        setUpdateGithub(userGithub)
    }, [updateEmail, updateImage, updatePassword, updateDate, updateGender, updateGithub])

    const update = useCallback(() => {
        console.log(updateDate)
        console.log(updateEmail)
        console.log(updatePassword)
        console.log(updateGithub)
        console.log(updateGender)
        let image;
        if (modifiedName) {
            image = modifiedName
        }
        else {
            image = null
        }

        const formData = new FormData;
        formData.append("file", image)
        formData.append("email", updateEmail)
        formData.append("date", updateDate)
        formData.append("password", updatePassword)
        formData.append("github", updateGithub)
        formData.append("gender", updateGender)

        axios.put(`http://localhost:5000/api/user_update/${userId}`,
            formData
            , { withCredentials: true })
            .then((res) => { console.log(res); localStorage.setItem("image", res.data.image) })
            .catch((err) => { console.log(err) })
    }, [updateEmail, updateImage, updatePassword, updateDate, updateGithub, updateGender])
    const navigate = useNavigate()
    return (
        <div id="enhanced_nav_top">
            {/* Área da NavTop do usuário V */}
            {/* ------------------------------------------------------------------------- */}
            {/* ------------------------------------------------------------------------- */}


            <div id="left_side">
                <div id="kangal_part">
                    <img src={kangal} />
                </div>

                <div id="page_part">
                    <img src={sign_img} />
                    <p>{page}</p>
                </div>

                {home == true ?
                    <img src={home_img} onClick={() => { navigate("/home") }} className="nav_top_icons" id="home_part" />
                    : ""
                }
            </div>

            <div id="right_side">
                <img src={bell_img} className="nav_top_icons" id="bell_part" />
            {group == true ?
                <img src={group_img} className="nav_top_icons" id="_part" />

                    : ""
                }
                <div onClick={() => { setBackgroundOptions("background_options_active") }}>
                    <p>{userName}</p>
                    <img src={`data:image/png;base64,${userImage}`} />
                </div>

            </div>
            <div id={backgroundOptions} onClick={() => { setBackgroundOptions("background_options_inactive") }}>
                <div id="options_nav_top">
                    <button onClick={() => { setBackgroundUpdate("background_update_active") }}>Configurações</button>
                    <button onClick={() => { disconnect() }}>Sair</button>
                </div>
            </div>

            {/* Área de atualização do usuário V */}
            {/* ------------------------------------------------------------------------- */}
            {/* ------------------------------------------------------------------------- */}

            <div id={backgroundUpdate}  >
                <div id="bar_decoration_update">
                    <button onClick={() => { resetUpdate() }}>X</button>
                </div>
                <div id="bar_update" onClick={(e) => { e.stopPropagation() }}>

                    <div className="bar_update_part">
                        <div id="bar_update_part_title">
                            <img src={config_img} id="config_img" />
                            <h1>Configurações</h1>
                        </div>
                        <div id="bar_update_part_image">
                            <img src={updateImage} />
                            <button onClick={() => { alterImage() }}>Alterar imagem</button>
                            <input type="file" ref={imageRef} onChange={(e) => { setInputImage(e.target.files[0]) }} id="fileInput" />
                        </div>
                        <div className="bar_update_part_inputs">
                            <label>Github</label>
                            <input type="text" value={updateGithub} onChange={(e) => { setUpdateGithub(e.target.value) }} />
                        </div>

                        {
                            userAccountType == "google" ?
                                <p id="bar_update_alert_account_type">
                                    Você está logado com uma conta google, campo email e senha estarão bloqueados para mudança
                                </p> : ""
                        }
                    </div>
                    <div className="bar_update_part">
                        <div className="bar_update_part_inputs">
                            <label>Nome</label>
                            <input type="text" value={updateName} className="blocked_input" disabled={true} />
                        </div>
                        <div className="bar_update_part_inputs">
                            <label>Email</label>
                            {
                                userAccountType != "google" ?
                                    <input type="text" value={updateEmail} onChange={(e) => { setUpdateEmail(e.target.value) }} /> :
                                    <input type="text" value={updateEmail} className="blocked_input" disabled={true} />
                            }

                        </div>
                        <div className="bar_update_part_inputs">
                            <label>Senha</label>
                            {userAccountType != "google" ?
                                <input type="password" value={updatePassword} onChange={(e) => { setUpdatePassword(e.target.value) }} /> :
                                <input type="password" value={updatePassword} className="blocked_input" disabled={true} />
                            }

                        </div>
                        <div className="bar_update_part_inputs">
                            <label>Data de nascimento</label>
                            <input type="date" value={updateDate} onChange={(e) => { setUpdateDate(e.target.value) }} />
                        </div>
                        <div className="bar_update_part_inputs">
                            <label>Gênero</label>
                            <select value={updateGender} onChange={(e) => { console.log(e.target.value); setUpdateGender(e.target.value) }}>
                                {gendersOpt}
                            </select>

                        </div>

                    </div>
                    <div className="bar_update_part" id="bar_update_part_bottom">
                        <button id="btn_cancel" onClick={() => { resetUpdate() }}> Cancelar</button>
                        <button id="btn_apply" onClick={() => { update() }}> Aplicar</button>
                    </div>
                </div>
            </div>
            {/* <Alert error={true} message="Oi tudo bem" /> */}
        </div>
    )
}