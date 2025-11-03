import "./document.css"
export function Document({title,funcAlter,itemId}){
    return(
        <div className="document" onClick={()=>{funcAlter[0](itemId)}}>
            <div className="document_principal">
                <p>{title}</p>
            </div>
            
        </div>
    )
}