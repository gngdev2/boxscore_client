import Boxscore from "./boxscore";
import leagueVars from "./leagueVars";

const BoxscoreMLB = () => {
    return <Boxscore leagueVars={leagueVars['MLB']} />
    
}

export default BoxscoreMLB;