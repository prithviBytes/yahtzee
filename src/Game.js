import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLL = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rolling: false,
      rollsLeft: NUM_ROLL,
      scores: {
        ones: undefined,
        tows: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        choice: undefined
      }
    };
    this.animateRoll = this.animateRoll.bind(this);
    this.roll = this.roll.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.doScore = this.doScore.bind(this);
  }
  //Animating Dice and calling the roll after 1 second.
  animateRoll() {
    this.setState({ rolling: true }, () => {
      setTimeout(this.roll, 1000);
    });
  }
  //Rolling the dice after the page loads
  componentDidMount() {
    this.animateRoll();
  }
  //Rolling the Dice whose index are not locked.
  roll(evt) {
    this.setState((st) => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      rolling: false,
      rollsLeft: st.rollsLeft - 1,
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true)
    }));
  }
  //toggle the dice to locked or unlocked
  toggleLocked(idx) {
    if (this.state.rollsLeft !== 0 && !this.state.rolling) {
      this.setState((st) => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  }
  doScore(rulename, ruleFn) {
    this.setState((st) => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLL,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.roll();
  }
  render() {
    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title">Yahtzee!</h1>
          <section className="Game-dice-section">
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              rollsLeft={this.state.rollsLeft}
              rolling={this.state.rolling}
              handleClick={this.toggleLocked}
            />
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll"
                disabled={
                  this.state.locked.every((x) => x) ||
                  this.state.rollsLeft === 0 ||
                  this.state.rolling
                }
                onClick={this.animateRoll}
              >
                {this.state.rollsLeft} Rerolls Left
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </div>
    );
  }
}

export default Game;
