import "./groups2.css"
import axios from "axios"
import { useState, useEffect, useCallback, useRef, } from "react"
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
import more from "../../../assets/specific_page/group/more1.png"
import emogi from "../../../assets/specific_page/group/emogi.png"
import report from "../../../assets/specific_page/group/report.png"
import remove from "../../../assets/specific_page/group/remove.png"
import { Message } from "../../components/messages/message.jsx"
import group_icon from "../../../assets/specific_page/group/group.png"
import member_icon from "../../../assets/specific_page/group/member.png"
import chat_color1 from "../../../assets/specific_page/group/chat_color1.png"
import chat_color2 from "../../../assets/specific_page/group/chat_color2.png"
import chat_color3 from "../../../assets/specific_page/group/chat_color3.png"
import chat_color4 from "../../../assets/specific_page/group/chat_color4.png"
import chat_color5 from "../../../assets/specific_page/group/chat_color5.png"
import chat_color6 from "../../../assets/specific_page/group/chat_color6.png"
import not_invited from "../../../assets/specific_page/group/noInvited.webp"
import add_user from "../../../assets/specific_page/group/add_user.png"
import lup from "../../../assets/specific_page/group/lup.png"
import copy_github from "../../../assets/specific_page/group/copy_github.png"
import paper_error from "../../../assets/all_pages/error/paper_error.png"
import select_group from "../../../assets/specific_page/group/select_group2.webp"
import default_lesson from "../../../assets/specific_page/group/default_lesson_picture.jpg"
import ajuda from "../../../assets/specific_page/group/help.png"
import select from "../../../assets/specific_page/group/select.png"
import explanation from "../../../assets/specific_page/group/explanation.png"
import code from "../../../assets/specific_page/group/free.png"
import task_image from "../../../assets/specific_page/group/task_image1.png"
import { Group } from "../../components/group/group.jsx"
import loading from "../../../assets/specific_page/group/loading.webp"
// import groups_background from "../../../assets/specific_page/group/groups_background1.svg"
export function Groups() {

    const navigate = useNavigate()

    
    const [chatColorsImages, setChatColorsImages] = useState({
        chatColor1: chat_color1,
        chatColor2: chat_color2,
        chatColor3: chat_color3,
        chatColor4: chat_color4,
        chatColor5: chat_color5,
        chatColor6: chat_color6
    })

    const [chatColorInfo, setChatColorInfo] = useState({
        chatColor1: { fontColor: "#2b2b2bff", backgroundColor: "#ecececff" },
        chatColor2: { fontColor: "#B20000", backgroundColor: "#ecececff" },
        chatColor3: { fontColor: "#FFFFFF", backgroundColor: "#32363F" },
        chatColor4: { fontColor: "#B20000", backgroundColor: "#32363F" },
        chatColor5: { fontColor: "#FFFFFF", backgroundColor: "#4A5823" },
        chatColor6: { fontColor: "#B20000", backgroundColor: "#4A5823" },
    })



    const [chatColor, setChatColor] = useState("chatColor1")

    const [searchUser, setSearchUser] = useState("")
    const [usersInvited, setUsersInvited] = useState([])
    const [usersToInvite, setUsersToInvite] = useState([])


    const [toInvite, setToInvite] = useState([])
    const [invited, setInvited] = useState([])

    const [reportReason, setReportReason] = useState()

    const [currentMessageCreatAt, setCurrentMessageCreatAt] = useState("")

    const [leaveGroupStatus, setLeaveGroupStatus] = useState(false)
    const [updateGroupStatus, setUpdateGroupStatus] = useState(false)

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

    const [messages, setMessages] = useState()

    const [publicGroups,setPublicGroups] = useState()

    const [amIOwner, setAmIOwner] = useState()
    const [currentGroupOwner, setCurrentGroupOwner] = useState()
    const [currentGroupMembers, setCurrentGroupMembers] = useState()

    const [reportMessageReason,setReportMessageReason] = useState()

    const [currentGroupCreatedAt, setCurrentGroupCreatedAt] = useState()
    const [currentGroupName, setCurrentGroupName] = useState()
    const [currentGroupId, setCurrentGroupId] = useState()
    const [currentGroupIsPublic, setCurrentGroupIsPublic] = useState()
    const [currentGroupDescription, setCurrentGroupDescription] = useState()
    const [currentGroupImage, setCurrentGroupImage] = useState()
    const [currentGroupTitleLink2, setCurrentGroupTitleLink2] = useState()
    const [currentGroupTitleLink1, setCurrentGroupTitleLink1] = useState()
    const [currentGroupLink2, setCurrentGroupLink2] = useState()
    const [currentGroupLink1, setCurrentGroupLink1] = useState()

    const [groupMembers, setGroupMembers] = useState()
    const [groupOwner, setGroupOwner] = useState()

    const [reportMessageStatus,setReportMessageStatus] = useState(false)

    const [currentMemberId, setCurrentMemberId] = useState()
    const [currentMemberName, setCurrentMemberName] = useState()
    const [currentMemberImage, setCurrentMemberImage] = useState()
    const [currentMemberXp, setCurrentMemberXp] = useState()
    const [currentMemberGithub, setCurrentMemberGithub] = useState()

    const [currentInviteId, setCurrentInviteId] = useState()
    const [currentInviteImage, setCurrentInviteImage] = useState()
    const [currentInviteName, setCurrentInviteName] = useState()

    const [reportUserStatus, setReportUserStatus] = useState()
    const [removeUserStatus, setRemoveUserStatus] = useState()

    const [localName, setLocalName] = useState("Grupos")

    const [inviteUserStatus, setInviteUserStatus] = useState()

    const [connected, setConnected] = useState(false)
    const [tokenError, setTokenError] = useState("")

    const [emogiBarStatus, setEmogiBarStatus] = useState(false)
    const [createGroupStatus, setCreateGroupStatus] = useState(false)
    const [aboutGroupStatus, setAboutGroupStatus] = useState(false)
    const [chatColorStatus, setChatColorStatus] = useState(false)
    const [createLessonStatus,setCreateLessonStatus] = useState(false)
    const [createTaskStatus,setCreateTaskStatus] = useState(false)
    const [helpTaskStatus,setHelpTaskStatus] = useState(false)
    const createLessonImageRef = useRef()
    const createTaskImageRef = useRef()
    
    const [updateMessageStatus, setUpdateMessageStatus] = useState(false)

    const [currentMessageValue,setCurrentMessageValue] = useState("")

    const [inputMessage, setInputMessage] = useState("")

    const [currentMessageId, setCurrentMessageId] = useState()

    const [createGroupName, setCreateGroupName] = useState("")
    const [createGroupDescription, setCreateGroupDescription] = useState("")

    const [updateGroupName, setUpdateGroupName] = useState()
    const [updateGroupDescription, setUpdateGroupDescription] = useState()
    // updateGroupImage é usado para pegar imagem e carrega-la na tela, enquanto o updateGroupImageFile, ele fica responsável por ficar com as informações da imagem para mandar para o backend.
    const [updateGroupImage, setUpdateGroupImage] = useState()
    const [updateGroupImageFile, setUpdateGroupImageFile] = useState(null)
    const [updateGroupTitleLink1, setUpdateGroupTitleLink1] = useState("")
    const [updateGroupLink1, setUpdateGroupLink1] = useState("")
    const [updateGroupTitleLink2, setUpdateGroupTitleLink2] = useState("")
    const [updateGroupLink2, setUpdateGroupLink2] = useState("")
    const [updateGroupIsPublic,setUpdateGroupIsPublic] = useState(false)

    const [showMoreCoordinates, setShowMoreCoordinates] = useState([])

    const updateAlterImageRef = useRef()


    const [createTaskDescription2,setCreateTaskDescription2] = useState("")
    const [createTaskDescription1,setCreateTaskDescription1] = useState("")
    const [createTaskImageInput,setCreateTaskImageInput] = useState()
    const [createTaskImage,setCreateTaskImage] = useState()
    const [createTaskType,setCreateTaskType] = useState()
    const [createTaskCode,setCreateTaskCode] = useState()
    const [createTaskTitle,setCreateTaskTitle] = useState()

    const [createLessonName,setCreateLessonName] = useState()
    const [createLessonDescription,setCreateLessonDescription] = useState()
    // createLessonImageInput é a o valor no qual que o usuario põe no campo file de imagem para criar a lissão, e createLessonImage é a imagem a mostra para o usuario, se a createLessonImageInput for vazia createLessonImage recebera uma imagem default para aparecer

    const [createLessonImageInput,setCreateLessonImageInput] = useState()
    const [createLessonImage,setCreateLessonImage] = useState()

    useEffect(()=>{
      
    
        if(!currentGroupId){
          axios.get("http://localhost:5000/api/get_all_public_groups")
          .then((res)=>{
            setPublicGroups(res.data.message.map((group,i)=>{
                return (<Group name={group.name} description={group.description} image={group.image} itemId={group._id} owner={group.owner} userId={userId} funcAlter={[setCurrentGroupId]}/>)
            }))
          })
          .catch((err)=>{console.log(err)})
        }
    },[currentGroupId])

    useEffect(()=>{
        
        if(createLessonStatus){
            setCreateLessonName("")
            setCreateLessonDescription("")
            setCreateLessonImageInput()
            setCreateLessonImage(default_lesson)
         
        }
    },[createLessonStatus])

    useEffect(()=>{
        if(createLessonStatus){
            if(createLessonImageInput){
                setCreateLessonImage(URL.createObjectURL(createLessonImageInput)) 
            }
            else{
                setCreateLessonImage(default_lesson)
            }
        }
    },[createLessonImageInput,createLessonStatus])

    

    const reportMessage = useCallback(()=>{
        axios.post("http://localhost:5000/api/create_message_report",{userId,messageId:currentMessageId,reason:reportMessageReason})
        .then((res)=>{
            window.location.reload()
        })
        .catch((err)=>{console.log(err)})
    },[reportMessageReason,userId,currentMessageId])

    const deleteMessage = useCallback(() => {
        axios.delete(`http://localhost:5000/api/delete_message/${currentMessageId}`)
            .then((res) => {
                console.log(res)
                window.location.reload()
            })
            .catch((err) => {
                console.log(res)
            })
    }, [currentMessageId])

    useEffect(()=>{
        if(createTaskStatus){
            setCreateTaskType("explanation")
        }
    },[createTaskStatus])



    useEffect(() => {

        setUpdateGroupDescription(currentGroupDescription)
        setUpdateGroupName(currentGroupName)
        setUpdateGroupImage(`data:image/png;base64,${currentGroupImage}`)
        setUpdateGroupIsPublic(currentGroupIsPublic)
    }, [currentGroupImage, currentGroupDescription, currentGroupName,currentGroupIsPublic])

    // useEffect(()=>{
    //     console.log(updateGroupImageFile)
    // },[updateGroupStatus])

    useEffect(() => {
    
        if(currentGroupLink1 !=" "){
        setUpdateGroupLink1(currentGroupLink1)
        }else{
            setUpdateGroupLink1("")
        }

        if(currentGroupTitleLink1 !=" "){
        setUpdateGroupTitleLink1(currentGroupTitleLink1)
        }else{
            setUpdateGroupTitleLink1("")
        }

        if(currentGroupLink2 !=" "){
        setUpdateGroupLink2(currentGroupLink2)
        }else{
            setUpdateGroupLink2("")
        }

        if(currentGroupTitleLink2 !=" "){
        setUpdateGroupTitleLink2(currentGroupTitleLink2)
        }else{
            setUpdateGroupTitleLink2("")
        }

    }, [currentGroupTitleLink1, currentGroupTitleLink2, currentGroupLink1, currentGroupLink2,])

    const [countMembers, setCounteMembers] = useState(0)
    useEffect(() => {
        if (aboutGroupStatus) {
            axios.get(`http://localhost:5000/api/get_count_members_group/${currentGroupId}`)
                .then((res) => {
                    setCounteMembers(res.data.message)
                })
                .catch((err) => { console.log(err) })
        }
    }, [aboutGroupStatus])

    const insertEmogi = useCallback((e) => {
        setInputMessage(prev => prev + e)
        setEmogiBarStatus(false)
    }, [])

    const changeChatColor = useCallback((color) => {
        setChatColor(color)
        setChatColorStatus(false)

    }, [])

    const leaveGroup = useCallback((amIOwner) => {
        axios.delete(`http://localhost:5000/api/delete_user_group/${userId}/${currentGroupId}`)
            .then((res) => {

                localStorage.setItem("currentGroup", null)
                window.location.reload()
            })
            .catch((err) => {
                localStorage.setItem("currentGroup", null)
                console.log(err)
            })
    }, [userId, currentGroupId])

    const reportUser = useCallback(() => {
        axios.post("http://localhost:5000/api/create_report", {
            reporter: userId,
            reported: currentMemberId,
            reason: reportReason,
            groupId: currentGroupId
        })
            .then((res) => { setReportUserStatus(false); setReportReason("") })
            .catch((err) => { console.log(err) })
    }, [reportReason, currentMemberId, userId, currentGroupId])

    const removeUser = useCallback(() => {
        axios.delete(`http://localhost:5000/api/delete_user_group/${currentMemberId}/${currentGroupId}`)
            .then((res) => { window.location.reload() })
            .catch((err) => { console.log(err) })
    }, [currentGroupId, currentMemberId])

    const createMessage = useCallback(() => {
        if (inputMessage) {

            axios.post("http://localhost:5000/api/create_message", {
                fontColor: chatColorInfo[chatColor].fontColor,
                backgroundColor: chatColorInfo[chatColor].backgroundColor,
                value: inputMessage,
                groupId: currentGroupId
            }).then((res) => {
                setInputMessage("")
                axios.post("http://localhost:5000/api/get_all_messages", { groupId: currentGroupId })
                    .then((res) => {
                        setMessages(res.data.message.map((message) => { return <Message value={message.value} fontColor={message.fontColor} backgroundColor={message.backgroundColor} status={message.status} itemId={message._id} funcAlter={[setCurrentMessageId, setShowMoreCoordinates,setCurrentMessageValue]} /> }))
                    })
                    .catch((err) => { console.log(err) })

                console.log("message criada")
            })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [chatColor, inputMessage, currentGroupId])

    const changeGroupImage = useCallback((e) => {
        const file = e.target.files[0]
        if (file) {
            console.log(typeof (file))
            setUpdateGroupImageFile(file)
            setUpdateGroupImage(URL.createObjectURL(file))
        }
    }, [])

    const updateGroup = useCallback(() => {
        const formData = new FormData

        formData.append("name", updateGroupName)
        formData.append("description", updateGroupDescription)
        formData.append("link1", updateGroupLink1)
        formData.append("link2", updateGroupLink2)
        formData.append("titleLink1", updateGroupTitleLink1)
        formData.append("titleLink2", updateGroupTitleLink2)
        formData.append("file", updateGroupImageFile)
        formData.append("isPublic", updateGroupIsPublic)

        console.log(updateGroupTitleLink1)

        axios.put(`http://localhost:5000/api/update_group/${currentGroupId}`, formData)
            .then((res) => {

                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })

    }, [updateGroupDescription, updateGroupImage, updateGroupLink1, updateGroupLink2, updateGroupName, updateGroupTitleLink1, updateGroupTitleLink2, updateGroupImageFile, currentGroupId,updateGroupIsPublic])

    const cancelUpdateGroup = useCallback(() => {
        setUpdateGroupStatus(false)
        setUpdateGroupDescription(currentGroupDescription)
        setUpdateGroupName(currentGroupName)
        setUpdateGroupImage(`data:image/png;base64,${currentGroupImage}`)
        setUpdateGroupLink1(currentGroupLink1)
        setUpdateGroupTitleLink1(currentGroupTitleLink1)
        setUpdateGroupLink2(currentGroupLink2)
        setUpdateGroupTitleLink2(currentGroupTitleLink2)
        setUpdateGroupIsPublic(currentGroupIsPublic)
    }, [currentGroupDescription,
        currentGroupName,
        currentGroupIsPublic,
        currentGroupImage,
        currentGroupLink1,
        currentGroupLink2,
        currentGroupTitleLink1,
        currentGroupTitleLink2
    ])

    const updateMessage = useCallback(()=>{
        axios.put(`http://localhost:5000/api/update_message/${currentMessageId}`,{value:currentMessageValue})
        .then((res)=>{
            window.location.reload()
        })
        .catch((err)=>{console.log(err)})
    },[currentMessageId,currentMessageValue])

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
            axios.post("http://localhost:5000/api/get_group", { _id: JSON.parse(localStorage.getItem("currentGroup")) })
                .then((res) => {
                    setCurrentGroupId(JSON.parse(localStorage.getItem("currentGroup")))
                })
                .catch((err) => {
                    setCurrentGroupId(null)
                })

        }
    }, [])

    const loadUsersInvite = useCallback(() => {
        setSearchUser("")
        setUsersInvited([])
        setUsersToInvite([])
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
                    setMessages()

                    localStorage.setItem("currentGroup", JSON.stringify(currentGroupId))
                    setEmogiBarStatus(false)
                    setChatColorStatus(false)
                    setCurrentGroupOwner()

                    setTimeout(() => {
                        setCurrentGroupOwner(res.data.message.owner)
                    }, 100)

                    setCurrentGroupCreatedAt(res.data.message.createdAt)
                    setCurrentGroupLink1(res.data.message.link1)
                    setCurrentGroupLink2(res.data.message.link2)
                    setCurrentGroupTitleLink2(res.data.message.titleLink2)
                    setCurrentGroupTitleLink1(res.data.message.titleLink1)
                    setCurrentGroupImage(res.data.message.image)
                    setCurrentGroupName(res.data.message.name)
                    setCurrentGroupIsPublic(res.data.message.isPublic)
                    setCurrentGroupDescription(res.data.message.description)
                    setAmIOwner(res.data.message.owner == userId)

                    axios.post("http://localhost:5000/api/get_all_messages", { groupId: currentGroupId })
                        .then((res) => {
                            if (res.data.message.length) {
                                setMessages(res.data.message.map((message) => { return <Message value={message.value} fontColor={message.fontColor} backgroundColor={message.backgroundColor} status={message.status} itemId={message._id} funcAlter={[setCurrentMessageId, setShowMoreCoordinates,setCurrentMessageValue]} /> }))
                            }
                        })
                        .catch((err) => { console.log(err) })
                })
                .catch((err) => { console.log(err) })


        }else{
           
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
                               
                                if (member2.data.message._id != currentGroupOwner) {
                                  

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
                    setCurrentMemberGithub(res.data.message.github)
                })
                .catch((err) => { console.log(err) })
        }
    }, [currentMemberId])

    useEffect(() => {
        if (aboutGroupStatus) {

        }
    }, [aboutGroupStatus])

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
                            updateButton={true}
                            local="groups"
                            code="groups"
                            vars={[currentGroupId]}
                            funcAlter={[setCurrentGroupId, setCreateGroupStatus]}
                        />
                        {
                            !currentGroupId ?
                                <div id="groups_content_empty">
                                    <div id="decoration_groups_background">
                           
                                    </div>
                                     <div id="decoration_groups_principal"></div>
                                     <p id="group_list_title">Grupos públicos:</p>
                                     <div id="groups_list">
                                        {publicGroups?publicGroups:<img src={loading} id="loading"/>}
                                     </div>
                                </div> :
                                <div id="groups_content_principal">
                                    <div id="groups_content_principal_chat_part">
                                        <div id="group_chat">



                                            {messages}

                                        </div>
                                        {currentGroupOwner == userId ?
                                            <div id="group_input_bar">

                                                <div id="group_input_bar_principal">
                                                    <button id="input_add" onClick={()=>{setCreateLessonStatus(true)}} className="inputs_chat"><img src={more} /></button>
                                                    <div id="input_part">
                                                        <button id="input_emogi" onClick={() => { setEmogiBarStatus(true) }}>
                                                            <img src={emogi} />
                                                        </button>
                                                        <button id="input_color" onClick={() => { setChatColorStatus(true) }}>
                                                            <img src={chatColorsImages[chatColor]} />
                                                        </button>
                                                        <input type="text" value={inputMessage} onChange={(e) => { setInputMessage(e.target.value) }} />
                                                    </div>
                                                    <button id="input_submit" className="inputs_chat" onClick={() => { createMessage() }}><img src={submit} /></button>


                                                </div>

                                            </div> : <div></div>}
                                    </div>
                                    {!currentMemberId ?
                                        (<div id="groups_content_principal_members_part">
                                            <p>Lider:</p>
                                            {groupOwner}
                                            {currentGroupOwner == userId ? <button id="button_add_member" onClick={() => {
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

                                                {currentMemberGithub ?
                                                    <div id="member_github">
                                                        <p id="member_github_title">Github:</p>
                                                        <div id="member_github_principal">
                                                            <p>{
                                                                currentMemberGithub.length > 16 ?
                                                                    currentMemberGithub.slice(0, 14) + "..." :
                                                                    currentMemberGithub
                                                            }</p>
                                                            <button onClick={() => { navigator.clipboard.writeText(currentMemberGithub) }}>
                                                                <img src={copy_github} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    : null}
                                                {
                                                    currentMemberId != userId ?
                                                        (<>
                                                            <button id="button_report" onClick={() => { setReportUserStatus(true) }}><img src={report} />Denunciar</button>
                                                            {
                                                                currentGroupOwner == userId ?
                                                                    (<button id="button_kick" onClick={() => { setRemoveUserStatus(true) }}><img src={remove} />Expulsar</button>
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

                                            {usersInvited.length ?
                                                <div id="invited_users_bottom_list">
                                                    {usersInvited}
                                                </div>
                                                :
                                                <div id="not_invited">
                                                <img src={not_invited}  />
                                                <p>Sem usuários convidados</p>
                                                </div>}
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
                                        <button onClick={() => { changeChatColor("chatColor1") }}> <img src={chatColorsImages.chatColor1} /></button>
                                        <button onClick={() => { changeChatColor("chatColor2") }}> <img src={chatColorsImages.chatColor2} /></button>
                                        <button onClick={() => { changeChatColor("chatColor3") }}> <img src={chatColorsImages.chatColor3} /></button>
                                        <button onClick={() => { changeChatColor("chatColor4") }}> <img src={chatColorsImages.chatColor4} /></button>
                                        <button onClick={() => { changeChatColor("chatColor5") }}> <img src={chatColorsImages.chatColor5} /></button>
                                        <button onClick={() => { changeChatColor("chatColor6") }}> <img src={chatColorsImages.chatColor6} /></button>
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
                                        <input type="text" placeholder="Grupo..." value={createGroupName} onChange={(e) => { setCreateGroupName(e.target.value) }} />
                                        <label>Descrição</label>
                                        <input type="text"
                                        placeholder="Esse grupo..." value={createGroupDescription} onChange={(e) => { setCreateGroupDescription(e.target.value) }} />
                                        <button onClick={() => { createGroup() }}>Criar</button>
                                    </div>
                                </div>
                            </div>)
                            : null
                    }
                    {
                        aboutGroupStatus ? (
                            <div id="about_group_background" onClick={() => { setAboutGroupStatus(false) }}>
                                <div id="about_group_bar" onClick={(e) => { e.stopPropagation() }}>
                                    <div id="about_group_bar_top">
                                        <div id="about_group_bar_top_left">
                                            <img src={`data:image/png;base64,${currentGroupImage}`} />
                                        </div>
                                        <div id="about_group_bar_top_right">
                                            <div id="about_group_title_part">
                                                {/* <img src={group_icon}/> */}
                                                <div id="about_group_title_part_principal">
                                                    <h1>{currentGroupName}</h1>
                                                    {
                                                        currentGroupOwner == userId ?
                                                            <h2>você é o lider</h2>
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                            <p id="about_group_created_at">Criado: {currentGroupCreatedAt.split("-")[0] + "/" +
                                                currentGroupCreatedAt.split("-")[1] + "/" +
                                                currentGroupCreatedAt.split("-")[2].slice(0, 2)
                                            }</p>
                                            <div id="about_group_count_member">
                                                <img src={member_icon} />
                                                <p>Membros: {countMembers}</p>
                                            </div>
                                            {currentGroupOwner == userId ?
                                                <button id="edit_group_button" onClick={() => { setUpdateGroupStatus(true) }}>Configurações</button>
                                                :
                                                <button id="leave_group_button" onClick={() => { setLeaveGroupStatus(true) }}>Sair</button>
                                            }
                                        </div>
                                    </div>
                                    {
                                        !(
                                            (currentGroupLink1 == "" || currentGroupLink1 == " ")
                                            &&
                                            (currentGroupLink2 == "" || currentGroupLink2 == " ")
                                        ) ?
                                            (<div id="link_part">
                                                {
                                                    !((currentGroupLink1 == "" || currentGroupLink1 == " ")) ?
                                                        (<p>{currentGroupTitleLink1}: <span onClick={() => { window.location.href = currentGroupLink1 }}>{currentGroupLink1}</span></p>)
                                                        : null


                                                }

                                                {
                                                    !((currentGroupLink2 == "" || currentGroupLink2 == " ")) ?
                                                        (<p>{currentGroupTitleLink2}: <span onClick={() => { window.location.href = currentGroupLink2 }}>{currentGroupLink2}</span></p>)
                                                        : null
                                                }
                                            </div>) :
                                            <div id="about_group_no_link">
                                                Este grupo possui nenhum link
                                            </div>
                                    }
                                    <h2 id="about_group_title_description">Descrição:</h2>
                                    <p>{currentGroupDescription}</p>
                                </div>
                            </div>
                        ) : null
                    }
                    {
                        updateGroupStatus ?
                            <div id="update_group_background" onClick={() => { setUpdateGroupStatus(false) }}>
                                <div id="update_group_bar" onClick={(e) => { e.stopPropagation() }}>
                                    <div id="update_group_exit_part">
                                        <button id="update_group_leave" onClick={() => { setLeaveGroupStatus(true); }}>Sair e deletar</button>
                                        <button id="update_group_exit" onClick={() => { setUpdateGroupStatus(false) }}>X</button>
                                    </div>
                                    <div id="update_group_left">
                                        <h1>Configurar grupo</h1>
                                        <div id="update_group_image_part">
                                            <div>
                                                <img src={updateGroupImage} />
                                            </div>
                                            <button onClick={() => { updateAlterImageRef.current.click() }}>Alterar</button>
                                            <input type="file" style={{ display: "none" }} ref={updateAlterImageRef} onChange={(e) => { changeGroupImage(e) }} />
                                        </div>
                                        <div id="update_group_public_part">
                                    
                                        <input type="checkbox" checked={updateGroupIsPublic} onChange={()=>setUpdateGroupIsPublic(value=>{return !value})}/>
                                        
                                        <label>Grupo Público</label>
                                        </div>
                                    </div>
                                    <div id="update_group_right">
                                        <label>Nome</label>
                                        <input type="text" value={updateGroupName} onChange={(e) => { setUpdateGroupName(e.target.value) }} />

                                        <label>Descrição</label>
                                        <textarea value={updateGroupDescription} onChange={(e) => { setUpdateGroupDescription(e.target.value) }} />
                                    </div>
                                    <div id="update_group_bottom">
                                        <p>Título</p>
                                        <p>Link</p>
                                        <input placeholder="YouTube" value={updateGroupTitleLink1} onChange={(e) => { setUpdateGroupTitleLink1(e.target.value) }} />
                                        <input placeholder="https://www.youtube.com/..." value={updateGroupLink1} onChange={(e) => { setUpdateGroupLink1(e.target.value) }} />
                                        <input placeholder="Github" value={updateGroupTitleLink2} onChange={(e) => { setUpdateGroupTitleLink2(e.target.value) }} />
                                        <input placeholder="https://github.com/googleapis/..." value={updateGroupLink2} onChange={(e) => { setUpdateGroupLink2(e.target.value) }} />
                                    </div>
                                    <div id="update_group_apply_part">
                                        <button onClick={() => { cancelUpdateGroup() }} id="update_cancel">Cancelar</button>
                                        <button onClick={() => { updateGroup() }} id="update_apply">Aplicar</button>
                                    </div>
                                </div>
                            </div>
                            : null
                    }
                    {

                        leaveGroupStatus ?

                            <div id="leave_group_background" onClick={() => { setLeaveGroupStatus(false) }}>
                                <div id="leave_group_bar" onClick={(e) => { e.stopPropagation() }}>
                                    {
                                        currentGroupOwner == userId ?
                                            (
                                                <><p>Tem certeza de que quer sair e deletar o grupo:</p>
                                                    <p>{currentGroupName}</p>
                                                    <p id="delete_group_alert">Após deletar o grupo todos os usuários serão expulsos e nada do grupo será possível recuperar.</p>
                                                </>
                                            )
                                            :
                                            <>
                                                <p>Tem certeza de que quer sair do grupo:</p>
                                                <p>{currentGroupName}</p>
                                            </>
                                    }
                                    <div>
                                        <button id="leave_group_sure" onClick={() => { leaveGroup(userId == currentGroupOwner) }}>
                                            {
                                                currentGroupOwner == userId ?
                                                    "Sair e deletar"
                                                    :
                                                    "Sair"
                                            }
                                        </button>
                                        <button id="leave_group_cancel" onClick={() => { setLeaveGroupStatus(false) }}>Cancelar</button>
                                    </div>
                                </div>
                            </div>

                            : null
                    }
                    {
                        reportUserStatus ? (
                            <div id="report_user_background" onClick={() => { setReportUserStatus(false) }}>
                                <div id="report_user_bar" onClick={(e) => { e.stopPropagation() }}>
                                    <div id="report_user_top"><h2>Denunciar</h2></div>
                                    <div id="report_user_bottom">
                                        <div id="report_user_bottom_left">
                                            <div id="report_user_bottom_left_img">
                                                <img src={`data:image/png;base64,${currentMemberImage}`} />
                                            </div>
                                            <p>{currentMemberName}</p>
                                        </div>
                                        <div id="report_user_bottom_right">
                                            <p>Razão:</p>
                                            <textarea placeholder="Este usuário..." value={reportReason} onChange={(e) => { setReportReason(e.target.value) }} />
                                            <div id="report_user_bottom_right_buttons">
                                                <button id="report_cancel" onClick={() => { setReportUserStatus(false) }}>Cancel</button>
                                                <button id="report_button" onClick={() => { reportUser() }}>Denunciar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>) : null
                    }
                    {
                        removeUserStatus ? (
                            <div id="remove_user_background" onClick={(e) => { setRemoveUserStatus(false) }}>
                                <div id="remove_user_bar" onClick={(e) => { e.stopPropagation() }}>
                                    <h2>Remover</h2>
                                    <p>{currentMemberName}</p>
                                    <button id="remove_cancel" onClick={() => { setRemoveUserStatus(false) }}>Cancel</button>
                                    <button id="remove_button" onClick={() => { removeUser() }}>Remover</button>
                                </div>
                            </div>
                        ) : null
                    }
                    {
                        currentMessageId ? (
                            <div id="show_more_background" onClick={() => { setCurrentMessageId(null) }}>
                                <div id="show_more_bar" style={{ top: showMoreCoordinates[1] - 14, left: showMoreCoordinates[0] + 14 }} onClick={(e) => { e.stopPropagation() }}>
                                    
                                    {amIOwner?
                                    (<>
                                    <button onClick={() => { setUpdateMessageStatus(true) }}>Editar</button>
                                    <button onClick={() => { deleteMessage() }}>Deletar</button>
                                    </>):
                                    <button onClick={()=>{setReportMessageStatus(true)}}>Reportar</button>
                                    }
                                </div>
                            </div>
                        ) : null
                    }
                    {
                        updateMessageStatus ?
                            <div id="update_message_background" onClick={()=>{setUpdateMessageStatus(false)}}>
                                <div id="update_message_bar" onClick={(e)=>{e.stopPropagation()}}>
                                    <div id="update_message_bar_top"><p>Editar mensagem</p><button
                                    onClick={()=>{setUpdateMessageStatus(false);setCurrentMessageId(null)}}>X</button></div>
                                    <div id="update_message_bar_middle">
                                        
                                        <textarea type="text" onChange={(e)=>{setCurrentMessageValue(e.target.value)}} value={currentMessageValue}/>
                                    </div>
                                    <div id="update_message_bar_bottom">
                                        <button id="cancel_update_message" onClick={()=>{
                                            setUpdateMessageStatus(false)
                                            setCurrentMessageId(null)
                                        }}>Cancelar</button>
                                        <button id="apply_update_message" onClick={()=>{updateMessage()}}>Editar</button>
                                    </div>
                                </div>
                            </div> : null
                    }
                    {
                        reportMessageStatus?
                        <div id="report_message_background" onClick={()=>{setReportMessageStatus(false)}}>
                                <div id="report_message_bar" onClick={(e)=>{e.stopPropagation()}}>
                                    <div id="report_message_bar_top"><p>Reportar Messagem</p><button
                                    onClick={()=>{setReportMessageStatus(false);setCurrentMessageId(null)}}>X</button></div>
                                    <div id="report_message_bar_middle">
                                        
                                        <textarea type="text" onChange={(e)=>{setReportMessageReason(e.target.value)}} value={reportMessageReason}/>
                                    </div>
                                    <div id="report_message_bar_bottom">
                                        <button id="cancel_report_message" onClick={()=>{
                                            setReportMessageStatus(false)
                                            setCurrentMessageId(null)
                                        }}>Cancelar</button>
                                        <button id="apply_report_message" onClick={()=>{reportMessage()}}>Reportar</button>
                                    </div>
                                </div>
                            </div>
                        :null
                    }
                    {
                        createLessonStatus?
                        (<div id="create_lesson_background" onClick={()=>{setCreateLessonStatus(false)}}>
                            <div id="create_lesson_bar" onClick={(e)=>{e.stopPropagation()}}>
                                <div id="create_lesson_bar_title">
                                    <h1>Criar lição</h1>
                                    <button onClick={()=>{setCreateLessonStatus(false)}}>X</button>
                                </div>
                                <div id="create_lesson_bar_info">
                                    <label> Título da lição</label>
                                    <input placeholder="Lição de..." type="text" onChange={(e)=>{setCreateLessonName(e.target.value)}}/>
                                    <label>Descrição</label>
                                    <textarea placeholder="Essa lição..." onChange={(e)=>{setCreateLessonDescription(e.target.value)}}/>
                                </div>
                                <div id="create_lesson_bar_thumbnail">
                                    <div id="create_lesson_bar_thumbnail_title">
                                    <label>Thumbnail</label>
                                    </div>
                                    <div id="create_lesson_bar_thumbnail_principal">
                                    <img src={createLessonImage}/>
                                    </div>
                                    <button onClick={()=>{createLessonImageRef.current.click()}}>Mudar thumbnail</button>
                                    <input id="create_lesson_bar_thumbnail_input"type="file" ref={createLessonImageRef} onChange={(e)=>{setCreateLessonImageInput(e.target.files[0])}}/>
                                </div>
                                <div id="create_lesson_bar_tasks_title">
                                    <p id="create_tasks_button" onClick={()=>{setCreateTaskStatus(true)}}>+ Criar exercício</p>
                                    <p id="create_tasks_type">Tipo</p>
                                    <div></div>
                                </div>
                                <div id="create_lesson_bar_tasks"></div>
                                <div id="create_lesson_bar_buttons">
                               
                                    <button onClick={()=>{setCreateLessonStatus(false)}} id="cancel_lesson_button">Cancelar</button>
                                    <button onClick={()=>{}} id="create_lesson_button">Criar lição</button>
                                </div>
                            </div>

                        </div>)
                        :null
                    }
                    {
                        createTaskStatus?
                        (<div id="create_task_background" onClick={()=>{setCreateTaskStatus(false)}}>
                            <div id="create_task_bar" onClick={(e)=>{e.stopPropagation()}}>
                                <div id="create_task_bar_title">
                                    <h1>Criar exercício</h1>
                                    <button onClick={()=>{setCreateTaskStatus(false)}}>X</button>
                                </div>
                                <div id="create_task_bar_type_title">
                                   <p>Tipo:</p> <button onClick={()=>{setHelpTaskStatus(true)}}><img src={ajuda}/>Ajuda</button>
                                </div>
                                <div id="create_task_bar_type">
                                    <button onClick={()=>{setCreateTaskType("explanation")}}>Explicação
                                        <div><img src={explanation}/></div>
                                    </button>
                                    <button onClick={()=>{setCreateTaskType("select")}}>Selecionar
                                        <div><img src={select}/></div>
                                    </button>
                                    <button onClick={()=>{setCreateTaskType("free")}}>Código
                                        <div><img src={code}/></div>
                                    </button>
                                </div>
                                
                                    <div id="bar_task_create">
                                        {createTaskType=="explanation"?
                                            <div className="bar_task_create_note_red">
                                           <p> Este exercício não requer resposta do usuário</p>
                                        </div>:
                                    createTaskType=="select"?
                                    <div className="bar_task_create_note_blue">
                                           <p> Este exercício requer que o usuário selecione a opção correta</p>
                                        </div>:
                                    createTaskType=="free"?
                                    <div className="bar_task_create_note_blue">
                                           <p> Este exercício requer que o usuário escreva um código</p>
                                        </div>
                                    :null}
                                        <div id="bar_task_create_left">
                                            <h1>{
                                            createTaskType=="explanation"?
                                            "Explicação"
                                            :
                                            createTaskType=="select"?
                                            "Selecionar":
                                            createTaskType=="free"?
                                            "Código"
                                            :null
                                            }</h1>
                                        <label>Título</label>
                                        <input type="text" placeholder="Oque são as..." onChange={(e)=>{setCreateTaskTitle(e.target.value)}} value={createTaskTitle}/>
                                        <label>Descrição 1</label>
                                        <textarea placeholder="Essa lissão..." onChange={(e)=>{setCreateTaskDescription1(e.target.value)}} value={createTaskDescription1}/>
                                            
                                            {
                                                createTaskType=="select"?
                                                <>
                                                <label>Opções:</label>
                                            <div className="bar_task_option">
                                                <p>1</p>
                                                <input type="text"/>
                                            </div>
                                            <div className="bar_task_option">
                                                <p>2</p>
                                                <input type="text"/>
                                            </div>
                                            <div className="bar_task_option">
                                                <p>3</p>
                                                <input type="text"/>
                                            </div>
                                            <div className="bar_task_option">
                                                <p>4</p>
                                                <input type="text"/>
                                            </div>
                                            <div className="bar_task_option">
                                                <p>5</p>
                                                <input type="text"/>
                                            </div>
                                            <div className="bar_task_option">
                                                <p>6</p>
                                                <input type="text"/>
                                            </div>
                                            
                                            </>
                                            :null
                                            }

                                         {createTaskType!="select"?
                                            <><label>Descrição 2 <span>(opcional)</span></label>
                                        <textarea placeholder="Portanto..." onChange={(e)=>{setCreateTaskDescription2(e.target.value)}} value={createTaskDescription2}/>
                                        </>
                                        :null}
                                        </div>
                                            <div id="bar_task_create_right">
                                                 <input type="file" ref={createTaskImageRef} onChange={(e)=>{setCreateTaskImageInput(e.target.files[0])}}/>
                                                <label>Thumbnail<span>(opcional)</span></label>
                                            {
                                                createTaskImageInput?
                                                <>
                                                <div></div>
                                                <button onClick={()=>{createTaskImageRef.current.click()}}>
                                                    Mudar thumbnail
                                                </button>
                                                </>
                                                :
                                                <button onClick={()=>{createTaskImageRef.current.click()}}><img src={task_image}/></button>
                                            }
                                            

                                            <label>Código <span>(opcional)</span></label>
                                            <textarea placeholder="const a = ..." onChange={(e)=>{setCreateTaskCode(e.target.value)}} value={createTaskCode}/>
                                                                                     {createTaskType=="select"?
                                            <><label>Descrição 2 <span>(opcional)</span></label>
                                        <textarea placeholder="Portanto..." onChange={(e)=>{setCreateTaskDescription2(e.target.value)}} value={createTaskDescription2}/>
                                        </>
                                        :null}
                                            </div>
                                        </div>
                                    
                                
                                <div id="create_task_bar_buttons">
                                    <button id="cancel_task_button">Cancelar</button>
                                    <button id="create_task_button">Criar</button>
                                </div>
                            </div>
                        </div>)
                        :null
                    }
                    {
                        helpTaskStatus?
                        (<div id="help_task_background" onClick={()=>{setHelpTaskStatus(false)}}>
                            <div id="help_task_bar" onCanPlay={(e)=>{e.stopPropagation()}}>
                                
                            </div>
                        </div>)
                        :null
                    }

                </div>)
            }
        </div>
    )
}