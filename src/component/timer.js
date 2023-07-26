import { useEffect, useState } from "react"




const Timer=({start,setGameStatus})=>{
    const [timer,setTimer]=useState(100)


    useEffect(()=>{
        if(start){
            setTimer(100)
        }
    },[start])

    useEffect(()=>{
        let counter;

        if(start){
            counter=setInterval(() => {
                setTimer((state)=>{
                    if(0 === state ){
                        clearInterval(counter)
                        setGameStatus((state)=>({...state,start:false}))
                        return state
                    }

                    return state-1
                })
            }, 1000);

        }

        return()=>{
            clearInterval(counter)
        }



    },[setGameStatus, start])



    return(
        <div className="timer">
            {timer}
        </div>
    )

}

export default Timer