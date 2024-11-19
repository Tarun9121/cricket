import { useEffect, useState } from "react";
import { getTeamMembersByTeamId } from "../../service/teamService";
import { useLocation, useNavigate } from "react-router-dom";

export default function PlayersOfAMatch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const [activeTab, setActiveTab] = useState("team1");
  const match = location.state?.matchDetails;

  async function fetchPlayers(teamId) {
    try {
      const response = await getTeamMembersByTeamId(teamId);
      return response.status === 200 ? response.data : [];
    } catch (error) {
      console.error("Error fetching team members:", error);
      return [];
    }
  }

  useEffect(() => {
    const fetchTeams = async () => {
      if (match) {
        const [players1, players2] = await Promise.all([
          fetchPlayers(match.teamsDTO[0].id),
          fetchPlayers(match.teamsDTO[1].id),
        ]);
        setTeam1(players1);
        setTeam2(players2);
      }
    };
    fetchTeams();
  }, [match]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {match ? (
        <>
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="text-xl font-semibold text-gray-800">
              {match.teamsDTO[0]?.name || "Team 1"}
            </div>
            <div className="text-xl font-semibold text-gray-800">
              {match.teamsDTO[1]?.name || "Team 2"}
            </div>
          </div>

          <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link text-lg font-medium ${
                  activeTab === "team1" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
                }`}
                id="team1-tab"
                role="tab"
                aria-controls="team1"
                aria-selected={activeTab === "team1"}
                onClick={() => handleTabSwitch("team1")}
              >
                {match.teamsDTO[0]?.name || "Team 1"}
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link text-lg font-medium ${
                  activeTab === "team2" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
                }`}
                id="team2-tab"
                role="tab"
                aria-controls="team2"
                aria-selected={activeTab === "team2"}
                onClick={() => handleTabSwitch("team2")}
              >
                {match.teamsDTO[1]?.name || "Team 2"}
              </button>
            </li>
          </ul>

          <div>
            {activeTab === "team1" && (
              <div>
                {team1 ? (
                  team1.map((player) => (
                    <div
                      key={player.id}
                      className="flex justify-between items-center border-b border-gray-200 py-3 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        navigate("/admin-mode/player-stat-form", {
                          state: {
                            playerDetails: player,
                            matchDetails: match,
                          },
                        })
                      }
                    >
                      <div className="text-lg text-gray-700">{player.name}</div>
                      <div className="text-sm text-gray-500">{player.role}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-600">Loading Team 1 Players...</div>
                )}
              </div>
            )}

            {activeTab === "team2" && (
              <div>
                {team2 ? (
                  team2.map((player) => (
                    <div
                      key={player.id}
                      className="flex justify-between items-center border-b border-gray-200 py-3 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        navigate("/admin-mode/player-stat-form", {
                          state: {
                            playerDetails: player,
                            matchDetails: match,
                          },
                        })
                      }
                    >
                      <div className="text-lg text-gray-700">{player.name}</div>
                      <div className="text-sm text-gray-500">{player.role}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-600">Loading Team 2 Players...</div>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="alert alert-danger text-center">Match details not available!</div>
      )}
    </div>
  );
}
