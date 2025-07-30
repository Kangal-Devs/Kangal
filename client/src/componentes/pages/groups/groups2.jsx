import "./groups2.css"
import axios from "axios"
import { useState, useEffect, useCallback, } from "react"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import { Footer } from "../../components/footer/footer.jsx"
import { NavLeft } from "../../components/nav_left/nav_left.jsx"
import { useNavigate } from "react-router-dom"
import { Upgrade } from "../../components/upgrade/upgrade.jsx"
import { generateLevelTable } from "../../../levelGenerator.js"
import create_group from "../../../assets/specific_page/group/create_group1.png"
import { Member } from "../../components/member/member.jsx"
import { Invited } from "../../components/invited/invited.jsx"
import arrow from "../../../assets/specific_page/group/arrow.png"
import submit from "../../../assets/specific_page/group/submit.png"
import more from "../../../assets/specific_page/group/more.png"
import emogi from "../../../assets/specific_page/group/emogi.png"
import report from "../../../assets/specific_page/group/report.png"
import remove from "../../../assets/specific_page/group/remove.png"

import chat_color1 from "../../../assets/specific_page/group/chat_color1.png"
import chat_color2 from "../../../assets/specific_page/group/chat_color2.png"
import chat_color3 from "../../../assets/specific_page/group/chat_color3.png"
import chat_color4 from "../../../assets/specific_page/group/chat_color4.png"
import chat_color5 from "../../../assets/specific_page/group/chat_color5.png"
import chat_color6 from "../../../assets/specific_page/group/chat_color6.png"

import add_user from "../../../assets/specific_page/group/add_user.png"
import lup from "../../../assets/specific_page/group/lup.png"
import paper_error from "../../../assets/all_pages/error/paper_error.png"
import select_group from "../../../assets/specific_page/group/select_group.png"
export function Groups() {

    const navigate = useNavigate()

    const [chatColorsImages,setChatColorsImages] = useState({
        chatColor1:chat_color1,
        chatColor2:chat_color2,
        chatColor3:chat_color3,
        chatColor4:chat_color4,
        chatColor5:chat_color5,
        chatColor6:chat_color6
    })
     const [chatColor,setChatColor] = useState("chatColor1")

    const [searchUser, setSearchUser] = useState("")
    const [usersInvited, setUsersInvited] = useState()
    const [usersToInvite, setUsersToInvite] = useState()


    const [toInvite, setToInvite] = useState()
    const [invited, setInvited] = useState()

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


    const [currentGroupName, setCurrentGroupName] = useState()
    const [currentGroupId, setCurrentGroupId] = useState()
    const [currentGroupDescription, setCurrentGroupDescription] = useState()
    const [currentGroupImage, setCurrentGroupImage] = useState()
    const [amIOwner, setAmIOwner] = useState()
    const [currentGroupOwner, setCurrentGroupOwner] = useState()
    const [currentGroupMembers, setCurrentGroupMembers] = useState()

    const [groupMembers, setGroupMembers] = useState()
    const [groupOwner, setGroupOwner] = useState()

    const [currentMemberId, setCurrentMemberId] = useState()
    const [currentMemberName, setCurrentMemberName] = useState()
    const [currentMemberImage, setCurrentMemberImage] = useState()
    const [currentMemberXp, setCurrentMemberXp] = useState()

    const [currentInviteId, setCurrentInviteId] = useState()
    const [currentInviteImage, setCurrentInviteImage] = useState()
    const [currentInviteName, setCurrentInviteName] = useState()



    const [localName, setLocalName] = useState("Grupos")

    const [inviteUserStatus, setInviteUserStatus] = useState()

    const [connected, setConnected] = useState(false)
    const [tokenError, setTokenError] = useState("")

    const [emogiBarStatus, setEmogiBarStatus] = useState(false)
    const [createGroupStatus, setCreateGroupStatus] = useState(false)
    const [aboutGroupStatus, setAboutGroupStatus] = useState()
    const[chatColorStatus,setChatColorStatus] = useState()


    const [inputMessage, setInputMessage] = useState("")

    const [createGroupName, setCreateGroupName] = useState("")
    const [createGroupDescription, setCreateGroupDescription] = useState("")



    const insertEmogi = useCallback((e) => {
        setInputMessage(prev => prev + e)
        setEmogiBarStatus(false)
    }, [])

    const changeChatColor = useCallback((color)=>{
        setChatColor(color)
        setChatColorStatus(false)
    },[])

    const createGroup = useCallback(() => {
        if (createGroupName.length >= 3 && createGroupDescription.length >= 3) {
            axios.post("http://localhost:5000/api/create_group", {
                name: createGroupName,
                description: createGroupDescription,
                owner: userId,
            })
                .then((res) => {
                    setCreateGroupStatus(false)
                    localStorage.setItem("currentGroup", JSON.stringify(res.data.groupId))
                    setTimeout(() => {
                        window.location.reload()
                    }, 100);

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [createGroupName, createGroupDescription, userId])

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

    useEffect(() => {
        if (currentInviteId) {
            axios.post("http://localhost:5000/api/get_user", { _id: currentInviteId })
                .then((res) => {
                    setCurrentInviteImage(res.data.message.image)
                    setCurrentInviteName(res.data.message.name)
                })
        }
    }, [currentInviteId])



    const searchUsers = useCallback(() => {
        if (searchUser) {

            axios.post("http://localhost:5000/api/get_users_limit5", { userName: searchUser })
                .then((res) => {
                    setUsersToInvite(res.data.message.map((user) => {
                        return <Invited
                            loadUsersInvite={loadUsersInvite}
                            name={user.name}
                            id={user._id}
                            userId={userId}
                            image={user.image}
                            toInvite={true}
                            currentGroupId={currentGroupId}
                        />
                    }))
                })
                .catch((err) => { console.log(err) })
        }
    }, [searchUser])

    useEffect(() => {
        if (localStorage.getItem("currentGroup")) {
            setCurrentGroupId(JSON.parse(localStorage.getItem("currentGroup")))
        }
    }, [])

    const loadUsersInvite = useCallback(() => {
        setSearchUser("")
        setUsersInvited()
        setUsersToInvite()
        axios.post("http://localhost:5000/api/group_solicitation", { _id: currentGroupId })
            .then((res) => {

                Promise.all(res.data.message.map((solicitacao) => { return axios.post("http://localhost:5000/api/get_user", { _id: solicitacao.user }) }))
                    .then((res2) => {
                        setUsersInvited(res2.map((user) => {
                            return <Invited
                                loadUsersInvite={loadUsersInvite}
                                name={user.data.message.name}
                                toInvite={false}
                                image={user.data.message.image}
                                id={user.data.message._id}
                                userId={userId}
                                currentGroupId={currentGroupId}

                            />
                        }))
                    })
                    .catch((err) => { console.log(err) })
            })
            .catch((err) => { console.log(err) })
    }, [currentGroupId])

    useEffect(() => {
        if (inviteUserStatus) {
            loadUsersInvite()
        }
    }, [inviteUserStatus])

    useEffect(() => {

        if (currentGroupId) {
            setCurrentMemberId()
            axios.post("http://localhost:5000/api/get_group", { _id: currentGroupId })
                .then((res) => {
                    setGroupMembers()
                    setGroupOwner()

                    localStorage.setItem("currentGroup", JSON.stringify(currentGroupId))
                    setEmogiBarStatus(false)
                    setChatColorStatus(false)
                    setCurrentGroupOwner()

                    setTimeout(() => {
                        setCurrentGroupOwner(res.data.message.owner)
                    }, 100)

                    setCurrentGroupImage(res.data.message.image)
                    setCurrentGroupName(res.data.message.name)
                    setCurrentGroupDescription(res.data.message.description)
                    setAmIOwner(res.data.message.owner == userId)

                })
                .catch((err) => { console.log(err) })
        }
    }, [currentGroupId])

    useEffect(() => {
        if (currentGroupOwner) {

            axios.post("http://localhost:5000/api/get_all_user_group2", { _id: currentGroupId })
                .then((res2) => {

                    Promise.all(res2.data.message.map((member) => {
                        return axios.post("http://localhost:5000/api/get_user", { _id: member.user })
                    }))
                        .then((res3) => {

                            setGroupMembers(res3.map((member2, i) => {
                                console.log("DONO:" + currentGroupOwner)
                                if (member2.data.message._id != currentGroupOwner) {
                                    console.log("MEMBROS:" + member2.data.message._id)

                                    return <Member
                                        funcAlter={[setCurrentMemberId]}
                                        isOwner={false}
                                        id={member2.data.message._id}
                                        name={member2.data.message.name}
                                        gender={member2.data.message.gender}
                                        image={member2.data.message.image}
                                        xp={member2.data.message.xp}
                                    />
                                }
                            }))

                            setGroupOwner(res3.map((member2, i) => {

                                if (member2.data.message._id == currentGroupOwner) {
                                    return <Member
                                        funcAlter={[setCurrentMemberId]}
                                        isOwner={true}
                                        id={member2.data.message._id}
                                        name={member2.data.message.name}
                                        gender={member2.data.message.gender}
                                        image={member2.data.message.image}
                                        xp={member2.data.message.xp}
                                    />
                                }
                            }))

                        }


                        )
                        .catch((err) => { console.log(err) })

                }


                )

                .catch((err2) => { console.log(err2) })


        }
    }, [currentGroupOwner])

    useEffect(() => {
        if (currentMemberId) {
            axios.post("http://localhost:5000/api/get_user", { _id: currentMemberId })
                .then((res) => {
                    setCurrentMemberImage(res.data.message.image)
                    setCurrentMemberXp(res.data.message.xp)
                    setCurrentMemberName(res.data.message.name)
                })
                .catch((err) => { console.log(err) })
        }
    }, [currentMemberId])

    useEffect(()=>{
        if(aboutGroupStatus){

        }
    },[aboutGroupStatus])
    return (
        <div id="groups">
            {connected == false ? <TokenInvalid token_error={tokenError} /> : (
                <div id="groups_principal">
                    <EnhancedNavTop
                        funcAlter={[setAboutGroupStatus]}
                        page={localName}
                        home={true}
                        group={currentGroupId}
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
                    <div id="groups_content">
                        <NavLeft

                            requestType="groups"
                            requestLocal="http://localhost:5000/api/get_all_user_group"
                            listTitle="Grupos"
                            userId={userId}
                            topButtons={true}
                            updateButton={false}
                            local="groups"
                            code="groups"
                            vars={[currentGroupId]}
                            funcAlter={[setCurrentGroupId, setCreateGroupStatus]}
                        />
                        {
                            !currentGroupId ?
                                <div id="groups_content_empty">
                                    <img src={select_group} />
                                </div> :
                                <div id="groups_content_principal">
                                    <div id="groups_content_principal_chat_part">
                                        <div id="group_chat"></div>
                                        {currentGroupOwner == userId ?
                                            <div id="group_input_bar">

                                                <div id="group_input_bar_principal">
                                                    <button id="input_add" className="inputs_chat"><img src={more} /></button>
                                                    <div id="input_part">
                                                        <button id="input_emogi" onClick={() => { setEmogiBarStatus(true) }}>
                                                            <img src={emogi} />
                                                        </button>
                                                        <button id="input_color" onClick={() => { setChatColorStatus(true) }}>
                                                            <img src={chatColorsImages[chatColor]} />
                                                        </button>
                                                        <input type="text" value={inputMessage} onChange={(e) => { setInputMessage(e.target.value) }} />
                                                    </div>
                                                    <button id="input_submit" className="inputs_chat"><img src={submit} /></button>


                                                </div>

                                            </div> : <div></div>}
                                    </div>
                                    {!currentMemberId ?
                                        (<div id="groups_content_principal_members_part">
                                            <p>Lider:</p>
                                            {groupOwner}
                                            {amIOwner ? <button id="button_add_member" onClick={() => {
                                                setInviteUserStatus(true)
                                            }}><img src={add_user} />Adicionar</button> : null}
                                            <p>Membros:</p>
                                            {groupMembers}
                                        </div>) :
                                        (<div id="groups_content_principal_member_part">

                                            <div id="groups_content_principal_member_top">
                                                <img src={arrow} id="arrow_button" onClick={() => { setCurrentMemberId() }} />
                                            </div>
                                            <div id="groups_content_principal_member_bottom">
                                                <div id="member_image">
                                                    <img src={`data:image/png;base64,${currentMemberImage}`} />

                                                </div>
                                                <p>{currentMemberName}</p>


                                                {
                                                    currentMemberId != userId ?
                                                        (<>
                                                            <button id="button_report" onClick={() => { userReport() }}><img src={report} />Denunciar</button>
                                                            {
                                                                currentGroupOwner == userId ?
                                                                    (<button id="button_kick" onClick={() => { userKick() }}><img src={remove} />Expulsar</button>
                                                                    ) : null}
                                                        </>
                                                        ) : null}



                                            </div>
                                        </div>)}

                                </div>
                        }

                    </div>
                    {
                        inviteUserStatus ? (
                            <div id="invite_user_background" onClick={() => { setInviteUserStatus(false) }}>
                                <div id="invite_user_bar" onClick={(e) => { e.stopPropagation() }}>

                                    <div id="invite_user_part">
                                        <div id="invite_user_top">
                                            <h1>Convide usuários</h1>
                                            <label>Nome:</label>
                                            <div>
                                                <input type="text" placeholder="Guest" value={searchUser} onChange={(e) => { (setSearchUser(e.target.value)) }} />
                                                <button onClick={() => { searchUsers() }}><img src={lup} /></button>
                                            </div>
                                        </div>
                                        <div id="invite_user_bottom">
                                            {usersToInvite}
                                        </div>
                                    </div>

                                    <div id="invited_users_part">
                                        <div id="invited_users_top">
                                            <div id="invited_users_top_exit_part"><button onClick={() => { setInviteUserStatus(false) }}>X</button></div>
                                            <h1>Usuários convidados</h1>
                                        </div>
                                        <div id="invited_users_decoration"></div>
                                        <div id="invited_users_bottom">


                                            <div id="invited_users_bottom_list">
                                                {usersInvited}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>) : null
                    }

                    {
                        emogiBarStatus ? (
                            <div id="emogi_background" onClick={() => { setEmogiBarStatus(false) }}>
                                <div id="emogi_bar" onClick={(e) => { e.stopPropagation() }}>
                                    <div id="emogi_bar_top">
                                        Emogis:
                                        <button onClick={() => { setEmogiBarStatus(false) }}>X</button>
                                    </div>
                                    <div id="emogi_bar_bottom">
                                        <button onClick={() => { insertEmogi("🤣") }}>🤣</button>
                                        <button onClick={() => { insertEmogi("😎") }}>😎</button>
                                        <button onClick={() => { insertEmogi("😲") }}>😲</button>
                                        <button onClick={() => { insertEmogi("👍") }}>👍</button>
                                        <button onClick={() => { insertEmogi("😡") }}>😡</button>
                                        <button onClick={() => { insertEmogi("🤔") }}>🤔</button>
                                        <button onClick={() => { insertEmogi("🚨") }}>🚨</button>
                                        <button onClick={() => { insertEmogi("❤") }}>❤</button>

                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                    {
                        chatColorStatus ? (
                            <div id="chat_color_background" onClick={() => { setChatColorStatus(false) }}>
                                <div id="chat_color_bar" onClick={(e) => { e.stopPropagation() }}>
                                    <div id="chat_color_bar_top">
                                        Emogis:
                                        <button onClick={() => { setChatColorStatus(false) }}>X</button>
                                    </div>
                                    <div id="chat_color_bar_bottom">
                                        <button onClick={()=>{changeChatColor("chatColor1")}}> <img src={chatColorsImages.chatColor1}/></button>
                                        <button onClick={()=>{changeChatColor("chatColor2")}}> <img src={chatColorsImages.chatColor2}/></button>
                                        <button onClick={()=>{changeChatColor("chatColor3")}}> <img src={chatColorsImages.chatColor3}/></button>
                                        <button onClick={()=>{changeChatColor("chatColor4")}}> <img src={chatColorsImages.chatColor4}/></button>
                                        <button onClick={()=>{changeChatColor("chatColor5")}}> <img src={chatColorsImages.chatColor5}/></button>
                                        <button onClick={()=>{changeChatColor("chatColor6")}}> <img src={chatColorsImages.chatColor6}/></button>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                    {
                        createGroupStatus ?
                            (<div id="create_group_background" onClick={() => { setCreateGroupStatus(false) }}>
                                <div id="create_group_bar" onClick={(e) => { e.stopPropagation() }}>
                                    <div id="create_group_bar_top">
                                        <img src={create_group} />
                                        <h2> Criar grupo</h2>
                                    </div>
                                    <div id="create_group_bar_decoration"></div>
                                    <div id="create_group_bar_bottom">
                                        <label>Nome</label>
                                        <input type="text" value={createGroupName} onChange={(e) => { setCreateGroupName(e.target.value) }} />
                                        <label>Descrição</label>
                                        <input type="text" value={createGroupDescription} onChange={(e) => { setCreateGroupDescription(e.target.value) }} />
                                        <button onClick={() => { createGroup() }}>Criar</button>
                                    </div>
                                </div>
                            </div>)
                            : null
                    }
                    {
                        aboutGroupStatus ? (
                            <div id="about_group_background" onClick={()=>{setAboutGroupStatus(false)}}>
                                <div id="about_group_bar" onClick={(e)=>{e.stopPropagation()}}>

                                </div>
                            </div>
                        ) : null
                    }

                </div>)
            }
        </div>
    )
}