import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllSeries from "./component/Series/AllSeries";
import Teams from "./component/Teams/Teams";
import PlayerCard from "./component/PlayerCard/PlayerCard";
import AdminMode from "./component/AdminMode/AdminMode";
import SeriesFormComponenet from "./component/AdminMode/SeriesFormComponent";
import MatchesForm from "./component/AdminMode/MatchesForm/MatchesForm";
import MatchForm from "./component/AdminMode/MatchesForm/MatchForm";
import LoginForm from "./component/AdminMode/LoginForm";
import MatchStatistics from "./component/Matches/MatchStatistics";
import MatchesOfASeries from "./component/Matches/MatchesOfASeries";
import PlayersOfAMatch from "./component/Matches/PlayersOfAMatch";
import PlayerStatForm from "./component/Matches/PlayerStatForm";
import AllMatches from "./component/Matches/AllMatches";
import ProtectedRoute from "./ProtectedRoute";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login-form" element={<LoginForm />} />
                    <Route path="/" element={<AllSeries />} />
                    <Route path="/matches-in-series/:seriesId" element={<AllMatches />} />
                    <Route path="/team" element={<Teams />} />
                    <Route path="/playerCard" element={<PlayerCard />} />
                    <Route path="/match/:matchId" element={<MatchStatistics />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/admin-mode" element={<AdminMode />} />
                        <Route path="/admin-mode/series-form" element={<SeriesFormComponenet />} />
                        <Route path="/admin-mode/match-form" element={<MatchesForm />} />
                        <Route path="/admin-mode/matches-of-a-series" element={<MatchesOfASeries />} />
                        <Route path="/admin-mode/match-statform" element={<PlayersOfAMatch />} />
                        <Route path="/admin-mode/player-stat-form" element={<PlayerStatForm />} />
                        <Route path="/admin-mode/match-form/specefic-match-form" element={<MatchForm />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;