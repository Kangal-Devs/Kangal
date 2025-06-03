import "./upgrade.css"
import master from "../../../assets/specific_page/upgrade/master.png"
import pro from "../../../assets/specific_page/upgrade/pro.png"

export function Upgrade({exitFunction}){



return(
    <div id="upgrade">
        <button id="upgrade_exit_button" onClick={()=>{exitFunction('upgrade_background_inactive')}}>
            X
        </button>

        <div id="upgrade_list">
            <div className="upgrade_item">
                <h1>Básico</h1>
                <div className="upgrade_bar" style={{ backgroundColor:" rgba(255, 255, 255, 0.12)",border: "2px solid rgba(255, 255, 255, 0.12)"}}>
                    <div className="upgrade_bar_top">
                    <div className="upgrade_bar_top_insignia">
                  
                    </div>
                    <h3>Grátis</h3>
                    </div>

                    <div className="upgrade_bar_bottom">
                        <div>
                            <h4>Criar até</h4>
                            <p>5 Grupos</p>
                        </div>
                        <div>
                            <h4>Módulo liberado</h4>
                            <p>Sem</p>
                        </div>
                          <div>
                            <h4>Jogos</h4>
                            <p>Limitados</p>
                        </div>
                        <div>
                            <h4>Insígnia</h4>
                            <p>Sem</p>
                        </div>
                         <div>
                            <h4>Sugestões</h4>
                             <p>Bloqueada</p>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="upgrade_item">
                <h1>Pro</h1>
                <div className="upgrade_bar" style={{ backgroundColor:" rgb(207, 207, 207)",border: "2px solid rgb(207, 207, 207)"}}>
                    <div className="upgrade_bar_top">
                    <div className="upgrade_bar_top_insignia">
                    <img src={pro}/>
                    </div>
                    <h3>R$15<span>/mês</span></h3>
                    </div>

                    <div className="upgrade_bar_bottom">
                        <div>
                            <h4>Criar até</h4>
                            <p>15 Grupos</p>
                        </div>
                        <div>
                            <h4>Módulo liberado</h4>
                            <p>PYTHON</p>
                        </div>
                          <div>
                            <h4>Jogos</h4>
                            <p>Ilimitados</p>
                        </div>
                        <div>
                            <h4>Insígnia</h4>
                            <img src={pro}/>
                        </div>
                         <div>
                            <h4>Sugestões</h4>
                             <p>Liberado</p>
                        </div>
                        <button>Inscrever-se</button>
                    </div>
                </div>
            </div>
            
            <div className="upgrade_item">
                <h1>Pro+</h1>
                <div className="upgrade_bar" style={{ backgroundColor:" rgb(162, 201, 57)",border: "2px solid rgb(162, 201, 57)"}}>
                    <div className="upgrade_bar_top">
                    <div className="upgrade_bar_top_insignia">
                    <img src={pro}/>
                    </div>
                    <h3>R$120<span>/ano</span></h3>
                    </div>

                    <div className="upgrade_bar_bottom">
                        <div>
                            <h4>Criar até</h4>
                            <p>15 Grupos</p>
                        </div>
                        <div>
                            <h4>Módulo liberado</h4>
                            <p>PYTHON</p>
                        </div>
                          <div>
                            <h4>Jogos</h4>
                            <p>Ilimitados</p>
                        </div>
                        <div>
                            <h4>Insígnia</h4>
                            <img src={pro}/>
                        </div>
                         <div>
                            <h4>Sugestões</h4>
                             <p>Liberado</p>
                        </div>
                        <button>Inscrever-se</button>
                    </div>
                </div>
            </div>
            <div className="upgrade_item">
                <h1>Pro</h1>
                <div className="upgrade_bar" style={{ backgroundColor:" rgb(128, 90, 197)",border: "2px solid rgb(128, 90, 197)"}}>
                    <div className="upgrade_bar_top">
                    <div className="upgrade_bar_top_insignia">
                    <img src={pro}/>
                    </div>
                    <h3>R$30<span>/mês</span></h3>
                    </div>

                    <div className="upgrade_bar_bottom">
                        <div>
                            <h4>Criar até</h4>
                            <p>40 Grupos</p>
                        </div>
                        <div>
                            <h4>Módulo liberado</h4>
                            <p>TODOS</p>
                        </div>
                          <div>
                            <h4>Jogos</h4>
                            <p>Ilimitados</p>
                        </div>
                        <div>
                            <h4>Insígnia</h4>
                            <img src={master}/>
                        </div>
                         <div>
                            <h4>Sugestões</h4>
                             <p>Liberado</p>
                        </div>
                        <button>Inscrever-se</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}