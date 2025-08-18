import "./common_lesson.css"
import common_lesson_blocked from "../../../assets/specific_page/campaign/common_lesson_blocked.png"
export function CommonLesson({itemId,color,name,introduction,blocked,image,funcAlter}){
    return(
        <>
        {!blocked?(
            <div className="common_lesson" style={{color:color}} onClick={(e)=>{
                e.stopPropagation()
                funcAlter[0](itemId)
            }}>
            <img src={`data:image/png;base64,${image}`}/>
            <h1>{name}</h1>
        </div>)
        :
        (
        <div className="common_lesson_blocked" style={{color:"gray"}}>
            <img src={common_lesson_blocked}/>
            <h1>{name}</h1>
        </div>)}
        </>
    )
}