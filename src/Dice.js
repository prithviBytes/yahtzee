import React, { Component } from "react";
import Die from "./Die";

class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="Dice">
        {this.props.dice.map((d, idx) => (
          <Die
            handleClick={this.props.handleClick}
            val={d}
            locked={this.props.locked[idx]}
            idx={idx}
            disabled={this.props.rollsLeft === 0}
            rolling={this.props.rolling && !this.props.locked[idx]}
            key={idx}
          />
        ))}
      </div>
    );
  }
}

export default Dice;
