import React, { useState, useEffect } from "react";
import { getAllMatchesBySeriesId } from "../../service/seriesService";
import matchesList from "../../data/matchesList";
import Match from "./Match";
import styles from "./scrollBar.module.css";
import Loading from "../Loading";

export default function AllMatches({ seriesId }) {
  const [allMatches, setAllMatches] = useState([]);

  async function handleGetMatchesData(seriesId) {
    try {
      if (seriesId) {
        console.log("got the series id to the allmatches: " + seriesId);
        const response = await getAllMatchesBySeriesId(seriesId);
        if (response.status === 200) {
          setAllMatches(response.data.matchesDTOList);

          console.log(response);
          console.log(allMatches);
        }
      }
    } catch (error) {
      console.log("AllMatches: error: " + error);
      setAllMatches(matchesList);
    }
  }

  useEffect(() => {
    handleGetMatchesData(seriesId);
  }, [seriesId]);

  useEffect(() => {
    if (allMatches && allMatches.length > 0) {
      // Sort matches by startDate in descending order
      const sorted = [...allMatches].sort((a, b) => {
        return new Date(b.startDate) - new Date(a.startDate);
      });
      setAllMatches(sorted);
    }
  }, [allMatches]);

  return (
    <div className={`flex p-3 gap-2 flex-nowrap overflow-scroll`}>
      {(allMatches && allMatches.length > 0) ? (
        allMatches.map((match, index) => (
          <div className="flex-shrink-0 border border-red-900" key={index}>
            <Match
              key={index}
              venue={match.venue}
              startDate={match.startDate}
              winner={match.winner}
              matchId={match.id}
            />
          </div>
        ))
      ) : (
        "May be There is No data"
      )}
    </div>
  );
}
