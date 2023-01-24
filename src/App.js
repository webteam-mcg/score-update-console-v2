import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { authIsReady } = useAuthContext();

  return (
    <Fragment>
    {authIsReady && (
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    )}
    </Fragment>
  );
}

export default App;
