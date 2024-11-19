import React, { useState, useEffect } from "react";
import { getAllMatchesBySeriesId } from "../../service/seriesService";
import matchesList from "../../data/matchesList";
import Match from "./Match";
import { useParams } from "react-router-dom";

export default function AllMatches() {
  const { seriesId } = useParams();
  const [allMatches, setAllMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const groupMatchesByDate = (matches) => {
    const grouped = matches.reduce((acc, match) => {
      const date = match.startDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(match);
      return acc;
    }, {});

    return Object.entries(grouped).sort((a, b) => new Date(b[0]) - new Date(a[0]));
  };

  async function handleGetMatchesData(seriesId) {
    try {
      if (seriesId) {
        const response = await getAllMatchesBySeriesId(seriesId);
        if (response.status === 200) {
          setAllMatches(response.data.matchesDTOList);
          setLoading(true);
        }
      }
    } catch (error) {
      setAllMatches(matchesList);
      setLoading(true);
    }
  }

  useEffect(() => {
    handleGetMatchesData(seriesId);
  }, [seriesId]);

  useEffect(() => {
    if (allMatches && allMatches.length > 0) {
      const sorted = [...allMatches].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      setAllMatches(sorted);
    }
  }, [loading]);

  const groupedMatches = groupMatchesByDate(allMatches);

  return (
    <div className="p-3">
      {groupedMatches.length > 0 ? (
        groupedMatches.map(([date, matches], dateIndex) => (
          <div key={dateIndex} className="mb-6">
            <div className="bg-blue-100 text-blue-800 font-bold p-2 rounded-md mb-3">
              {date}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matches.map((match, index) => (
                <div className="match-card" key={index}>
                  <Match
                    venue={match.venue}
                    startDate={match.startDate}
                    winner={match.winner}
                    matchId={match.id}
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-lg text-black">Maybe there is no data</div>
      )}
    </div>
  );
}
