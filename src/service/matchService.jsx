import axios from "axios"
const MATCHES_URL = "http://localhost:8080/api/matches";

export const getTeamsByMatchId = async (matchId) => {
    try {
        const allSeries = await axios.get(`${MATCHES_URL}/get-teams/${matchId}`)
        return allSeries;
    } catch(error) {
        console.log(error);
        throw error;
    }
}


export const getAllMatchesBySeriesIdDESC = async (seriesId) => {
    try {
        const allSeries = await axios.get(`${MATCHES_URL}/get-all-matches-by-series-id/${seriesId}`)
        return allSeries;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

export const postMatchDetails = async (matchDetails) => {
    try {
        const response = await axios.get(`${MATCHES_URL}/save-match`, matchDetails);
        return response;
    } catch(error) {
        return error;
    }
}