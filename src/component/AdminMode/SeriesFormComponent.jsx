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
    <div className="">
        <SeriesForm 
            seriesDetails={seriesDetails}
            setSeriesDetails={setSeriesDetails}
        />
    </div>
  );
}
