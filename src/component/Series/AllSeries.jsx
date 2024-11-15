import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { getAllSeries } from "../../service/seriesService";
import Series from "./Series";
import dummySeriesList from "../../data/dummySeriesList";
import AllMatches from "../Matches/AllMatches";
import Loading from "../Loading";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AllSeries() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seriesId, setSeriesId] = useState();


  const navigate = useNavigate();

  async function getSeries() {
    try {
      const response = await getAllSeries();
      setLoading(false);
      console.log(response);
      console.log(response.data);
      console.log("AllSeries: success: " + response.data[0].name);
      setData(response.data);
    } catch (error) {
      setLoading(false);
      console.log("AllSeries: error: " + error);
      setData([]);
    }
  }

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <Accordion>
      {loading ? (
        <div
          className="flex justify-center items-center"
          style={{ height: "100vh" }}
        >
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col gap-3 p-3">
          {/* <AdminMode /> */}
          <div>
            <Button variant="primary" onClick={() => {
              const token = localStorage.getItem("token")
              if(token === "admin") {
                navigate("/admin-mode")
              } else {
                navigate("/login-form")
              }
            }}>
              Enter Admin Mode
            </Button>
          </div>
          {data && data.length > 0
            ? data.map((item) => (
                <Accordion.Item eventKey={item.id.toString()} key={item.id}>
                  <Accordion.Header className="w-full d-flex flex-col">
                    <div style={{ width: "100%" }} className="flex flex-col">
                      <Series
                        id={item.id}
                        name={item.name}
                        type={item.format}
                        start={item.startDate}
                        end={item.endDate}
                        winner={item.winner}
                        handleClick={setSeriesId}
                      />
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <AllMatches seriesId={seriesId} />
                  </Accordion.Body>
                </Accordion.Item>
              ))
            : "May be There is no Data, check once again"}
        </div>
      )}
    </Accordion>
  );
}

export default AllSeries;
