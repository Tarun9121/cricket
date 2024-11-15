import axios from "axios"
const SERIES_URL = "http://localhost:8080/api/series";

export const getAllSeries = async () => {
    try {
        const allSeries = await axios.get(`${SERIES_URL}/get-all-series`)
        return allSeries;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

export const getAllMatchesBySeriesId = async (seriesId) => {
    try {
        const allMatches = await axios.get(`${SERIES_URL}/get-series-by-id/${seriesId}`)
        return allMatches;
    } catch(error) {
        throw error;
    }
}

export const postSeriesData = async (payload) => {
    try {
        const response = await axios.post(`${SERIES_URL}/save-series`, payload)
        return response;
    } catch(error) {
        throw error;
    }
}


// import axios from 'axios';
// const API_BASE_URL = 'http://localhost:8080';
// export const saveMatch = async (matchData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/save-match`, matchData);
//     return response.data;
//   } catch (error) {
//     console.error("Error saving match:", error);
//     throw error;
//   }
// };