import React, { Component } from "react";
import './Game.css';

// ES2015 module syntax
import {
    Button
} from '@progress/kendo-react-buttons';


// ES2015 module syntax
import { RadialGauge } from '@progress/kendo-react-gauges';


class game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameStart: false,
            gameOver: false,
            data: this.props.data,
            activeWord: this.props.data[0].word,
            activeMeaning: this.props.data[0].meaning,
            activeLetters: [],
            completedCount: 0,
            timer: 30,
            speed: 0
        };
    }

    componentWillMount() {

        document.addEventListener('keydown', function (e) {
            e.preventDefault();

            if (e.which >= 65 && e.which <= 90) {
                if (this.state.activeLetters.length == 0) {
                    if (this.state.activeWord[0] === e.key) {
                        var newLetter = this.state.activeLetters.concat(e.key)
                        this.setState({
                            activeLetters: newLetter
                        })
                    }
                } else if (this.state.activeWord[this.state.activeLetters.length] === e.key) {
                    var newLetter = this.state.activeLetters.concat(e.key)
                    this.setState({
                        activeLetters: newLetter
                    })
                }

                var nextWordIndex = this.state.completedCount + 1

                if (nextWordIndex === this.state.data.length) {
                    this.setState({
                        gameOver: true,
                        completedCount: 0,
                        gameStart: false,
                        activeWord: this.props.data[0].word,
                        activeMeaning: this.props.data[0].meaning,
                        activeLetters: [],
                        completedCount: 0,
                        timer: 0,
                        speed: 0
                    })
                }

                if (this.state.activeWord.split("").length === this.state.activeLetters.length) {
                    this.setState({
                        completedCount: nextWordIndex,
                        activeWord: this.state.data[nextWordIndex].word,
                        activeMeaning: this.state.data[nextWordIndex].meaning,
                        activeLetters: []

                    })
                }




            }








        }.bind(this));
    }

    componentDidMount() {
        setInterval(
            () => {
                this.setState({
                    speed: Math.ceil(Math.random() * 100)
                });
            },
            1000);

    }

    gameStart = () => {
        this.setState({
            gameStart: true,
            gameOver: false,
            completedCount: 0,
            timer: 30
        });

        this.interval = setInterval(this.timer, 1000);
    }

    timer = () => {
        let newTime = this.state.timer - 1;
        this.setState({
            timer: newTime
        })
        if (newTime === 0) {
            window.clearInterval(this.interval);
            this.setState({
                gameStart: false,
                gameOver: true,
                activeWord: this.props.data[0].word,
                activeMeaning: this.props.data[0].meaning,
                activeLetters: [],
                timer: 0,
                speed: 0
            });
        }
    }


    render() {
        let typingLetters = [];
        let gameBoard;
        let gameOverResult;
        let gameStartSelect;
        this.state.activeWord.split("").map((item, i) => {
            let correct;
            if (this.state.activeLetters[i] === undefined) {
                correct = undefined
            }
            else if (this.state.activeLetters[i] === item) {
                correct = true
                typingLetters.push(<span className="typing-single-char" key={i} data-correct={correct}>{item}</span>)
            }
            else {
                correct = false
            }
        });

        let actualLetters = [];
        this.state.activeWord.split("").map((item, i) => {
            actualLetters.push(<span className="origin-single-char" key={i} >{item}</span>)
        });

        const radialOptions = {
            pointer: {
                value: this.state.value
            }
        };

        gameBoard = (<div>
            <div className="upper-row">
                <div className="word-lst">
                    <div className="word-container">
                        <div className="the-word">{this.state.activeWord}</div>
                        <div className="the-meaning">{this.state.activeMeaning}</div>

                    </div></div>

                <div className="measure">
                    {/* <div className="speed-sec"><RadialGauge {...radialOptions} /></div> */}
                    <div className="time-cd">Time Left: {this.state.timer}</div>
                    <div className="time-cd">Completed:{this.state.completedCount}</div>
                </div>

            </div>
            <div className="typing-area">
                <div className="typing-container">
                    {typingLetters}
                </div>
                <div className="origin-word">
                    {actualLetters}
                </div>
            </div>

        </div>)

        gameOverResult = (
            <div>
                <h1>TIME OUT!</h1>
                <div className="lower-sec">
                    <p>You completed typing <h2>{this.state.completedCount}</h2> words.</p>
                    <Button className="btn" primary={true} onClick={this.gameStart}>RESTART</Button>
                </div>
            </div>

        )
        gameStartSelect = (
            <div><h1>TYPING GAME</h1>
                <div className="lower-sec">
                    <p>Test your vocab and typing speed at the same time.</p>
                    <Button className="btn" primary={true} onClick={() => { this.gameStart() }}>START</Button>
                </div>
            </div>
        )

        return (

            <div>{this.state.gameOver ? gameOverResult : this.state.gameStart ? gameBoard : gameStartSelect}</div>

        );
    }
}

export default game;
