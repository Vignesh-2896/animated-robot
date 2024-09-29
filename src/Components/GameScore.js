import React from "react";
import PropTypes from "prop-types";

const GameScore = (props) => {
  // Component to display the scores.
  return (
    <div className="GameScore">
      <h4>Current Score : {props.curScore}</h4>
      <h4>Best Score : {props.bstScore}</h4>
    </div>
  );
};

GameScore.propTypes = {
  curScore: PropTypes.number,
  bstScore: PropTypes.number,
};

export { GameScore };
