import { useEffect, useState, useRef } from "react";
import { getPlayerStatistics } from "../../service/matchStatisticsService";
import { Card, Table, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function PlayerCard() {
  const [playerStats, setPlayerStats] = useState({});
  const location = useLocation();
  // const member = useRef(location.state.member);
  const [member, setMember] = useState(location.state.member);

  async function getPlayerOverallStatistics(playerId) {
    try {
      console.log("playerId: started " + playerId);
      const response = await getPlayerStatistics(playerId);
      console.log("response.data: " + response.data);
      console.log(response)
      if (response.status === 200) {
        console.log("success");
        console.log(response);
        console.log("responsedata: " + response.data);
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
    <div className="p-3">
        <div className="row">
      <div className="col-sm-6">
        <Card>
          <Card.Body>
            <Card.Title>{member.name} <span className="text-muted h6">{member.bornDate}</span></Card.Title>
            <Card.Text>
              <div className="flex gap-3">
                <div className="h6">Batting Style</div>
                <div className="text-muted h6">{member.battingStyle}</div>
              </div>
              <div  className="flex gap-3">
                <div className="h6">Bowling Style</div>
                <div className="text-muted h6">{member.bowlingStyle}</div>
              </div>
              <div  className="flex gap-3">
                <div className="h6">Nationality</div>
                <div className="text-muted h6">{member.nationality}</div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="col-sm-6">
        {
          (playerStats != "No Data") ? 
          <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2" style={{ textAlign: "center" }}>
                statistics
              </th>
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
        :
        "SomeThing went wrong fetching statistics"
        }
      </div>
    </div>
    </div>
  );
}
