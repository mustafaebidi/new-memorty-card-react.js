

const PlayWith=({settingPlayWith})=>{


    return(


        <div className="play-with">
        
            <div className={`${settingPlayWith.isTurn ? "active" :""}`}>
                <h3>You</h3>
                <h3>{settingPlayWith.you}</h3>
            </div>

            <div className={`${!settingPlayWith.isTurn ? "active" :""}`}>
                <h3>Your Friend</h3>
                <h3>{settingPlayWith.friend}</h3>

            </div>

        </div>


    )




}


export default PlayWith