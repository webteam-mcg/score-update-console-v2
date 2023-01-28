import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Players from './pages/players/Players';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <Fragment>
    {authIsReady && (
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
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
        </Routes>
      </Router>
    )}
    </Fragment>
  );
}

export default App;
