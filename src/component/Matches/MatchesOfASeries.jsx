import { useEffect, useRef, useState } from "react";
import { getAllMatchesBySeriesIdDESC } from "../../service/matchService";
import { useLocation, useNavigate } from "react-router-dom";

export default function MatchesOfASeries() {
  const location = useLocation();
  const navigation = useNavigate();
  const seriesDetails = useRef(location.state.seriesDetails);
  const [allMatches, setAllMatches] = useState([]);
  const [groupedMatches, setGroupedMatches] = useState({});
  const [loading, setLoading] = useState(true);

  async function handleGetAllMatchesOfASeries(seriesId) {
    try {
      const response = await getAllMatchesBySeriesIdDESC(seriesId);
      if (response.status === 200) {
        setAllMatches(response.data);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const seriesId = seriesDetails.current.id;
    handleGetAllMatchesOfASeries(seriesId);
  }, []);

  useEffect(() => {
    if (allMatches.length > 0) {
      const grouped = allMatches.reduce((acc, match) => {
        const date = match.startDate;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(match);
        return acc;
      }, {});
      setGroupedMatches(grouped);
    }
  }, [allMatches]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Matches of Series: {seriesDetails?.current.name || "Loading..."}
      </h2>

      {loading && <p className="text-lg text-gray-600">Loading matches...</p>}

      {!loading && Object.keys(groupedMatches).length === 0 && (
        <p className="text-lg text-gray-600">No matches found for this series.</p>
      )}

      {Object.entries(groupedMatches).map(([date, matches]) => (
        <div key={date} className="mb-6">
          <h3 className="text-2xl font-semibold text-blue-600 bg-blue-50 p-4 rounded-lg shadow-md">
            {date}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {matches.map((match) => (
              <div
                key={match.id}
                className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300"
                onClick={() =>
                  navigation("/admin-mode/match-statform", {
                    state: { matchDetails: match },
                  })
                }
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="capitalize text-lg font-medium text-gray-700">
                    {seriesDetails?.current.format || "N/A"}
                  </div>
                  <div className="text-gray-500">{match.startDate}</div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-gray-700">
                    <strong>Team 1:</strong> {match.teamsDTO?.[0]?.name || "N/A"}
                  </div>
                  <div className="text-gray-700">
                    <strong>Team 2:</strong> {match.teamsDTO?.[1]?.name || "N/A"}
                  </div>
                </div>

                <div className="text-gray-700 mb-4">
                  <strong>Venue:</strong> {match.venue || "Venue unavailable"}
                </div>

                <div className="text-gray-700">
                  <strong>Winner:</strong> {match.winner || "To Be Determined"}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
