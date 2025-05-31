import { useEffect } from "react"
import "./nav_left_list_item.css"

export function NavLeftListItem({image,title,func}){
    useEffect(()=>{
        console.log(image)
    },[])
    return(
        <div id="nav_left_list_item" onClick={func}>
                <div id="nav_left_list_item_decoration"></div>
                <div id="nav_left_list_item_principal">
                    <img src={`data:image/png;base64,${image}`}/>
                    <p>{title}</p>
                </div>
        </div>
    )
}