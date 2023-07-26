

const Card=({index,handleClick,status,src,setDisableCards})=>{


    const handleEnd=()=>{
        setDisableCards(false)
    }
    


    return(
        <div onAnimationEnd={handleEnd}  onClick={()=>handleClick(index)}  className={`card ${status}`}>
                <img src={`../../image/${src}.webp`} alt=""/>
        </div>
    )
}

export default Card