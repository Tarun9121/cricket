import { useEffect, useState } from "react";
import { getPlayerStatistics } from "../../service/matchStatisticsService";
import { Card, Table, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function PlayerCard() {
  const [playerStats, setPlayerStats] = useState({});
  const location = useLocation();
  const [member, setMember] = useState(location.state.member);

  async function getPlayerOverallStatistics(playerId) {
    try {
      console.log("playerId: started " + playerId);
      const response = await getPlayerStatistics(playerId);
      console.log("response.data: " + response.data);
      if (response.status === 200) {
        setPlayerStats(response.data);
      }
    } catch (error) {
      console.log("error");
      setPlayerStats("No Data");
    }
  }

  useEffect(() => {
    getPlayerOverallStatistics(member.id);
    console.log("member.id: " + member.id);
  }, []);

  return (
    <div className="p-4">
      <div className="row">
        <div className="col-md-6">
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="text-primary">{member.name}</Card.Title>
                <span className="text-muted h6">{member.bornDate}</span>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Batting Style:</span>
                  <span className="text-muted">{member.battingStyle}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Bowling Style:</span>
                  <span className="text-muted">{member.bowlingStyle}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Nationality:</span>
                  <span className="text-muted">{member.nationality}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6">
          {playerStats !== "No Data" ? (
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary mb-3">Player Statistics</Card.Title>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Statistic</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(playerStats).map(([key, value]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ) : (
            <div className="text-center text-danger">
              <strong>Something went wrong fetching statistics.</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
