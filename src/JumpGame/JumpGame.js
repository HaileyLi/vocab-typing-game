import React, { Component } from "react";
import './JumpGame.css';

// ES2015 module syntax
import {
    Button
} from '@progress/kendo-react-buttons';

class JumpGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            jump: false,
            gameOver: false,
            gameStart: false,
            activeWord: this.props.data[0],
            completedCount: 0,
            typedLetter: "",
            random: 0,
            offLeft: '20%',
            speed: 1
        };
    }

    componentWillMount() {
        this.setState({
            random: Math.floor(2 + (Math.random() * (this.state.activeWord.length - 2)))
        })

        document.addEventListener('keydown', function (e) {
            e.preventDefault();

            if (e.key === this.state.activeWord[this.state.random]) {
                this.setState({
                    jump: !this.state.jump
                })

                var nextWordIndex = Math.floor(1 + (Math.random() * (this.state.data.length)));
                var completedWords = this.state.completedCount + 1;
                this.setState({
                    activeWord: this.state.data[nextWordIndex],
                    completedCount: completedWords

                })
            }
        }.bind(this));

        document.addEventListener('keyup', function () {
            if (this.state.jump === true) {
                setTimeout(this.setState({ jump: !this.state.jump }), 100000);
            }

        }.bind(this));
    }

    generateWord = (word) => {
        var len = word.length;
        var random = this.state.random;
        return (word.slice(0, random) + "❔" + word.slice(random + 1, len))
    }

    rating() {
        if (this.state.completedCount < 2) {
            return '😫'
        }
        else if (this.state.completedCount < 4) {
            return '😐'
        }
        else if (this.state.completedCount < 6) {
            return '😊'
        }
        else if (this.state.completedCount < 8) {
            return '😃'
        }
        else {
            return '😎'
        }
    }

    gameStart = () => {
        this.setState({
            gameStart: true,
            gameOver: false,
            completedCount: 0,
            offLeft: '20%',
            speed: 1,
            random: Math.floor(2 + (Math.random() * (this.state.activeWord.length - 2)))
        });

        this.interval = setInterval(this.movement, 100);
    }

    movement = () => {
        let newMove;
        let num = this.state.offLeft.slice(0, -1)

        if (Number(num) === 81) {
            newMove = (20).toString() + "%";
        } else if (Number(num) === 80) {
            newMove = (81).toString() + "%";
        } else {
            newMove = (Number(num) + this.state.speed).toString() + "%";
        }
        this.setState({
            offLeft: newMove
        })

        if (Number(this.state.offLeft.slice(0, -1)) > 75 && this.state.jump === false) {
            window.clearInterval(this.interval);
            this.setState({
                completedCount: this.state.completedCount,
                gameStart: false,
                gameOver: true
            })

        }





    }


    render() {
        let gameOverResult;
        let gameBoard;
        let gameStartSelect;

        const status = this.state.jump ? 'jump' : 'run';

        gameOverResult = (
            <div>
                <h1>GAME OVER!</h1>
                <div className="lower-sec">
                    <p>Your Score: <h2>{this.state.completedCount}</h2> words.{this.rating()}</p>
                    <Button className="btn" primary={true} onClick={this.gameStart}>RESTART</Button>
                </div>
            </div>

        )

        gameBoard = (
            <div>
                <div className="upper-row">
                    <div className="score">Your Score: {this.state.completedCount}</div>
                </div>
                <div className="middle-row">
                    <h2>{this.generateWord(this.state.activeWord)}</h2>
                </div>

                <div className="jump-area">
                    <div id="char" className={`character ${status}`}></div>
                    <div id="mountain" className="mountain" style={{ right: this.state.offLeft }}></div>
                    <div className="ground"></div>
                </div>

            </div>)

        gameStartSelect = (
            <div><h1>JUMPING GAME</h1>
                <div className="lower-sec">
                    <p>FILL OUT AS MANY MISSING CHARS AS YOU CAN. WATCH OUT!</p>
                    <Button className="btn" primary={true} onClick={() => { this.gameStart() }}>START</Button>
                </div>
            </div>
        )


        return (



            <div>{this.state.gameOver ? gameOverResult : this.state.gameStart ? gameBoard : gameStartSelect}</div>

        );
    }
}

export default JumpGame;
