import "./groups.css"
import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import { TokenInvalid } from "../../components/token_invalid/token_invalid.jsx"
import { EnhancedNavTop } from "../../components/enhanced_nav_top/enhanced_nav_top.jsx"
import { Footer } from "../../components/footer/footer.jsx"
import { NavLeft } from "../../components/nav_left/nav_left.jsx"
import { useNavigate } from "react-router-dom"
import { Upgrade } from "../../components/upgrade/upgrade.jsx"
import { generateLevelTable } from "../../../levelGenerator.js"
import select_group from "../../../assets/specific_page/group/select_group.png"
export function Groups() {
    const [upgradeStatus, setUpgradeStatus] = useState('upgrade_background_inactive')


    const [currentGroupName, setCurrentGroupName] = useState("Group")

    const [groupsContentEmptyStatus,setGroupsContentEmptyStatus] = useState("groups_content_empty_active")
    const [groupsContentGroupStatus,setGroupsContentGroupStatus] = useState("groups_content_group_inactive")

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

    const [connected, setConnected] = useState(false)
    const [tokenError, setTokenError] = useState("")

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
                                    setGroupsContentGroupStatus

                                ]}
                            />
                            <div id={groupsContentGroupStatus}>
                                <div>
                                </div>
                                <div id="group_users_part">
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