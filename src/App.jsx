import { useState } from "react";
import AllSeries from "./component/Series/AllSeries";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teams from "./component/Teams/Teams";
import PlayerCard from "./component/PlayerCard/PlayerCard";
import AdminMode from "./component/AdminMode/AdminMode";
import SeriesFormComponenet from "./component/AdminMode/SeriesFormComponent";
import MatchesForm from "./component/AdminMode/MatchesForm/MatchesForm";
import MatchForm from "./component/AdminMode/MatchesForm/MatchForm";
import LoginForm from "./component/AdminMode/LoginForm";
import ProtectedRoute from "./component/ProtectedRoute";
import MatchStatistics from "./component/Matches/MatchStatistics";
import MatchesOfASeries from "./component/Matches/MatchesOfASeries";
import PlayersOfAMatch from "./component/Matches/PlayersOfAMatch";
import PlayerStatForm from "./component/Matches/PlayerStatForm";
import AllMatches from "./component/Matches/AllMatches";

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
          <Route
            path="/admin-mode"
            element={
              <ProtectedRoute>
                <AdminMode />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-mode/series-form"
            element={
              <ProtectedRoute>
                <SeriesFormComponenet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-mode/match-form"
            element={
              <ProtectedRoute>
                <MatchesForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-mode/matches-of-a-series"
            element={
              <ProtectedRoute>
                <MatchesOfASeries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-mode/match-statform"
            element={
              <ProtectedRoute>
                <PlayersOfAMatch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-mode/player-stat-form"
            element={
              <ProtectedRoute>
                <PlayerStatForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-mode/match-form/specefic-match-form"
            element={
              <ProtectedRoute>
                <MatchForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;



// import { useState } from 'react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css'
// import Login from './taskcomponent/Login';
// import Home from "./taskcomponent/Home"
// import AddTaskForm from './taskcomponent/AddTaskForm';
// import UpdateTaskForm from './taskcomponent/UpdateTaskForm';
// import ConformDelete from './taskcomponent/ConformDelete';
// import ProtectedRouting from './taskcomponent/ProtectedRouting';

// function App() {

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/home" element={
//           <ProtectedRouting>
//             <Home />
//           </ProtectedRouting>
//         } />
//         <Route path="/add-task-form" element={
//           <ProtectedRouting>
//             <AddTaskForm />
//           </ProtectedRouting>
//         } />
//         <Route path="/update-task" element={
//           <ProtectedRouting>
//             <UpdateTaskForm />
//           </ProtectedRouting>
//         } />
//         <Route path="/delete-page" element={
//           <ProtectedRouting>
//             <ConformDelete />
//           </ProtectedRouting>
//         } />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App