
// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import HomeScreen from './HomeScreen';

function App() {
  return (
    <div>
    <Router>
    <Routes>
       <Route path='/' element={<Home />} >
       <Route index element={<HomeScreen />} />
       </Route>
    </Routes>
  </Router>

    </div>
  );
}

export default App;


