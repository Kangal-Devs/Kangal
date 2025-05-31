import "./login.css"
import perspective_image1 from "../../../assets/specific_page/login/perspective_image1.png"
import perspective_image2 from "../../../assets/specific_page/login/perspective_image2.png"
import perspective_image3 from "../../../assets/specific_page/login/perspective_image3.png"
import kangal_logo from "../../../assets/specific_page/login/kangal_logo.png"
import {Alert} from "../../components/alert/alert.jsx"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import google_img from "../../../assets/specific_page/login/google_img.png"

import { useState, useEffect, useCallback } from "react"

const errorTypes = {
    "errorType1":"Campo nome é obrigatório",
    "errorType2":"Nome muito pequeno",
    "errorType3":"Nome muito grande",
    "errorType4":"Nome já é usado",
    "errorType5":"Campo nome possui palavra proibida",
    "errorType6":"Campo email é obrigatório",
    "errorType7":"Email muito pequeno",
    "errorType8":"Email muito grande",
    "errorType9":"Email já é usado",
    "errorType-10":"Campo email possui palavra proibida",
    "errorType-11":"ERRO INTERNO: xp é obrigatório",
    "errorType-12":"Campo senha é obrigatório",
    "errorType-13":"Senha muito fraca",
    "errorType-14":"ERRO INTERNO: tipo de conta é obrigatório",
    "errorType-15":"Campo date é obrigatório",
    "errorType-16":"Nome ou senha incorreto",
    "errorType-17":"ERRO INTERNO: problema ao fazer login",
    "errorType-18":"Senha de confirmação incorreta",
    "date: Cast to date failed for value":"campo data é obrigatório",
    "errorType-19":"ERRO INTERNO: imagem é obrigatória",
}

export function Login() {
    const [continueGoogleLogin,setContinueGoogleLogin] = useState("continue_google_login_inactive")
          

          //VALORES DOS INPUTS DE SIGNIN
    const[signinName,setSigninName] = useState("")
    const[signinPassword,setSigninPassword] = useState("")
          //VALORES DOS INPUTS DE SIGNUP
    const[signupName,setSignupName] = useState("")
    const[signupPassword,setSignupPassword] = useState("")
    const[signupPasswordConfirmation,setSignupPasswordConfirmation] = useState("")
    const[signupEmail,setSignupEmail] = useState("")
    const[signupDate,setSignupDate] = useState("")

    const navigate = useNavigate()
    const [actualModeSignIn, setActualModeSignIn] = useState("login_signin_active")
    const [actualModeSignUp, setActualModeSignUp] = useState("login_signup_inactive")
    const [image, setImage] = useState(perspective_image1)

//VALORES DOS INPUTS DE SIGNUP GOOGLE
const [signupNameGoogle,setSignupNameGoogle] = useState("")
const [signupEmailGoogle,setSignupEmailGoogle] = useState("")

      const [alertMessage,setAlertMessage] = useState("")
      const [alertError,setAlertError] = useState(false)
      const [alertStatus,setAlertStatus] = useState("alert_inactive")

      useEffect(()=>{
        axios.post("http://localhost:5000/api/authorization",{},{withCredentials:true})
        .then(()=>{navigate("/home")})

      },[])
        const showAlert = useCallback((errorType)=>{
            console.log(errorType)
            setAlertStatus("alert_active")
            setAlertError(true)
            Object.keys(errorTypes).forEach((error)=>{if(errorType.includes(error)){console.log(errorTypes[error]);setAlertMessage(errorTypes[error])}})
         
            setTimeout(()=>{
                 setAlertStatus("alert_inactive")
            },3000)
        },[alertMessage,alertError,alertStatus])
      
        const googleLogin = useGoogleLogin({
            onSuccess: async (tokenResponse) => {
              try {
                // Pega os dados do perfil com o access_token
                const res1= await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                  headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                  },
                });
        
                console.log("Informações do usuário:", res1.data);

                axios.post("http://localhost:5000/api/email_verification",{email:res1.data.email},{withCredentials:true})
                .then((res2)=>{
                    if(res2.data.message=='email not used'){
                    setContinueGoogleLogin("continue_google_login_active")
                    setSignupNameGoogle(res1.data.name)
                    setSignupEmailGoogle(res1.data.email)
                    }
                    else{
                        localStorage.setItem("image",res2.data.image)
                        console.log("Parece que seu email google já é cadastrado")
                        navigate("/home")
                    }
                })
                .catch((err)=>{showAlert(err.response.data)})

              } catch (err) {
                console.error("Erro ao buscar perfil do Google:", err);
              }
            },
            onError: () => {
              console.log("Erro ao fazer login com o Google");
            },
          });


         

    
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

    const commonLogin = useCallback(()=>{
        axios.post("http://localhost:5000/api/signin",{name:signinName,password:signinPassword},{withCredentials:true})
        .then((res)=>{
            //  axios.post("http://localhost:5000/api/authorization",{},{withCredentials:true})
                        // .then((res)=>{
                            localStorage.setItem("image",res.data.image)
                            navigate("/home")})
                        // .catch((err)=>{
                            
                        //     showAlert(err.response.data.message)})

        // })
        .catch((err)=>{showAlert(err.response.data.message)})
    },[signinName,signinPassword])

    const createAccountCommon = useCallback(()=>{
    
        if(signupPassword != signupPasswordConfirmation){
            showAlert("errorType-18")
        }
        else{
            
            axios.post("http://localhost:5000/api/signup",
                {accountType:"common",
                password:signupPassword,
                email:signupEmail,
                date:signupDate,
                name:signupName

            },{withCredentials:true})
            .then((res)=>{ 
                localStorage.setItem("image",res.data.image)
                navigate("/home")})
            .catch((err)=>{showAlert(err.response.data.message)})
        }

    },[signupName,signupPassword,signupEmail,signupDate,signupPasswordConfirmation])


    const createAccountGoogle = useCallback(()=>{
        console.log(signupNameGoogle)
        console.log(signupEmailGoogle)
        axios.post("http://localhost:5000/api/signup",

            {accountType:"google",
            name:signupNameGoogle,
            password:"patternPassword123!",
            date:"1999-10-10",
            email:signupEmailGoogle},{withCredentials:true})
        .then((res)=>{ 
            localStorage.setItem("image",res.data.image)
            navigate("/home")})
        .catch((err)=>{showAlert(err.response.data.message)})

    },[signupNameGoogle,signupEmailGoogle])

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
                        <input type="text" maxLength={15} placeholder="Guest123" value={signinName} onChange={(e)=>{setSigninName(e.target.value)}}/>
                    </div>
                    <div className="inputs">
                        <label>Senha</label>
                        <input type="text" placeholder="********" value={signinPassword} onChange={(e)=>{setSigninPassword(e.target.value)}} />
                    </div>
                    <button id="sign_button" onClick={()=>{commonLogin()}}> Entrar</button>
                    <div id="separator"></div>
                    <button className="google_button" onClick={()=>{ googleLogin()}}> <img src={google_img} className="google_img"/> GOOGLE</button>
                </div>
                <div id={actualModeSignUp}>
                    <h2> CADASTRAR-SE</h2>
                    <p>Já possui uma conta? <span onClick={() => { goSignIn() }} style={{ color: '#4E89FF' }}>Login</span></p>
                    <div className="inputs">
                        <label> Usuário</label>
                        <input type="text" maxLength={15} placeholder="Guest123" value={signupName} onChange={(e)=>{setSignupName(e.target.value)}} />
                    </div>
                    <div className="inputs">
                        <label> Email</label>
                        <input type="text" placeholder="Guest123" value={signupEmail} onChange={(e)=>{setSignupEmail(e.target.value)}}/>
                    </div>
                    <div className="inputs">
                        <label> Senha</label>
                        <input type="text" placeholder="Guest123" value={signupPassword} onChange={(e)=>{setSignupPassword(e.target.value)}}/>
                    </div>
                    <div className="inputs">
                        <label> Confirmar senha</label>
                        <input type="text" placeholder="Guest123" value={signupPasswordConfirmation} onChange={(e)=>{setSignupPasswordConfirmation(e.target.value)}}/>
                    </div>
                    <div className="inputs">
                        <label> Data de Nascimento</label>
                        <input type="date" value={signupDate} onChange={(e)=>{setSignupDate(e.target.value)}}/>
                    </div>
                    <button id="signup_button" onClick={()=>{createAccountCommon()}}>Cadastrar</button>
                    <button className="google_button" onClick={()=>{ googleLogin()}}> <img src={google_img} className="google_img"/>GOOGLE</button>
                </div>

            </div>
            <div id={continueGoogleLogin}> 
                <span onClick={()=>{setContinueGoogleLogin("continue_google_login_inactive")}}> X</span>
                <div id="continue_google_login_bar">
                    <label>Usuário</label>
                    <input value={signupNameGoogle} onChange={(e)=>{setSignupNameGoogle(e.target.value)}}type="text" maxLength={15} placeholder="Guest123"/>
                    <button onClick={()=>{createAccountGoogle()}}> Cadastrar</button>
                </div>
            </div>
            <div id={alertStatus}>
              <Alert message={alertMessage} error={alertError}/>
              </div>
        </div>
      
    )
}