import axios from "axios";

const STATISTICS_API = "http://localhost:8080/statistics";

export async function getPlayerStatistics(playerId) {
    const response = await axios.get(`${STATISTICS_API}/get-total-statics/${playerId}`);
    return response;
}