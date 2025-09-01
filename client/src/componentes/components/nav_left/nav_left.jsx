import "./nav_left.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import controller_button from "../../../assets/all_pages/nav_left_icons/controller_button.png"
import documents_button from "../../../assets/all_pages/nav_left_icons/documents_button.png"
import group_button from "../../../assets/all_pages/nav_left_icons/group_button.png"
import trophy_button from "../../../assets/all_pages/nav_left_icons/trophy_button.png"

import controller_button_selected from "../../../assets/all_pages/nav_left_icons/controller_button_selected.png"
import documents_button_selected from "../../../assets/all_pages/nav_left_icons/documents_button_selected.png"
import group_button_selected from "../../../assets/all_pages/nav_left_icons/group_button_selected.png"
import trophy_button_selected from "../../../assets/all_pages/nav_left_icons/trophy_button_selected.png"

import controller_button_selecting from "../../../assets/all_pages/nav_left_icons/controller_button_selecting.png"
import documents_button_selecting from "../../../assets/all_pages/nav_left_icons/documents_button_selecting.png"
import group_button_selecting from "../../../assets/all_pages/nav_left_icons/group_button_selecting.png"
import trophy_button_selecting from "../../../assets/all_pages/nav_left_icons/trophy_button_selecting.png"

import { useEffect, useState, useCallback } from "react"
import { NavLeftListItem } from "../nav_left_list_item/nav_left_list_item.jsx"
import paper_error from "../../../assets/all_pages/error/paper_error.png"
import create_group from "../../../assets/specific_page/group/create_group1.png"

export function NavLeft({ userId, topButtons,updateButton,local,listTitle,requestLocal,requestType ,upgradeFunction,funcAlter,vars,code}) {

   
    const navigate = useNavigate()
    const [list,setList] = useState([])

    const [borders, setBorders] = useState(['white','white','white','white'])

    const [buttonController, setButtonController] = useState(controller_button)
    const [buttonDocuments, setButtonDocuments] = useState(documents_button)
    const [buttonGroup, setButtonGroup] = useState(group_button)
    const [buttonTrophy, setButtonTrophy] = useState(trophy_button)

    useEffect(()=>{
   switch(local){
        case 'game':
        setButtonController(controller_button_selected)
       
        setBorders(['#808080ff','transparent','transparent','transparent'])
        break;
       
        
        case 'documents':
        setButtonDocuments(documents_button_selected)
     
         setBorders(['transparent','#808080ff','transparent','transparent'])
        break;
         case 'groups':
        setButtonGroup(group_button_selected)
           setBorders(['transparent','transparent','#808080ff','transparent'])
        break;
        case 'campaign':
        setButtonTrophy(trophy_button_selected)
        setBorders(['transparent','transparent','transparent','#808080ff'])
        break;
        default:
          setBorders(['transparent','transparent','transparent','transparent'])
        break;
    }
    },[])
    
   useEffect(() => {
    if(requestType == "solicitations"){
  if (requestLocal) {
    axios.post(requestLocal, { _id: userId })
      .then((res) => {
        const arr_list = res.data.message;

        if (arr_list.length !== 0) {
          // Mapeia para um array de Promises
          const promises = arr_list.map((item) => {
            return axios.post("http://localhost:5000/api/get_group", { _id: item.group })
              .then((res1) => ({
                
                title: res1.data.message.name,
                image: res1.data.message.image,
                _id:   res1.data.message._id,
                owner: res1.data.message.owner
              }));
          });

          // Espera todas as requisições terminarem
          Promise.all(promises).then((results) => {
            // Agora você tem todos os dados, então atualiza o estado
            
            setList(
              results.map((item, i) => (
                <NavLeftListItem key={i}
                  title={item.title}
                   image={item.image}
                   userId={userId}
                    itemId={item._id}
                    owner={item.owner} 

                      code={code}
                      funcAlter={funcAlter}
       
                      
                      />
              ))
            );
          });
        } else {
          console.log("Você não possui solicitações");
          setList(<><img src={paper_error} id="paper_error"/><p id="text_error">Você não possui solicitações</p></>)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }}
  else if(requestType=="groups"){
      axios.post("http://localhost:5000/api/get_all_user_group",{_id:userId})
      .then((res)=>{
        console.log(res)
        Promise.all(res.data.message.map((item)=>{
            return axios.post("http://localhost:5000/api/get_group",{_id:item.group})
          }))
          .then((res2)=>{
            console.log("passei aqui")
             setList(res2.map((group,i)=>{return <NavLeftListItem 
              key={i+"G"} 
              title={group.data.message.name}
              image={group.data.message.image}
              itemId={group.data.message._id}
              funcAlter={funcAlter}
              vars={vars}
              code="groups"
              />}))
          })
          .catch((err2)=>{console.log(err2)})
      })
      .catch((err)=>console.log(err))
  }
else if(requestType=="documents"){
  axios.get(requestLocal)
  .then((res)=>{
    setList(res.data.message.map((subject,i)=>{
      return <NavLeftListItem 
      key={"D"+i}
      vars={vars}
       userId={userId} 
       image={subject.image} 
       title={subject.name} 
       itemId={subject._id}
       code={code}
      funcAlter={funcAlter}
      />
    }))
  })
  .catch((err)=>{console.log(err)})
}
else if(requestType=="campaign"){
  axios.get(requestLocal)
  .then((res)=>{
    setList(res.data.message.map((module,i)=>{
      return <NavLeftListItem 
      key={"C"+i}
      vars={vars}
       userId={userId} 
       image={module.image} 
       title={module.name} 
       itemId={module._id}
       code={code}
      funcAlter={funcAlter}
      />
    }))
  })
  .catch((err)=>{console.log(err)})
}

}, []);
   



    return (
        <div id="nav_left">
            <div id="nav_left_principal">
                
                    <div id="top_buttons">
                      {topButtons == true ?
                        <ul>
                            <li style={{'backgroundColor':`${borders[0]}`}} onMouseOver={()=>{setButtonController(controller_button_selecting)}} onMouseOut={()=>{if(local!="game"){setButtonController(controller_button)}else{setButtonController(controller_button_selected)}}} onClick={()=>{navigate('/games')}}><img src={buttonController} /></li>
                            <li style={{'backgroundColor':`${borders[1]}`}} onMouseOver={()=>{setButtonDocuments(documents_button_selecting)}} onMouseOut={()=>{if(local!="documents"){setButtonDocuments(documents_button)}else{setButtonDocuments(documents_button_selected)}}} onClick={()=>{navigate('/documents')}}><img src={buttonDocuments}/></li>
                            <li style={{'backgroundColor':`${borders[2]}`}} onMouseOver={()=>{setButtonGroup(group_button_selecting)}} onMouseOut={()=>{if(local!="groups"){setButtonGroup(group_button)}else{setButtonGroup(group_button_selected)}}} onClick={()=>{navigate('/groups')}}><img src={buttonGroup}/></li>
                            <li style={{'backgroundColor':`${borders[3]}`}} onMouseOver={()=>{setButtonTrophy(trophy_button_selecting)}} onMouseOut={()=>{if(local!="campaign"){setButtonTrophy(trophy_button)}else{setButtonTrophy(trophy_button_selected)}}} onClick={()=>{navigate('/campaign')}}><img src={buttonTrophy}/></li>
                        </ul>
                        : ""}
                    </div>
                    
                    <p id="solicitation_title">{listTitle}</p>
                    <div id="nav_left_bottom">
                            <div id="nav_left_list">
                              {
                                  local=="groups"?(<button id="button_create_group" onClick={()=>{funcAlter[1](true)}}> <img src={create_group}/>Criar Grupo</button>):null
                                }
                            {
                                
                                list
                            }
                            </div>
                            
                           </div>
                            <div id="update">
                            {
                                updateButton==true?
                                <button id="update_button" onClick={()=>{
                                  
                                }}>
                                    Upgrade
                                </button>:""
                            }
                            </div>
            </div>
            <div id="nav_left_decoration">

            </div>
        </div>
    )
}