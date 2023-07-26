import { useEffect, useState } from "react"
import Modal from "./Model"



let ooo=[
    "animals",
    "fish"

]




const StartWindow=({gameStatus,startGame,showWidget,setSettingPlayWith })=>{

    const[hide,setHide]=useState(gameStatus.start)
    const[choice,setChoice]=useState(gameStatus.type)

    useEffect(()=>{
        if(!gameStatus.start){
            setHide(false)
        }
    },[gameStatus.start])

    const handleStart=()=>{
        setHide(true)
        startGame(choice)
    }


    return( 

        <Modal hide={hide}>
            <div className={`widget-start ${hide ? "close" :""}`}>
                <div className="choice-play-with">
                    <div onClick={()=>setSettingPlayWith((state)=>({...state,showWidget:false}))} className={`btn ${!showWidget ? " active" :""}`}>Play Solo</div>
                    <div onClick={()=>setSettingPlayWith((state)=>({...state,showWidget:true}))} className={`btn ${showWidget ? " active" :""}`}>Play With Your Friend</div>
                </div>
                <div className="choise">
                    {ooo.map((item,index)=>{
                        return(
                            <div key={index} className={`btn${choice === item ? " active" : "" }`} onClick={()=>setChoice(item)}>{item}</div>
                        )
                    })}
                </div>


                <div onClick={handleStart} className="start">Start</div>

            </div>
        </Modal>
    )

}
export default StartWindow