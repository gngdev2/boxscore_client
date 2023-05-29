import axios from "axios";

const API_URL = 'http://localhost:4000/api';

const get = (league) => {
    return axios.get(`${API_URL}/game-stats/get?league=${league}`)
    .then((res) => {
        return res;
    });
};

const GameStatsService = {
    get
};

export default GameStatsService;