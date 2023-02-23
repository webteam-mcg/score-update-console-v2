import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';
import { useInning } from './hooks/useInning';
import Home from './pages/home/Home';
import Innings from './pages/innings/Innings';
import Login from './pages/login/Login';
import Players from './pages/players/Players';
import Setup from './pages/setup/setup';

function App() {
  const { authIsReady, user } = useAuthContext();
  const { inningIsReady } = useInning();

  return (
    <Fragment>
    {authIsReady && inningIsReady && (
      <Router>
        <Routes>
          <Route 
            exact path="/" 
            element={ user ? <Home/> : <Navigate to="/login" />} 
          />
          <Route 
            exact path="/players" 
            element={ user ? <Players/> : <Navigate to="/login" />} 
          />
          <Route 
            exact path="/innings" 
            element={ user ? <Innings/> : <Navigate to="/login" />} 
          />
          <Route 
            exact path="/setup" 
            element={ user ? <Setup/> : <Navigate to="/login" />} 
          />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
        </Routes>
      </Router>
    )}
    </Fragment>
  );
}

export default App;
