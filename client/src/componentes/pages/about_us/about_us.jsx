import { BasicNavTop } from "../../components/basic_nav_top/basic_nav_top.jsx"
import {Footer} from "../../components/footer/footer.jsx"
import "./about_us.css"
import kangal from "../../../assets/all_pages/kangal.png"
import sign from "../../../assets/specific_page/about_us/sign.png"
import background from "../../../assets/specific_page/about_us/background2.jpg"
import index1 from "../../../assets/specific_page/about_us/index1.jpg"
import index2 from "../../../assets/specific_page/about_us/index2.jpg"
import index3 from "../../../assets/specific_page/about_us/index3.jpg"
import index4 from "../../../assets/specific_page/about_us/index4.jpg"
import { useEffect,useRef,useState,useCallback, use} from "react"
import {Link,useNavigate} from "react-router-dom"

export function AboutUs() {

    // const about_us = useRef()
    // const id1 = useRef()
    // const id2 = useRef()
    // const id3 = useRef()
    // const id4 = useRef()
    // useEffect(()=>{
    //     about_us.current.addEventListener("scroll",()=>{console.log("ESCROLOU")})
    // },[])

    return (
        <div id="about_us"  >
            <BasicNavTop contact={true} login={true}/>

            <div id="about_us_page1" >

                <div id="slogan_part">
                    <div id="slogan">
                        <h4 id="slogan_text_top">DA CURIOSIDADE AO CÓDIGO</h4>
                        <h2 id="slogan_text_core">Aprenda a colocar as suas ideias no mundo com a Kangal</h2>
                        <div id="slogan_buttons">
                            <button id="slogan_button_start" className="slogan_button">COMEÇAR AGORA</button>
                            <h5 className="slogan_button" id="slogan_button_enter"> Já tenho uma conta</h5>
                            <img src={sign} id="sign" />
                        </div>
                    </div>
                </div>
                <div id="kangal_parte">
                    <img src={kangal} id="kangal" />
                </div>
            </div>

            <div id="about_us_page2" >
                <div id="background">
                    <img src={background} id="background_image" draggable="false" />
                </div>
               <img src={index1} className="indexes" draggable="false"/>
               <img src={index2} className="indexes" draggable="false"/>
               <img src={index3} className="indexes" draggable="false"/>
               <img src={index4} className="indexes" draggable="false"/>
                <div id="about_us_principal">
                    <div id="about_us_texts">
                        <h3 id="about_us_text">Sobre <span id="about_us_text_green">nós</span></h3>
                        
                    </div>
                    <h4 id="about_us_text_core">
                        Na Kangal, acreditamos que programar deve ser acessível, divertido e transformador. Somos uma plataforma dedicada ao ensino de programação para todos, independentemente da idade ou experiência prévia.
                        Nosso objetivo é tornar o aprendizado simples e envolvente por meio de conteúdos interativos, exercícios práticos e jogos educativos. Valorizamos o ritmo de cada pessoa, respeitando sua individualidade e oferecendo caminhos personalizados para a evolução no mundo da tecnologia.
                        Mais do que ensinar, promovemos colaboração e troca de conhecimento. Nossa comunidade ativa permite a criação e compartilhamento de exercícios, grupos de estudos e desafios personalizados — tornando o processo de aprender mais dinâmico, coletivo e motivador.
                        Com a Kangal, aprender programação é só o começo. Aqui, você transforma curiosidade em habilidade, e ideias em projetos reais.
                    </h4>
                </div>
            </div>
            <Footer/>
        </div>
    )
}