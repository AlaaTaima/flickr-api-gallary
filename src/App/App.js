
import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import * as ROUTES from '../constants/router';
import {HomePage, FavouritePage} from '../components';

function App(props) {
  return (
    <div className="App">
        <Router>
          <Routes >
            <Route path={ROUTES.HOME} element={<HomePage />} /> 

            <Route
              path={ROUTES.FAVOURITE}
              element={<FavouritePage  props={true}  />}
            />

          </Routes >
        </Router>
    </div>
  );
}

export default App;
