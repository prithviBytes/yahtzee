import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  static defaultProps = {
    numberWords: ["one", "two", "three", "four", "five", "six"],
    val: 5
  };
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.handleClick(this.props.idx);
  }
  render() {
    let classes = `Die fa-3x fas fa-dice-${
      this.props.numberWords[this.props.val - 1]
    } `;
    if (this.props.locked) classes += " Die-locked ";
    if (this.props.rolling) classes += " Die-rolling ";
    return (
      <i
        className={classes}
        disabled={this.props.disabled}
        onClick={this.handleClick}
      />
    );
  }
}

export default Die;
