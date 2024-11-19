import axios from "axios";

const STATISTICS_API = "http://localhost:8080/api";

export async function getPlayerStatistics(playerId) {
    const response = await axios.get(`${STATISTICS_API}/statistics/get-total-statics/${playerId}`);
    return response;
}

export async function getMatchStatistics(matchId) {
    try {
      const response = await axios.get(`${STATISTICS_API}/matches/get-matchStatistics/${matchId}`);
      return response;
    } catch (error) {
      console.error("Error fetching match statistics:", error);
      throw error;
    }
  }

export async function saveMatchStatistics(matchStatistics) {
  try {
    const response = await axios.post(`${STATISTICS_API}/statistics/save`, matchStatistics);
    return response;
  } catch(error) {
    throw error;
  }
}