import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MatchForm from './component/AdminMode/MatchesForm/MatchForm.jsx'
import MatchesForm from './component/AdminMode/MatchesForm/MatchesForm.jsx'
import MatchesOfASeries from './component/Matches/MatchesOfASeries.jsx'
import PlayersOfAMatch from './component/Matches/PlayersOfAMatch.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <MatchesForm /> */}
    {/* <MatchForm /> */}
    {/* <MatchesOfASeries /> */}
    {/* <PlayersOfAMatch /> */}
  </StrictMode>,
)
