import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {getTeamDetailsByTeamId} from "../../service/teamService";
import playersData from "../../data/playersData";
import Loading from "../Loading";
import TeamMembers from "./TeamMembers";

export default function Team() {
    const location = useLocation();
    const [teamDetails, setTeamDetails] = useState(location.state.teamDetail);

    return (
        <div>
            <div className={`flex justify-between p-4 border bg-slate-600 text-white items-center`}>
                <h3 className={`text-xl font-semibold text-white`}>Team: {teamDetails.name}</h3>
                <div>
                    <p>wins: {teamDetails.wins}</p>
                    <p>lost: {teamDetails.losses}</p>
                </div>
            </div>
            {
                teamDetails && teamDetails.playerDTOList.length > 0 ?
                <TeamMembers players={teamDetails.playerDTOList} />
                :
                <Loading />
            }
        </div>
    );
}