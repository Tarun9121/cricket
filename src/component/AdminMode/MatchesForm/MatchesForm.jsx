import { useEffect, useState } from "react";
import { getAllSeries } from "../../../service/seriesService";
import { useNavigate } from "react-router-dom";

export default function MatchesForm() {
    const [currentSeries, setCurrentSeries] = useState();
    const navigate = useNavigate();

    async function getCurrentSeries() {
        try {
            const response = await getAllSeries();
            const allSeries = response.data;
            const currentDate = new Date();
            const filteredSeries = allSeries.filter(series => {
                const seriesStartDate = new Date(series.startDate);
                const seriesEndDate = new Date(series.endDate);
                return seriesStartDate > currentDate || seriesEndDate > currentDate;
              });
              setCurrentSeries(filteredSeries);
          } catch (error) {
            setData([]);
          }
    }

    useEffect(() => {
        getCurrentSeries();
    }, []);

    return (
        <div>
            {
                currentSeries && currentSeries.length > 0 ?
                currentSeries.map((series, index) => (
                    <div className="border border-black p-3" key={index} onClick={() => navigate("/admin-mode/match-form/specefic-match-form", {
                        state: {
                            seriesId: series.id
                        }
                    })}>
                        <div>{series.name}</div> 
                        <div>{series.format}</div>
                    </div>
                ))
                :
                <div>No Current Series or Up Coming Series</div>
            }
        </div>
    );
}