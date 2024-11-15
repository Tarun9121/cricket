import { useState } from "react";
import SeriesForm from "./SeriesForm/SeriesForm";


export default function SeriesFormComponenet() {
  const [seriesDetails, setSeriesDetails] = useState({
    format: "",
    name: "",
    startDate: "",
    endDate: "",
    winner: "",
  });

  return (
    <div className="p-3">
        <SeriesForm 
            seriesDetails={seriesDetails}
            setSeriesDetails={setSeriesDetails}
        />
    </div>
  );
}
