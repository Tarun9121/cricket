import { useEffect, useState } from "react";
import { getAllSeries } from "../../../service/seriesService";
import { useNavigate } from "react-router-dom";

export default function MatchesForm() {
  const [currentSeries, setCurrentSeries] = useState([]);
  const navigate = useNavigate();

  async function getCurrentSeries() {
    try {
      const response = await getAllSeries();
      const allSeries = response.data;
      const currentDate = new Date();
      const filteredSeries = allSeries;
      // const filteredSeries = allSeries.filter((series) => {
      //   const seriesStartDate = new Date(series.startDate);
      //   const seriesEndDate = new Date(series.endDate);
      //   return seriesStartDate > currentDate || seriesEndDate > currentDate;
      // });
      
      setCurrentSeries(filteredSeries);
    } catch (error) {
      console.error("Error fetching series:", error);
      setCurrentSeries([]);
    }
  }

  useEffect(() => {
    getCurrentSeries();
  }, []);

  return (
    <div className="d-flex flex-column gap-3">
      {currentSeries.length > 0 ? (
        currentSeries.map((series, index) => (
          <div className="border border-dark rounded-lg p-4" key={index}>
            <div className="d-flex justify-between align-items-center p-3 border-bottom border-dark gap-5">
              <div className="d-flex gap-3 align-items-center">
                <div className="font-weight-bold">{`Series Name: ${series.name}`}</div>
                <div className="text-muted">{` [${series.format}]`}</div>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-dark"
                  onClick={() =>
                    navigate("/admin-mode/match-form/specefic-match-form", {
                      state: { seriesDetails: series },
                    })
                  }
                >
                  Add Matches
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    navigate("/admin-mode/matches-of-a-series", {
                      state: { seriesDetails: series },
                    });
                  }}
                >
                  Update Matches
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-muted">No Current or Upcoming Series</div>
      )}
    </div>
  );
}
