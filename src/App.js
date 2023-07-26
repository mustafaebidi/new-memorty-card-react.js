import { Fragment, useCallback, useRef, useState } from "react";
import Gameboard from "./component/container";
import PlayWith from "./component/playWith";
import StartWindow from "./component/StartWindow";
import Timer from "./component/timer"





const choise={
  animals:["dog","elephant","monkey","zipra","hippo","rural","tiger","giraffe"],
  fish:["baba","mama","ahmed","salad","wawa","ok","mustafa"]

}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array 
}




const getCards=(type,isFirstTime)=>{

  const listOfPhotos=choise[type]



  const s=listOfPhotos.map((item,index)=>{
      return {id:index,name:`${type}/${item}`,status:`${isFirstTime ? "" : "disable" }`}
  })

  

  const allItem=[...s,...s]
  let one= shuffleArray(allItem)
  return shuffleArray(one)
  
}


function App() {  

  const isFirstTime=useRef(true)
  const [cards,setCards]=useState(()=>getCards("animals",isFirstTime.current))

  const [settingPlayWith,setSettingPlayWith]=useState({
    showWidget:false,
    you:0,
    friend:0,
    isTurn:true
  })


  const [gameStatus,setGameStatus]=useState({
    start:false,
    type:"fish",
  })


  const playWith=settingPlayWith.showWidget === true


  const restGame=()=>{

    setCards((state)=>{
      return state.map((card)=>{
        return {...card,status:"disable"} 
      })
    })

    setSettingPlayWith((state)=>({...state,
      you:0,
      friend:0,
      isTurn:true
    }))



  }
  console.log(cards)

  const startGame=useCallback((type)=>{


    if(isFirstTime.current){
        setGameStatus((state)=>({...state,type}))
        setCards(getCards(type,isFirstTime.current))

        setTimeout(() => {
            setGameStatus((state)=>({...state,start:true}))
        }, 400);
        isFirstTime.current=false
        return ;
        
    }
    restGame()
    let clearOne=setTimeout(() => {

        setCards(getCards(type))
        setGameStatus((state)=>({...state,type}))

        let clearTwo=setTimeout(() => {
          setGameStatus((state)=>({...state,start:true}))

          setTimeout(() => {
            setCards((state)=>{
              return state.map((card)=>{
                return {...card,status:""}
              })
            })
        }, 3000);
        clearTimeout(clearTwo)

      }, 400);

      clearTimeout(clearOne)

    }, 800)

    

  },[])





  return (

      <div className="app">

        {!gameStatus.start ? <StartWindow setSettingPlayWith={setSettingPlayWith} showWidget={settingPlayWith.showWidget }  startGame={startGame} gameStatus={gameStatus}/>:null}


        <h2 className="main-title">Memory Game</h2>
        {settingPlayWith.showWidget ? <PlayWith settingPlayWith={settingPlayWith}/> :null}

        <Timer setGameStatus={setGameStatus} start={gameStatus.start}/>

        <Gameboard playWith={playWith} setSettingPlayWith={setSettingPlayWith} setCards={setCards} cards={cards} gameStatus={gameStatus}  setGameStatus={setGameStatus}/>

      </div>

  );
}

export default App;
