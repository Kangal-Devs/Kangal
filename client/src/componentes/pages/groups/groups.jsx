import "./groups.css"
import axios from "axios"
import { useState, useEffect, useCallback, use } from "react"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import { Footer } from "../../components/footer/footer.jsx"
import { NavLeft } from "../../components/nav_left/nav_left.jsx"
import { useNavigate } from "react-router-dom"
import { Upgrade } from "../../components/upgrade/upgrade.jsx"
import { generateLevelTable } from "../../../levelGenerator.js"
import select_group from "../../../assets/specific_page/group/select_group.png"
import { Member } from "../../components/member/member.jsx"
import arrow from "../../../assets/specific_page/group/arrow.png"
import submit from "../../../assets/specific_page/group/submit.png"
import more from "../../../assets/specific_page/group/more.png"
import emogi from "../../../assets/specific_page/group/emogi.png"
export function Groups() {
    const [upgradeStatus, setUpgradeStatus] = useState('upgrade_background_inactive')


    const [currentGroupName, setCurrentGroupName] = useState("Group")

    const [groupsContentUserStatus,setGroupsContentUserStatus] = useState("groups_content_inactive")
    const [groupsContentEmptyStatus,setGroupsContentEmptyStatus] = useState("groups_content_empty_active")
    const [groupsContentGroupStatus,setGroupsContentGroupStatus] = useState("groups_content_inactive")
    const [groupMessages, setGroupMessages] = useState()
    const [isGroupListActive,setIsGroupListActive] = useState(true)
    const [amIOwner,setAmIOwner] = useState(false)
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

    const [groupUserNameSelected,setGroupUserNameSelected] = useState("")
    const [groupUserImgSelected,setGroupUserImgSelected] = useState()
    const [groupUserLevelSelected,setGroupUserLevelSelected] = useState()

    const [levelWidth,setLevelWidth] = useState(0)
    const [connected, setConnected] = useState(false)
    const [tokenError, setTokenError] = useState("")

    const [groupMembers,setGroupMembers] = useState()
    const [groupOwner,setGroupOwner] = useState("")

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
            })
            .catch((err) => {
                console.log(err.response.data);
                setTokenError(err.response.data.message);
                localStorage.clear()
            })
    }, [])

    return (
        <div id="groups">
            {connected == false ? <TokenInvalid token_error={tokenError} /> : 
                <div id="groups_principal">
                <EnhancedNavTop
                            page={currentGroupName}
                            home={true}
                            group={true}
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
                                local="group"
                                code="group"
                                upgradeFunction={setUpgradeStatus}
                                vars={[
                                    currentGroupName
                                ]}
                                funcAlter={[
                                    setCurrentGroupName,
                                    setGroupsContentEmptyStatus,
                                    setGroupsContentGroupStatus,
                                    setGroupMembers,
                                    setGroupOwner,
                                    setIsGroupListActive,
                                    setGroupUserNameSelected,
                                    setGroupUserImgSelected,
                                    setGroupUserLevelSelected,
                                    setLevelWidth,
                                    setAmIOwner
                                ]}
                            />
                            <div id={groupsContentGroupStatus}>
                                <div id="chat_part">
                                   <div id="chat_part_messages">
                                        {
                                            groupMessages
                                        }
                                    </div>
                                    {amIOwner?
                                     <div id="chat_part_input_active">
                                        <div className="chat_part_input_icons">
                                            <img src={more}/>
                                        </div>
                                        <div id="chat_part_input_part">
                                            <img src={emogi}/>
                                            <input type="text"/>
                                        </div>
                                         <div className="chat_part_input_icons">
                                            <img src={submit}/>
                                        </div>
                                    </div>
                                    :
                                     <div  id="chat_part_input_inactive">

                                    </div>
                                    }
                                    
                                </div>
                                <div id="group_users_part">
                                    {
                                        isGroupListActive?
                                        <><div id="group_owner">
                                    <p>Owner:</p>
                                    {groupOwner}
                                    </div>
                                    <div id="group_members">
                                          <p>Members:</p>
                                    {groupMembers}
                                    </div></>
                                    :

                                    <div id="group_user">
                                        <div id="group_user_top">
                                        <button onClick={()=>{
                                            setIsGroupListActive(true)
                                        }}>
                                           <img src={arrow} draggable={false}/>

                                        </button>
                                        </div>
                                        <div id="group_user_middle">
                                        <div id="group_user_img_selected"><img src={`data:image/png;base64,${groupUserImgSelected}`} draggable={false}/></div>
                                        <p id="group_user_name_selected">{groupUserNameSelected}</p>
                                        <p id="group_user_level_selected">Level: {groupUserLevelSelected} </p>
                                        <div id="group_user_level">
                                            <div style={{ width: levelWidth + "%" }}></div>
                                        </div>
                                            </div>
                                    </div>
                                   
                                    }
                                </div>
                            </div>
                          
                            <div id={groupsContentEmptyStatus}>
                                <img src={select_group}/>
                            </div>
                            
                        </div>
                
                
                
                </div>
                }

                <div id={upgradeStatus}>
                        <Upgrade exitFunction={setUpgradeStatus}/>
                        </div>
        </div>
    )
}