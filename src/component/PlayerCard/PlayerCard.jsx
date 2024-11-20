import { useEffect, useState } from "react";
import { getPlayerStatistics } from "../../service/matchStatisticsService";
import { Card, Container, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function PlayerCard() {
  const [playerStats, setPlayerStats] = useState(null);
  const location = useLocation();
  const [member, setMember] = useState(location.state.member);

  async function getPlayerOverallStatistics(playerId) {
    try {
      const response = await getPlayerStatistics(playerId);
      if (response.status === 200) {
        setPlayerStats(response.data);
      }
    } catch (error) {
      console.log("Error fetching player statistics:", error);
      setPlayerStats("No Data");
    }
  }

  useEffect(() => {
    if (member?.id) {
      getPlayerOverallStatistics(member.id);
    }
  }, [member]);

  if (playerStats === null) {
    return <div>Loading...</div>;
  }

  return (
      <Container>
      <div className="row p-2">
        <div className="col-md-2"></div>
        <div className="col-md-8">
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
        <div className="col-md-2"></div>
        </div>

        <div className="row p-2">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          {playerStats === "No Data" ? (
            <div className="text-center text-danger">
              <strong>Something went wrong fetching statistics.</strong>
            </div>
          ) : (
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary mb-3">
                  Player Statistics
                </Card.Title>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Statistic</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>No Of Innings</td>
                      <td>{playerStats?.numberOfInnings || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Total Runs</td>
                      <td>{playerStats?.runsScored || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Balls Bowled</td>
                      <td>{playerStats?.ballsBowled || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Runs Conceded</td>
                      <td>{playerStats?.runsConcede || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Strike Rate</td>
                      <td>
                        {playerStats?.strikeRate
                          ? new Number(playerStats.strikeRate).toFixed(1)
                          : "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td>Batting Average</td>
                      <td>
                        {playerStats?.battingAverage
                          ? new Number(playerStats.battingAverage).toFixed(1)
                          : "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td>Bowling Average</td>
                      <td>
                        {playerStats?.bowlingAverage
                          ? new Number(playerStats.bowlingAverage).toFixed(1)
                          : "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td>Wickets Taken</td>
                      <td>{playerStats?.wicketsTaken || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Economy</td>
                      <td>
                        {playerStats?.economy && !isNaN(playerStats.economy)
                          ? new Number(playerStats.economy).toFixed(1)
                          : "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td>No of Hundreds</td>
                      <td>{playerStats?.hundreds || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>No of Fifties</td>
                      <td>{playerStats?.fifties || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>No of Sixes</td>
                      <td>{playerStats?.sixes || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>No of Fours</td>
                      <td>{playerStats?.fours || "N/A"}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </div>
        <div className="col-md-2"></div>
      </div>
      </Container>
  );
}