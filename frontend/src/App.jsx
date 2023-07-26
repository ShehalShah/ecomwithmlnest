import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageDisplay from './components/ImageDisplay';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import SingleItemPage from './pages/SingleItemPage';

const App = () => {

  return (
      <Router>
        <Routes>
          <Route element={<ImageDisplay/>} exact path="/" />
          <Route element={<Home/>} exact path="/home" />
          <Route element={<SingleItemPage/>} exact path="/:item" />
          <Route element={<LoginPage/>} exact path="/login" />
        </Routes>
      </Router>
  );
};

export default App;
