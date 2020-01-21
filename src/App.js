import React, { Component } from "react";
import './App.css';
import Game from "./Game/Game.js";
import data from "./data/data.json";
import easyData from "./data/easyData.json";
import '@progress/kendo-theme-default/dist/all.css';
import JumpGame from "./JumpGame/JumpGame.js";
import {
  Button
} from '@progress/kendo-react-buttons';
import ManagePage from "./ManagePage/ManagePage.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data,
      easyData: easyData,
      mainpage: true,
      jump: false,
      type: false,
      managepage: false
    };
  }

  typingGame = () => {
    this.setState({
      type: true,
      mainpage: false,
      jump: false,
      managepage: false
    })
  }

  jumpingGame = () => {
    this.setState({
      type: false,
      mainpage: false,
      jump: true,
      managepage: false
    })
  }
  manage = () => {
    this.setState({
      type: false,
      mainpage: false,
      jump: false,
      managepage: true
    })
  }

  render() {

    let selectPage;
    let jumpGamePage;
    let typingGamePage;
    let managePage;

    typingGamePage = <Game data={this.state.data} />

    jumpGamePage = <JumpGame data={this.state.easyData} />

    selectPage = (
      <div className="select-page">
        <h1>SELECT MINI GAMES</h1>
        <Button className="btn main" primary={true} onClick={this.typingGame}>Typing Game</Button>
        <Button className="btn main" primary={true} onClick={this.jumpingGame}>Jumping Game</Button><br />
        <Button icon="folder" primary={true} look="outline" onClick={this.manage}>MANAGE MY OWN VOCAB</Button>

      </div>
    )

    managePage = <ManagePage />

    return (
      <div className="App">
        {this.state.type ? typingGamePage : null}
        {this.state.mainpage ? selectPage : null}
        {this.state.jump ? jumpGamePage : null}
        {this.state.managepage ? managePage : null}
      </div>
    );
  }
}

export default App;
