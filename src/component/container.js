import Card from "./card"
import { useEffect, useState } from "react"


const Gameboard=({cards,setGameStatus,gameStatus,setCards,setSettingPlayWith,playWith})=>{

    const [disableCards,setDisableCards]=useState(true)
    const[cardsState,setCardsState]=useState({
        openedCard:[],
        matchedCard:[]
    })
    
    const SUMOFCARD=8

    useEffect(()=>{
        setCardsState({
            openedCard:[],
            matchedCard:[]
        })
        

    },[gameStatus.start])


    const flibedWrongCartAfterOneSecend=(lastCardOpenedindex)=>{

        setTimeout(() => {
            let first=cardsState.openedCard[0]

            setCards((state)=>{
                return state.map((card,indexi)=>{
                    if(indexi === first || indexi === lastCardOpenedindex ){
                        return {...card,status:""};
                    }
                    return card
                })
            })

            setCardsState((state)=>({...state,openedCard:[]}))    
            setDisableCards(false)
        }, 1000);

    }

    const makeFlibedCardToGreen=(secondCardId)=>{

        setCards((state)=>{
            return state.map((card)=>{
                if(card.id === secondCardId){
                    return {...card,status:"open correct"};
                }
                return card

            })
        })

    }

    const makeFlibedCardToRed=(index)=>{

        setCards((state)=>{
            return state.map((card,indexi)=>{

                if(indexi === index  || cardsState.openedCard[0] === indexi){
                    return {...card,status:"open wrong"};
                }
                return card
            })
        })

    }

    const endGame=()=>{
        setGameStatus((state)=>({...state,start:false}))
        setCardsState({
            openedCard:[],
            matchedCard:[]
        })

    }


    const handleClick=(index)=>{
        const isOpenCardLaggerThanZero=cardsState.openedCard.length === 1

        if(isOpenCardLaggerThanZero){

            let firstCardId=cards[cardsState.openedCard[0]].id
            let secondCardId=cards[index].id


            if(firstCardId === secondCardId ){

                makeFlibedCardToGreen(secondCardId)

                if(playWith){
                    setSettingPlayWith((state)=>{
                        let newData={...state}
                        if(newData.isTurn)
                            newData.you=newData.you+1
                        else
                            newData.friend=newData.friend+1
    
                        newData.isTurn=!newData.isTurn
                        return {...newData}
                    })
                }

                const matchedCard=[...cardsState.matchedCard,secondCardId]
                if(matchedCard.length === SUMOFCARD){
                        endGame()
                        return
                }

                setCardsState((state)=>{
                    return {...state,openedCard:[],matchedCard:[...state.matchedCard,secondCardId]}
                })


            }

            else{

                setDisableCards(true)

                setCardsState((state)=>({...state,openedCard:[...cardsState.openedCard,index]}))
                setSettingPlayWith((state)=>({...state,isTurn:!state.isTurn}))
                
                makeFlibedCardToRed(index)
                flibedWrongCartAfterOneSecend(index)

            }


        }

        else{
            setCardsState((state)=>({...state,openedCard:[index]}))

            setCards((state)=>{
                return state.map((card,i)=>{
                    if(i === index){
                        return {...card,status:"open"};
                    }
                    return card
                })
            })
        }

    }

    
    return(

        <div className="gameboard">
            <div  className="list" starts={`${gameStatus.start ? "true" : "false"}`}>
                {cards.map(({id,status:statusCard},index)=>{

                    let status=`${disableCards ? "disable" : ""} ${statusCard}`

                    return(
                        <Card 
                            key={index}
                            setDisableCards={setDisableCards} 
                            src={cards[index].name} 
                            status={status}  
                            index={index} 
                            handleClick={handleClick} 
                        />
                    )
                })}
                
            </div>
        </div>


    )
}

export default Gameboard