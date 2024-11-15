import axios from "axios";

const TEAM_URL = "http:localhost:8080/api/teams";

export async function getTeamDetailsByTeamId(teamId) {
    try {
        const response = await axios.get(`${TEAM_URL}/get-team-by-id/${teamId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getTeamMembersByTeamId(teamId) {
    try {
        const response = await axios.get(`${TEAM_URL}/get-players-by-id/${teamId}`);
        return response;
    } catch (error) {
        throw error;
    }
}
