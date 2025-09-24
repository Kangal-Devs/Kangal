import { useCallback, useEffect, useState } from "react"
import "./common_task_button.css"

export function CommonTaskButton({value,i,buttonActive,funcAlter,possibleAnswersCount,verified,correctAnswer}){
    const [currentCommonTaskButtonClass,setCurrentCommonTaskButtonClass] = useState()

    const [active,setActive] = useState()

    //Explicação do codigo abaixo
    //Por padrão quando um exercicio do tipo select é renderizado na tela do usuario
    // nenhum botão vem selecionado, e existe um array em task.jsx que contem as informações, por exemplo:
    // [false,false,false,false], isso iria dizer que 4 botões estão NÃO selecionados. A função abaixo
    //retorna o array so que com o valor TRUE no botão respectivo que foi selecionado. então ele pega
    // informações como o tamanho do array, e o valor (i) no qual esse botão é renderizado
    // e retorna por exemplo um [false,false,true,false], que nesse caso o botão 3 seria o selecionado.

    //a variavel que esta em task.jsx que é responsavel por guardar qual botão esta pressionado é a: 
    // buttonActive, a função que entrou no parametro de criação deste componente (common_task_button)
    // chamada de funcAlter é um array que tem algumas funções que são setters, no caso funcAlter[0]
    // é a setButtonActive

    useEffect(()=>{
        if(verified){
            if(correctAnswer==value){
                setCurrentCommonTaskButtonClass("common_task_button_right")
            }
            else{
                setCurrentCommonTaskButtonClass("common_task_button_wrong")
            }
        }
    },[verified])

  

    const newButtonActive = useCallback(()=>{
        let buttonSelectedArr = [];
        for(let j=0;j<possibleAnswersCount;j++){
              if(j==i){
                buttonSelectedArr[j] = true
              }else{
                     buttonSelectedArr[j] = false
              }
            }  
            funcAlter[0](buttonSelectedArr)
            funcAlter[1](value)
    },[i,possibleAnswersCount])

    useEffect(()=>{
        setActive(buttonActive[i])
    },[buttonActive])


    useEffect(()=>{
        if(active){
            setCurrentCommonTaskButtonClass("common_task_button_selected")
        }
        else{
            setCurrentCommonTaskButtonClass("common_task_button_unselected")
        }
    },[active])

    return(
        <button className={currentCommonTaskButtonClass}onClick={()=>{
            if(!verified){
            newButtonActive()
            }
        }}>
            {value}
            
         
        </button>
    )
}