import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import { getMatchStatistics, getTeamsTotalScoresByMatchId } from "../../service/matchStatisticsService";
import Loading from "../Loading";
import { getTeamScoreByMatchId } from "../../service/matchService";

export default function MatchStatistics() {
  const { matchId } = useParams();
  const [matchStats, setMatchStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalScore, setTotalScore] = useState([]);

  async function getTeamsTotalScores() {
    try {
      const response = await getTeamsTotalScoresByMatchId(matchId);
      if(response.status == 200) {
        setTotalScore(response.data);
      }
    } catch(error) {
      setTotalScore([])
    }
  }

  async function fetchMatchStatistics() {
    try {
      const response = await getMatchStatistics(matchId);
      if (response.status === 200) {
        setMatchStats(response.data);
      }
    } catch (error) {
      setMatchStats([])
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMatchStatistics();
    getTeamsTotalScores();
  }, [matchId]);

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center" style={{ height: "100vh" }}>
          <Loading />
        </div>
      ) : (
        <>
          <h2 className="text-center mb-4">Match Statistics</h2>

          {
            totalScore?.length == 2 &&
            (totalScore[0].totalScore > totalScore[1].totalScore ? 
            <div className="p-3 text-end"><span className="font-bold capitalize">{totalScore[0].teamName}</span> won by {totalScore[0].totalScore - totalScore[1].totalScore} Runs</div>
            :
            <div className="p-3 text-end"><span className="font-bold capitalize">{totalScore[1].teamName}</span> won by {totalScore[1].totalScore - totalScore[0].totalScore} Runs</div>)
          }

          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4>First Innings</h4>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Runs</th>
                    <th>Balls Faced</th>
                    <th>Strike Rate</th>
                    <th>Fours</th>
                    <th>Sixes</th>
                  </tr>
                </thead>
                <tbody>
                  {matchStats
                    .filter((stat) => stat.numberOfInnings === 1)
                    .map((stat, index) => (
                      <tr key={index}>
                        <td>{stat.playerDTO.name}</td>
                        <td>{stat.runsScored}</td>
                        <td>{stat.ballsFaced}</td>
                        <td>{stat.strikeRate}</td>
                        <td>{stat.fours}</td>
                        <td>{stat.sixes}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4>Second Innings</h4>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Runs</th>
                    <th>Balls Faced</th>
                    <th>Strike Rate</th>
                    <th>Fours</th>
                    <th>Sixes</th>
                  </tr>
                </thead>
                <tbody>
                  {matchStats
                    .filter((stat) => stat.numberOfInnings === 2)
                    .map((stat, index) => (
                      <tr key={index}>
                        <td>{stat.playerDTO.name}</td>
                        <td>{stat.runsScored}</td>
                        <td>{stat.ballsFaced}</td>
                        <td>{stat.strikeRate}</td>
                        <td>{stat.fours}</td>
                        <td>{stat.sixes}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
}