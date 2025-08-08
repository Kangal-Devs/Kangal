import "./message.css"
export function Message({value,status,fontColor,backgroundColor}){
    return(
        <div className="message" style={{background:backgroundColor}}>
            <p style={{color:fontColor}}>{value}</p>
        </div>
    )
}