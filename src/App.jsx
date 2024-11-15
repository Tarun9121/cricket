import { useState } from 'react'
import AllSeries from './component/Series/AllSeries'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Teams from './component/Teams/Teams'
import PlayerCard from './component/PlayerCard/PlayerCard'
import AdminMode from './component/AdminMode/AdminMode'
import SeriesFormComponenet from './component/AdminMode/SeriesFormComponent'
import MatchesForm from './component/AdminMode/MatchesForm/MatchesForm'
import MatchForm from './component/AdminMode/MatchesForm/MatchForm'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllSeries />} />
          <Route path="/team" element={<Teams />} />
          <Route path="/playerCard" element={<PlayerCard />} />
          <Route path="/admin-mode" element={<AdminMode />} />
          <Route path="/admin-mode/series-form" element={<SeriesFormComponenet />} />
          <Route path="/admin-mode/match-form" element={<MatchesForm />} />
          <Route path="/admin-mode/match-form/specefic-match-form" element={<MatchForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
