import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import "./nav_left_list_item.css"
import { Member } from "../member/member"

export function NavLeftListItem({ userId, image, title, itemId, requestLocal, vars, code, funcAlter }) {

    const [owner, setOwner] = useState("")

    useEffect(() => {
        if (code == "group") {
            axios.post("http://localhost:5000/api/get_group", { _id: itemId })
                .then((res) => {
                    setOwner(res.data.message.owner)
                })
                .catch((err) => { console.log(err) })
        }
    }, [])

    

    return (
        <div className="nav_left_list_item" onClick={() => {
            if (code == "home") {
                axios.post("http://localhost:5000/api/get_group", { _id: itemId })
                    .then((res) => {

                        funcAlter[0]("accept_solicitation_active")
                        funcAlter[1](res.data.message.name)
                        funcAlter[2](res.data.message.description)

                        funcAlter[4](res.data.message.image)
                        funcAlter[5](itemId)

                        axios.post("http://localhost:5000/api/get_user", { _id: res.data.message.owner })
                            .then((res1) => {
                                funcAlter[3](res1.data.message.name)
                            })
                            .catch((err) => { funcAlter[3]("[user not found]") })

                    })
                    .catch((err) => { console.log(err) })
            } else if (code == "group") {

                funcAlter[0]("Group/" + title)
                funcAlter[1]("groups_content_inactive")
                funcAlter[2]("groups_content_group_active")
                funcAlter[4]("")
                funcAlter[3]("")
                funcAlter[5](true)
                funcAlter[14](itemId)
                axios.post("http://localhost:5000/api/get_group", { _id: itemId })
                    .then((res) => {
                        if (res.data.message.owner == userId) {
                            funcAlter[10](true)
                        }
                        else {
                            funcAlter[10](false)
                        }
                    })
                    .catch((err) => { console.log(err) })

                axios.post("http://localhost:5000/api/get_all_user_group2", { _id: itemId })
                    .then((res) => {
                        Promise.all(res.data.message.map((relation) => { return axios.post("http://localhost:5000/api/get_user", { _id: relation.user }) }))
                            .then((res2) => {

                                funcAlter[4](res2.map((item, i) => {
                                    if (item.data.message._id == owner) {
                                        if (item.data.message._id == userId) {
                                            return <Member
                                                isOwner={true}
                                                isItMe={true}
                                                image={item.data.message.image}
                                                name={item.data.message.name}
                                                xp={item.data.message.xp}
                                                gender={item.data.message.gender}
                                                id={item.data.message._id}
                                                funcAlter={funcAlter}
                                            />
                                        }
                                        else {
                                            return <Member
                                                isOwner={true}
                                                isItMe={false}
                                                image={item.data.message.image}
                                                name={item.data.message.name}
                                                xp={item.data.message.xp}
                                                gender={item.data.message.gender}
                                                id={item.data.message._id}
                                                funcAlter={funcAlter}
                                            />
                                        }
                                    }
                                }))
                                funcAlter[3](res2.map((item, i) => {
                                    if (item.data.message._id != owner) {
                                        if (item.data.message._id == userId) {
                                            return <Member
                                                isItMe={true}
                                                isOwner={false}
                                                image={item.data.message.image}
                                                name={item.data.message.name}
                                                xp={item.data.message.xp}
                                                gender={item.data.message.gender}
                                                id={item.data.message._id}
                                                funcAlter={funcAlter}
                                            />
                                        } else {
                                            return <Member
                                                isOwner={false}
                                                isItMe={false}
                                                image={item.data.message.image}
                                                name={item.data.message.name}
                                                xp={item.data.message.xp}
                                                gender={item.data.message.gender}
                                                id={item.data.message._id}
                                                funcAlter={funcAlter}
                                            />
                                        }
                                    }
                                }))
                            })
                            .catch((err) => { console.log(err) })

                    })
                    .catch((err) => { console.log(err) })
            }
        }}>
            <div className="nav_left_list_item_decoration"></div>
            <div className="nav_left_list_item_principal">
                <img src={`data:image/png;base64,${image}`} />
                <p>{title.length >= 10 ? title.slice(0, 10) + "..." : title}</p>

            </div>
        </div>
    )
}