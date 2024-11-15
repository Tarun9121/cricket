import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

export default function TeamMembers({ players }) {
    console.log("<players />: " + players);
    const navigate = useNavigate();

    function navigateToPlayerCard(playerData) {
      navigate("/playerCard", {
        state: {
          member: playerData
        }
      })
    }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Player Name</th>
          <th>Date of Birth</th>
          <th>Batting Style</th>
          <th>Bowling Style</th>
          <th>Nationality</th>
        </tr>
      </thead>
      <tbody>
        {
            players && players.length > 0 ?
            players.map((member, index) => (
                <tr onClick={() => navigateToPlayerCard(member)} className="cursor-pointer" key={index}>
          <td className="hover:underline">{member.name}</td>
          <td>{member.bornDate}</td>
          <td>{member.battingStyle}</td>
          <td>{member.bowlingStyle}</td>
          <td>{member.nationality}</td>
        </tr>
            ))
            :
            "Please wait untill loading"
        }
      </tbody>
    </Table>
  );
}
