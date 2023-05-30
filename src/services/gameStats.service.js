import axios from "axios";
import ENV from "../env";

const get = async (league) => {
    const res = await axios.get(`${ENV.GAME_DATA_API_URL}/game-stats/get?league=${league}`);
    return res;
};

const GameStatsService = {
    get
};

export default GameStatsService;