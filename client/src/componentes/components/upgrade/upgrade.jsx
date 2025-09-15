import "./upgrade.css"
import master from "../../../assets/specific_page/upgrade/master.png"
import pro from "../../../assets/specific_page/upgrade/pro.png"

export function Upgrade({exitFunction}){



return(
 <div id="upgrade" onClick={()=>{exitFunction("upgrade_background_inactive")}}>
    <div id="upgrade_principal" onClick={(e)=>{e.stopPropagation()}}>
            <div id="upgrade_about">
                
                <div><h1>Planos</h1><button onClick={()=>{exitFunction("upgrade_background_inactive")}}>X</button></div>
                <p>Conheça os benefícios dos nossos planos </p>
            </div>
             <div id="upgrade_list">
                <div className="upgrade_item_background">
                    <div className="upgrade_item_bar">
                            <div className="upgrade_item_bar_top">
                                <h4>Básico</h4>
                                <h3>Grátis</h3>
                            </div>
                            <div className="upgrade_item_bar_bottom">
                                    <ul>
                                            <li>Criar até <span>5 Grupos</span></li>
                                            <li>Módulo liberado <span>Sem</span></li>
                                            <li>Jogos <span>Limitados</span></li>
                                            <li>Insígnia <span>Sem</span></li>
                                            <li>Sugestões<span>Bloqueada</span></li>
                                        </ul>
                            </div>
                    </div>
                    
                </div>
                <div className="upgrade_item_background">
                    <div className="upgrade_item_bar_main">
                        <p>Mais popular</p>
                            <div className="upgrade_item_bar_top">
                                 <div className="insignia_part"><img src={pro}/></div>
                                <h4>Pro</h4>
                                <h3>R$15<span>/mês</span></h3>
                            </div>
                            <div className="upgrade_item_bar_bottom">
                                    <ul>
                                            <li>Criar até <span>15 Grupos</span></li>
                                            <li>Módulo liberado <span>Python</span></li>
                                               <li>Jogos<span>Ilimitados</span></li>
                                            <li>Insígnia <span>Pro</span></li>
                                            <li>Segestões <span>Liberada</span></li>
                                           
                                        </ul>
                                        <button>Inscreva-se</button>
                            </div>
                    </div>
                    
                </div>
                <div className="upgrade_item_background">
                    <div className="upgrade_item_bar">
                            <div className="upgrade_item_bar_top">
                                <div className="insignia_part"><img src={master}/></div>
                                <h4>Master</h4>
                               
                                <h3>R$30<span>/mês</span></h3>
                            </div>
                            <div className="upgrade_item_bar_bottom">
                                    <ul>
                                            <li>Criar até <span>40 Grupos</span></li>
                                            <li>Módulo liberado <span>Todos</span></li>
                                             <li>Jogos<span>Ilimitados</span></li>
                                            <li>Insígnia <span>Master</span></li>
                                            <li>Sugestões<span>Liberada</span></li>
                                        </ul>
                                        <button>Inscreva-se</button>
                            </div>
                    </div>
                    
                </div>
                
             </div>
    </div>
 </div>   
)}