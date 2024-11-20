import React, { useState, useEffect } from "react";
import { getAllSeries } from "../../service/seriesService";
import Series from "./Series";
import Loading from "../Loading";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AllSeries() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function getSeries() {
    try {
      const response = await getAllSeries();
      if(response.status == 200) {
        setLoading(false);
        setData(response.data);
      }
    } catch (error) {
      setLoading(false);
      setData([]);
    }
  }

  useEffect(() => {
    getSeries();
  }, []);

  const handleAdminNavigation = () => {
    const token = localStorage.getItem("token");
    token === "admin" ? navigate("/admin-mode") : navigate("/login-form");
  };

  const handleViewMatches = (seriesId) => {
    navigate(`/matches-in-series/${seriesId}`);
  };

  return (
    <div className="bg-white text-black min-h-screen p-8">
      {loading ? (
        <div className="flex justify-center items-center" style={{ height: "100vh" }}>
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex justify-center mb-8">
            <Button
              variant="dark"
              onClick={handleAdminNavigation}
              className="px-8 py-4 rounded-lg shadow-md hover:bg-gray-700"
            >
              Enter Admin Mode
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {data && data.length > 0 ? (
              data.map((item) => (
                <Card
                  key={item.id}
                  className="bg-white text-black border border-gray-200 rounded-xl shadow-md hover:shadow-xl"
                >
                  <Card.Body className="p-6 flex flex-col gap-4">
                    <Series
                      id={item.id}
                      name={item.name}
                      type={item.format}
                      start={item.startDate}
                      end={item.endDate}
                      winner={item.winner || "To Be Determined"} 
                    />
                    <div className="flex justify-center mt-6">
                      <Button
                        variant="outline-dark"
                        onClick={() => handleViewMatches(item.id)}
                        className="w-full py-3 rounded-lg hover:bg-gray-100 hover:text-black"
                      >
                        View Matches
                      </Button>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-gray-50 text-center text-sm text-gray-700 rounded-b-xl">
                    {item.startDate && item.endDate ? (
                      <>
                        Start: {new Date(item.startDate).toLocaleDateString()} | End: {new Date(item.endDate).toLocaleDateString()}
                      </>
                    ) : (
                      "Dates not available"
                    )}
                  </Card.Footer>
                </Card>
              ))
            ) : (
              <div className="text-center text-lg text-black">No series found. Please check again later.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllSeries;
