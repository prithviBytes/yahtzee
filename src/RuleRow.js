import React, { Component } from "react";
import "./RuleRow.css";

class RuleRow extends Component {
  render() {
    let { score, doScore, name, description } = this.props;
    return (
      <tr
        className={`RuleRow RuleRow-${
          score === undefined ? "active" : "disabled"
        }`}
        onClick={score === undefined ? doScore : null}
      >
        <td className="RuleRow-name">{name}</td>
        <td
          className={score === undefined ? "Game-description" : "RuleRow-score"}
        >
          {score === undefined ? description : score}
        </td>
      </tr>
    );
  }
}

export default RuleRow;
