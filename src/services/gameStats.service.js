import axios from "axios";
import ENV from "../env";

const get = (league) => {
    return axios.get(`${ENV.GAME_DATA_API_URL}/game-stats/get?league=${league}`)
    .then((res) => {
        return res;
    });
};

const GameStatsService = {
    get
};

export default GameStatsService;