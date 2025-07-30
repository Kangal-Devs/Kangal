// import "./groups.css"
// import axios from "axios"
// import { useState, useEffect, useCallback, } from "react"
// import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
// import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
// import { Footer } from "../../components/footer/footer.jsx"
// import { NavLeft } from "../../components/nav_left/nav_left.jsx"
// import { useNavigate } from "react-router-dom"
// import { Upgrade } from "../../components/upgrade/upgrade.jsx"
// import { generateLevelTable } from "../../../levelGenerator.js"
// import select_group from "../../../assets/specific_page/group/select_group.png"
// import { Member } from "../../components/member/member.jsx"
// import { Invited } from "../../components/invited/invited.jsx"
// import arrow from "../../../assets/specific_page/group/arrow.png"
// import submit from "../../../assets/specific_page/group/submit.png"
// import more from "../../../assets/specific_page/group/more.png"
// import emogi from "../../../assets/specific_page/group/emogi.png"
// import report from "../../../assets/specific_page/group/report.png"
// import remove from "../../../assets/specific_page/group/remove.png"
// import create_group from "../../../assets/specific_page/group/create_group1.png"
// import add_user from "../../../assets/specific_page/group/add_user.png"
// import lup from "../../../assets/specific_page/group/lup.png"
// import paper_error from "../../../assets/all_pages/error/paper_error.png"
// export function Groups() {
//     const [upgradeStatus, setUpgradeStatus] = useState('upgrade_background_inactive')


//     const [currentGroupName, setCurrentGroupName] = useState("Group")
//     const [currentGroupId,setCurrentGroupId] = useState("")

//     const [createLessonStatus, setCreateLessonStatus] = useState("group_lesson_background_active")

//     const [groupsContentUserStatus, setGroupsContentUserStatus] = useState("groups_content_inactive")
//     const [groupsContentEmptyStatus, setGroupsContentEmptyStatus] = useState("groups_content_empty_active")
//     const [groupsContentGroupStatus, setGroupsContentGroupStatus] = useState("groups_content_inactive")
//     const [groupMessages, setGroupMessages] = useState()
//     const [isGroupListActive, setIsGroupListActive] = useState(true)
//     const [isItMe, setIsItMe] = useState(false)
//     const [amIOwner, setAmIOwner] = useState(false)
//     const [userName, setUserName] = useState()
//     const [userEmail, setUserEmail] = useState()
//     const [userPassword, setUserPassword] = useState()
//     const [userXp, setUserXp] = useState()
//     const [userAccountType, setUserAccountType] = useState()
//     const [userDate, setUserDate] = useState()
//     const [userImage, setUserImage] = useState()
//     const [userGithub, setUserGithub] = useState()
//     const [userGender, setUserGender] = useState()
//     const [userId, setUserId] = useState()

//     const [removeMemberStatus,setRemoveMemberStatus] = useState(false)

//     const [groupUserIdSelected, setGroupUserIdSelected] = useState("")
//     const [groupUserNameSelected, setGroupUserNameSelected] = useState("")
//     const [groupUserImgSelected, setGroupUserImgSelected] = useState()
//     const [groupUserLevelSelected, setGroupUserLevelSelected] = useState()

//     const [levelWidth, setLevelWidth] = useState(0)
//     const [connected, setConnected] = useState(false)
//     const [tokenError, setTokenError] = useState("")

//     const [groupMembers, setGroupMembers] = useState()
//     const [groupOwner, setGroupOwner] = useState("")

//     //VARIAVEIS RELACIONADAS A CRIAÇÃO DE LIÇÃO E EXERCICIOS ABAIXO 

//     const [lessonName, setLessonName] = useState();
//     const [lessonDescription, setLessonDescription] = useState();

//     const [defaultThumbnail, setDefaultThumbnail] = useState();

//     const [createGroupStatus, setCreateGroupStatus] = useState(false)
//     const [reportStatus, setReportStatus] = useState(false)
//     const [inviteUserStatus, setInviteUserStatus] = useState(false)
//     const [createGroupName, setCreateGroupName] = useState("")
//     const [createGroupDescription, setCreateGroupDescription] = useState("")

//     const [searchUser,setSearchUser] = useState("")

//      const [createReportReason, setCreateReportReason] = useState("")

//     const [usersInvited,setUsersInvited] = useState()
//     const [usersSearched,setUsersSearched] = useState()
//     const get_solicitations = useCallback((isResetInput)=>{
  
//         // axios.post("http://localhost:5000/api/create_solicitation",{userId:userId,groupName:"KALAHARI"})
//         // .then((res)=>{console.log(res)})
//         // .catch((err)=>{console.log(err)})
        
//         axios.post("http://localhost:5000/api/group_solicitation",{_id:currentGroupId})
//         .then((res)=>{
//             if(res.data.message.length){
//                 console.log(res.data.message)
//                 Promise.all(res.data.message.map((user)=>{
//                     return axios.post("http://localhost:5000/api/get_user",{_id:user.user})
//                 }))
//                 .then((res2)=>{
//                     console.log(res2)
//                     setUsersInvited(res2.map((user1,i)=>{return <Invited key={"invited"+i} name={user1.data.message.name} image={user1.data.message.image} id={user1.data.message._id} toInvite={false} currentGroupId={currentGroupId}  get_solicitations={get_solicitations}/>}))
//                 })
//                 .catch((err)=>{
//                     console.log(err)
//                 })
//             }
//             else{
//                setUsersInvited(
//                 <div className="group_solicitation_empty">
//                 <img src={paper_error}/>
//                 <label>Este grupo não possui convites</label>
//                  </div>
//                )
//             }
//         })
//         .catch((err)=>{console.log(err)})

//         if(isResetInput){
//             setSearchUser("")
//         }
//     },[currentGroupId])
//     const search_users = useCallback(()=>{

//         axios.post(`http://localhost:5000/api/get_users_limit5`,{userName:searchUser})
//         .then((res)=>{
            
//             setUsersSearched(res.data.message.map((user,i)=>{
//                 return <Invited key={"toInvite"+i}id={user._id} 
//                 name={user.name} 
//                 image={user.image}
//                  toInvite={true} 
//                  currentGroupId={currentGroupId} 
//                  get_solicitations={get_solicitations} 
//                  setUsersSearched={setUsersSearched}/>
//             }))
//         })
//         .catch((err)=>{console.log(err)})
//     },[searchUser])

//     const createGroup = useCallback(() => {
//         console.log("OLA")
//         axios.post("http://localhost:5000/api/create_group", { name: createGroupName, description: createGroupDescription, owner: userId })
//             .then((res) => { console.log("criado") })
//             .catch((err) => { console.log(err) })
//     }, [createGroupName, createGroupDescription, userId])

//     const createReport = useCallback(() => {
//         axios.post("http://localhost:5000/api/create_report", { reporter: userId, reported: groupUserIdSelected, reason: createReportReason })
//             .then((res) => {
//                 setReportStatus(false)
//                 setCreateReportReason("")
//             })
//             .catch((err) => { console.log("não criado") })
//     }, [createReportReason, userId, groupUserIdSelected])

//     useEffect(() => {
//         axios.post("http://localhost:5000/api/authorization", {}, { withCredentials: true })
//             .then((res) => {
//                 console.log(res.data.message);
//                 setConnected(true)
//                 setUserName(res.data.message.name)
//                 setUserXp(res.data.message.xp)
//                 setUserEmail(res.data.message.email)
//                 setUserPassword(res.data.message.password)
//                 setUserAccountType(res.data.message.accountType)
//                 setUserDate(res.data.message.date)
//                 // setUserImage(res.data.message.image)
//                 setUserImage(localStorage.getItem("image"))
//                 setUserGithub(res.data.message.github)
//                 setUserGender(res.data.message.gender)
//                 setUserId(res.data.message._id)
//             })
//             .catch((err) => {
//                 console.log(err.response.data);
//                 setTokenError(err.response.data.message);
//                 localStorage.clear()
//             })
//     }, [])

//     const removeMember = useCallback(()=>{
//         // axios.delete(`http://localhost:5000/api/delete_user_group/${groupUserIdSelected}/${currentGroupId}`)
//         // .then((res)=>{
//         //     // setGroupMembers
//         //     axios.post("http://localhost:5000/get_all_user_group2",{_id:currentGroupId})
//         //     .then((res2)=>{
//         //             Promise.all(res2.data.message.map((user)=>{
//         //                 return axios.post("http://localhost:5000/api/get_user",{_id:user._id})
//         //             })).then((users)=>{
//         //                 setGroupMembers(users.map((user)=>{return <Member 
//         //                     isItMe={false} 
//         //                     id={user._id} 
//         //                     name={user.name} 
//         //                     image={user.image} 
//         //                     isOwner={false} 
//         //                     xp={user.xp}
//         //                     funcAlter={[
//         //                         setCurrentGroupName,
//         //                         setGroupsContentEmptyStatus,
//         //                         setGroupsContentGroupStatus,
//         //                         setGroupMembers,
//         //                         setGroupOwner,
//         //                         setIsGroupListActive,
//         //                         setGroupUserNameSelected,
//         //                         setGroupUserImgSelected,
//         //                         setGroupUserLevelSelected,
//         //                         setLevelWidth,
//         //                         setAmIOwner,
//         //                         setGroupUserIdSelected,
//         //                         setIsItMe,
//         //                         setCreateGroupStatus,
//         //                         setCurrentGroupId
//         //                     ]}/>}))
//         //             })  
//         //             .catch((err)=>{console.log(err)})
//         //     })
//         //     .catch((err)=>{
//         //         console.log(err)
//         //     })
//         // })
//         // .catch((err)=>{console.log(err)})
        
//         // setRemoveMemberStatus(false)
//     },[currentGroupId,groupUserIdSelected])

//     return (
//         <div id="groups">
//             {connected == false ? <TokenInvalid token_error={tokenError} /> :
//                 <div id="groups_principal">
//                     <EnhancedNavTop
//                         page={currentGroupName}
//                         home={true}
//                         group={true}
//                         userName={userName}
//                         userImage={userImage}
//                         userEmail={userEmail}
//                         userPassword={userPassword}
//                         userDate={userDate}
//                         userAccountType={userAccountType}
//                         userGithub={userGithub}
//                         userGender={userGender}
//                         userId={userId}

//                     />
//                     <div id="groups_content">

//                         <NavLeft

//                             requestType="groups"
//                             requestLocal="http://localhost:5000/api/get_all_user_group"
//                             listTitle="Grupos"
//                             userId={userId}
//                             topButtons={true}
//                             updateButton={true}
//                             local="group"
//                             code="group"
//                             upgradeFunction={setUpgradeStatus}
//                             vars={[
//                                 currentGroupName
//                             ]}
//                             funcAlter={[
//                                 setCurrentGroupName,
//                                 setGroupsContentEmptyStatus,
//                                 setGroupsContentGroupStatus,
//                                 setGroupMembers,
//                                 setGroupOwner,
//                                 setIsGroupListActive,
//                                 setGroupUserNameSelected,
//                                 setGroupUserImgSelected,
//                                 setGroupUserLevelSelected,
//                                 setLevelWidth,
//                                 setAmIOwner,
//                                 setGroupUserIdSelected,
//                                 setIsItMe,
//                                 setCreateGroupStatus,
//                                 setCurrentGroupId
//                             ]}
//                         />
                        
//                         <div id={groupsContentGroupStatus}>
//                             <div id="chat_part">
//                                 <div id="chat_part_messages">
//                                     {
//                                         groupMessages
//                                     }
//                                 </div>
//                                 {amIOwner ?
//                                     <div id="chat_part_input_active">
//                                         <div className="chat_part_input_icons">
//                                             <img src={more} />
//                                         </div>
//                                         <div id="chat_part_input_part">
//                                             <img src={emogi} />
//                                             <input type="text" />
//                                         </div>
//                                         <div className="chat_part_input_icons">
//                                             <img src={submit} />
//                                         </div>
//                                     </div>
//                                     :
//                                     <div id="chat_part_input_inactive">

//                                     </div>
//                                 }

//                             </div>
//                             <div id="group_users_part">
//                                 {
//                                     isGroupListActive ?
//                                         <><div id="group_owner">
//                                             <p>Owner:</p>
//                                             {groupOwner}
//                                         </div>
//                                             <div id="group_members">

//                                                 <p>Members:</p>
//                                                 {amIOwner ? (<button id="group_users_part_button_add_user" onClick={() => { setInviteUserStatus(true);get_solicitations() }}><img src={add_user} />Adicionar</button>) : null}
//                                                 {groupMembers}
//                                             </div></>
//                                         :

//                                         <div id="group_user">
//                                             <div id="group_user_top">
//                                                 <button onClick={() => {
//                                                     setIsGroupListActive(true)
//                                                 }}>
//                                                     <img src={arrow} draggable={false} />

//                                                 </button>
//                                             </div>
//                                             <div id="group_user_middle">
//                                                 <div id="group_user_img_selected"><img src={`data:image/png;base64,${groupUserImgSelected}`} draggable={false} /></div>
//                                                 <p id="group_user_name_selected">{groupUserNameSelected}</p>
//                                                 <p id="group_user_level_selected">Level: {groupUserLevelSelected} </p>
//                                                 <div id="group_user_level">
//                                                     <div style={{ width: levelWidth + "%" }}></div>
//                                                 </div>
//                                                 {!isItMe ? (
//                                                     <>
//                                                         <button className="group_user_buttons" id="group_user_button_report" onClick={() => { setReportStatus(true) }}>
//                                                             <img src={report} />
//                                                             Denunciar
//                                                         </button>
//                                                         {amIOwner ? (
//                                                             <button className="group_user_buttons" id="group_user_button_remove" onClick={()=>{setRemoveMemberStatus(true)}}>
//                                                                 <img src={remove} />
//                                                                 Expulsar
//                                                             </button>
//                                                         ) : null}
//                                                     </>
//                                                 ) : null}   </div>
//                                         </div>

//                                 }
//                             </div>
//                         </div>

//                         <div id={groupsContentEmptyStatus}>
//                             <img src={select_group} />
//                         </div>

//                     </div>



//                 </div>
//             }
//             {/* {amIOwner?
//                 <div id={createLessonStatus}>
//                         <div id="group_lesson_bar">
//                             <div id="group_lesson_bar_input_part">
//                                 <label>Nome da lição</label>
//                                 <input type="text" value={lessonName} onChange={(e)=>{setLessonName(e.target.value)}}/>
//                                 <label>Descrição</label>
//                                 <textarea></textarea>
//                             </div>
//                             <div id="group_lesson_bar_image_part">
//                                 <div id="group_lesson_bar_image_part_title">Thumbnail</div>
//                                 <div id="group_lesson_bar_image_part_img">
//                                     <img src="{}"/>
//                                 </div>
//                                 <button > MUDAR THUMBNAIL</button>
                                
//                             </div>
//                             <div id="group_lesson_bar_task_part">

//                             </div>
//                             <div id="group_lesson_bar_option_part">

//                             </div>
//                         </div>
                        
//                 </div>
//                 :<div></div>
//                 }    */}

//             {
//                 reportStatus ? (<div id="report_background" onClick={() => { setReportStatus(false) }}>
//                     <div id="report_bar" onClick={(e) => { e.stopPropagation() }}>

//                         <div id="report_bar_user">
//                             <div><img src={`data:image/png;base64,${groupUserImgSelected}`} draggable={false} />
//                             </div>
//                             <p>{groupUserNameSelected}</p>
//                         </div>

//                         <div id="report_bar_reason">
//                             <p>Motivo:</p>
//                             <textarea value={createReportReason} onChange={(e) => { setCreateReportReason(e.target.value) }} />
//                         </div>
//                         <div id="report_bar_buttons">
//                             <button id="report_button_cancel" onClick={() => { setReportStatus(false) }}> Cancelar</button>
//                             <button id="report_button_report" onClick={() => { createReport() }}>Denunciar</button>
//                         </div>
//                     </div>
//                 </div>) : null
//             }
//             {
//                 createGroupStatus ? (
//                     <div id="create_group_background" onClick={() => { setCreateGroupStatus(false) }}>
//                         <div id="create_group_bar" onClick={(e) => { e.stopPropagation() }}>
//                             <h3>Criar Grupo</h3>
//                             <label>Nome:</label>
//                             <input type="text" value={createGroupName} onChange={(e) => { setCreateGroupName(e.target.value) }} />
//                             <label>Descrição:</label>
//                             <textarea value={createGroupDescription} onChange={(e) => { setCreateGroupDescription(e.target.value) }} />
//                             <div>
//                                 <button id="create_group_button_cancel" onClick={() => { setCreateGroupStatus(false) }}> Cancelar</button>
//                                 <button id="create_group_button_create" onClick={() => { createGroup() }}> <img src={create_group} />Criar</button>
//                             </div>
//                         </div>
//                     </div>
//                 ) : null
//             }
//             {
//                 inviteUserStatus ? (<div id="invite_user_background" onClick={() => { setInviteUserStatus(false) }}>
//                     <div id="invite_user_bar" onClick={(e) => { e.stopPropagation() }}>
//                         <div id="invite_user_bar_invited">
//                             <div id="invite_user_bar_invited_top">Usuários Convidados</div>
//                             <div id="invite_user_bar_invited_bottom">
//                                 {
//                                     usersInvited
//                                 }
//                             </div>
//                         </div>
//                         <div id="invite_user_bar_decoration">
                            
//                         </div>
//                         <div id="invite_user_bar_invite">
//                             <div id="invite_user_bar_invite_top">
//                                 <h1>Convide Usuários</h1>
//                                 <label>Nome</label>
//                                 <div>
//                                     <input type="text" value={searchUser} onChange={(e)=>{setSearchUser(e.target.value)}}/>
//                                 <button>
//                                     <img src={lup} onClick={()=>{search_users()}}/>
//                                 </button>
//                                 </div>
//                             </div>
//                             <div id="invite_user_bar_invite_bottom">
//                              {
//                                 usersSearched
//                              }
                                   
//                             </div>
//                         </div>
//                     </div>
//                 </div>) : null
//             }

//             {
//                 removeMemberStatus?(
//                 <div id="remove_member_background" onClick={()=>{setRemoveMemberStatus(false)}}>
//                     <div onClick={(e)=>{e.stopPropagation()}}>
//                         <p>Remover:</p>
//                         <p>{groupUserNameSelected}</p>
//                         <div>
//                         <button id="remove_member_button_cancel" onClick={()=>{setRemoveMemberStatus(false)}}>Cancelar</button>
//                         <button id="remove_member_button_remove" onClick={()=>{removeMember()}}>Remover</button>
//                         </div>
//                     </div>
//                 </div>):null
//             }

//             <div id={upgradeStatus}>
//                 <Upgrade exitFunction={setUpgradeStatus} />
//             </div>
//         </div>
//     )
// }