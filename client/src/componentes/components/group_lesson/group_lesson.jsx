import { useEffect ,useState} from "react";
import "./group_lesson.css"
import axios from "axios"
export function GroupLesson({image,userId,amIOwner,owner,itemId,name,funcAlter}){

    const [didLesson,setDidLesson] = useState(false)
    useEffect(()=>{
        if(amIOwner==false){

            axios.get(`http://localhost:5000/api/get_user_group_lesson/${itemId}/${userId}`)
            .then((res)=>{
                if(res.data.message){
                    setDidLesson(true)
                }
                else{
                    setDidLesson(false)
                }
            })
            .catch((err)=>{console.log(err)})
        }
        
    },[owner])
    return(
        <div className="group_lesson">
            <div className="group_lesson_top">
                <img src={`data:image/png;base64,${image}`}/>
            </div>
            <div className="group_lesson_bottom">
            <p >{name}</p>
            {amIOwner?
            <button className="group_lesson_about"onClick={()=>{funcAlter[1](itemId)}}>Sobre</button>:
             didLesson?
             <button className="group_lesson_did">Lição feita</button>:
             <button className="group_lesson_to_do" onClick={()=>{funcAlter[0](itemId)}}>Começar</button>
            }
            </div>
        </div>
    )
} 