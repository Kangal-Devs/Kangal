import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import "./nav_left_list_item.css"
import { Member } from "../member/member"

export function NavLeftListItem({ userId, image, title, itemId, requestLocal, vars, code, funcAlter }) {

    const [owner, setOwner] = useState("")
 
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
            } else if (code == "groups") {
                funcAlter[0]()

                setTimeout(()=>{
                funcAlter[0](itemId)
                },100)
                
              
               
            }else if(code=="document"){

                funcAlter[0](itemId)
                funcAlter[1](null)
                
            }
            else if(campaign){
                funcAlter[0](itemId)
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