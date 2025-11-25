import "./ranking_user.css"

export function RankingUser({name,i,xp}){
    return(
        <div className="ranking_user">
            <p>{i}</p>
            <p>{name}</p>
             <p>{xp}</p>
        </div>
    )
}