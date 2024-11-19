import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeamsByMatchId } from "../../service/matchService";
import Card from "react-bootstrap/Card";

export default function Match({ venue, startDate, winner, matchId }) {
  const navigate = useNavigate();
  const [teamDetails, setTeamDetails] = useState([]);
  
  async function handleTeamDetails(matchId) {
    try {
      const response = await getTeamsByMatchId(matchId);
      if (response.status === 200) {
        setTeamDetails(response.data);
      }
    } catch (error) {
      setTeamDetails(null);
    }
  }

  function handleMatchClick() {
    navigate(`/match/${matchId}`);
  }

  function handleTeamClick(team) {
    navigate("/team", {
      state: {
        teamDetail: team,
      },
    });
  }

  useEffect(() => {
    handleTeamDetails(matchId);
  }, []);

  return (
    <Card
      className="hover:border-black hover:shadow-lg cursor-pointer"
      onClick={handleMatchClick}
    >
      {teamDetails && teamDetails.length === 2 ? (
        <Card.Body>
          <Card.Text>
            <div className="capitalize font-bold">
              <span
                className="cursor-pointer hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTeamClick(teamDetails[0]);
                }}
              >
                {teamDetails[0].name}
              </span>
              {" VS "}
              <span
                className="cursor-pointer hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTeamClick(teamDetails[1]);
                }}
              >
                {teamDetails[1].name}
              </span>
            </div>
            <div>
              {
                winner ? <span><span className="font-bold">{winner}</span> won the Match</span>
                :
                <span>Winner: To Be Determined</span>
              }
            </div>
            <div>
              {venue}
            </div>
          </Card.Text>
        </Card.Body>
      ) : (
        <div>Sorry, there is no data</div>
      )}
    </Card>
  );
}

// import React, { useEffect, useState } from "react";
// import Card from "react-bootstrap/Card";
// import matchesList from "../../data/matchesList";
// import Loading from "../Loading";
// import { useNavigate } from "react-router-dom";
// import { getTeamsByMatchId } from "../../service/matchService";
// import teamsDto from "../../data/teamsDto";

// export default function Match({ venue, startDate, winner, matchId }) {
//   const navigate = useNavigate();
//   const [teamDetails, setTeamDetails] = useState([]);

//   async function handleTeamDetails(matchId) {
//     try {
//       const response = await getTeamsByMatchId(matchId);
//       console.log("Match")
//       console.log(response)
//       if (response.status === 200) {
//         setTeamDetails(response.data);
//       }
//     } catch (error) {
//       setTeamDetails(null);
//     }
//   }

//   useEffect(() => {
//     handleTeamDetails(matchId);
//   }, []);

//   return (
//     <Card className="hover:border-black hover:shadow-lg">
//       {teamDetails && teamDetails.length == 2 ? (
//         <Card.Body>
//           <Card.Text>
//             <div className="capitalize font-bold">
//               <span className="cursor-pointer hover:underline"
//                 onClick={() => {
//                   navigate("/team", {
//                     state: {
//                       teamDetail: teamDetails[0],
//                     },
//                   });
//                 }}
//               >
//                 {teamDetails[0].name}
//               </span>
//               {` `} VS {` `}{" "}
//               <span className="cursor-pointer hover:underline"
//                 onClick={() => {
//                   navigate("/team", {
//                     state: {
//                       teamDetail: teamDetails[1]
//                     }
//                   });
//                 }}
//               >
//                 {teamDetails[1].name}{" "}
//               </span>
//             </div>
//             <div className="text-amber-500 font-bold">
//               {winner} <span className="text-black">won the Match</span>
//             </div>
//             <div>
//               {venue}: {startDate}
//             </div>
//           </Card.Text>
//         </Card.Body>
//       ) : (
//         <div>
//           {/* <Loading />  */}
//           Sorry there is no data
//         </div>
//       )}
//     </Card>
//   );
// }
