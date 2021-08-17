import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import LoginPage from "./loginPage";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
