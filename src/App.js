import React, { Component } from "react";
import './App.css';
import Game from "./Game/Game.js";
import data from "./data/data.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data.list
    };
  }
  render() {

    return (
      <div className="App">
        <Game data={this.state.data} />

      </div>
    );
  }
}

export default App;
