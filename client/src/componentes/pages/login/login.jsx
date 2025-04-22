import "./login.css"
import perspective_image1 from "../../../assets/specific_page/login/perspective_image1.png"
import perspective_image2 from "../../../assets/specific_page/login/perspective_image2.png"
import perspective_image3 from "../../../assets/specific_page/login/perspective_image3.png"
import kangal_logo from "../../../assets/specific_page/login/kangal_logo.png"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
export function Login() {
    const navigate = useNavigate()
    const [actualModeSignIn, setActualModeSignIn] = useState("login_signin_active")
    const [actualModeSignUp, setActualModeSignUp] = useState("login_signup_inactive")
    const [image, setImage] = useState(perspective_image1)

    const goAboutUs = useCallback(()=>{
        navigate("/")
    },[])

    const goSignUp = useCallback(() => {
        setActualModeSignIn("login_signin_inactive")
        setActualModeSignUp("login_signup_active")
    }, [])

    const goSignIn = useCallback(() => {
        setActualModeSignIn("login_signin_active")
        setActualModeSignUp("login_signup_inactive")
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setImage((prevImage) => {
                if (prevImage === perspective_image1) return perspective_image2;
                else if (prevImage === perspective_image2) return perspective_image3;
                else return perspective_image1;
            });
        }, 5000);

        return () => clearInterval(interval); // limpeza do intervalo
    }, []);
    return (
        <div id="login">
            <div id="login_image_part">
                <img onClick={goAboutUs}src={kangal_logo} id="login_image_kangal" draggable="false" />
                <img src={image} id="login_image_perspective" draggable="false" />
            </div>
            <div id="login_core_part">
                <div id={actualModeSignIn} className="signin_and_signup">
                    <h2> LOGIN</h2>
                    <p>Não possui conta? <span onClick={() => { goSignUp() }} style={{ color: '#4E89FF' }}>Cadastrar-se</span></p>
                    <div className="inputs">
                        <label> Usuário</label>
                        <input type="text" placeholder="Guest123" />
                    </div>
                    <div className="inputs">
                        <label>Email</label>
                        <input type="text" required="true" placeholder="Guest@gmail.com" />
                    </div>
                    <button> Entrar</button>
                    <div id="separator"></div>
                </div>
                <div id={actualModeSignUp}>
                    <h2> CADASTRAR-SE</h2>
                    <p>Já possui uma conta? <span onClick={() => { goSignIn() }} style={{ color: '#4E89FF' }}>Login</span></p>
                    <div className="inputs">
                        <label> Usuário</label>
                        <input type="text" placeholder="Guest123" />
                    </div>
                    <div className="inputs">
                        <label> Email</label>
                        <input type="text" placeholder="Guest123" />
                    </div>
                    <div className="inputs">
                        <label> Senha</label>
                        <input type="text" placeholder="Guest123" />
                    </div>
                    <div className="inputs">
                        <label> Confirmar senha</label>
                        <input type="text" placeholder="Guest123" />
                    </div>
                    <div className="inputs">
                        <label> Data de Nascimento</label>
                        <input type="date" />
                    </div>
                    <button>Cadastrar</button>
                </div>

            </div>
        </div>
    )
}