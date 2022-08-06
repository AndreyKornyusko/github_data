import React from "react";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Users from './components/pages/usersSearch'
import UserInfo from './components/pages/userInfo'

import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes >
          <Route
            path="users"
            element={<Users/>}
          ></Route>
          <Route
            path='user/:id'
            element={<UserInfo/>}
          ></Route>

        </Routes >
      </BrowserRouter>
    </div>
  );
}

export default App;
