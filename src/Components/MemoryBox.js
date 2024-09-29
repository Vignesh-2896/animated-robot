import React from "react";
import PropTypes from "prop-types";

const MemoryBox = (props) => {
  // Component to display a characters on the game screen.

  return (
    <div
      key={props.characterName}
      className="memory-box"
      onClick={() => props.buttonAction(props.characterName)}
      onKeyUp={() => props.buttonAction(props.characterName)}
    >
      <div className="memory-box-image">
        <img
          height="180"
          width="180"
          alt={props.characterName}
          src={props.characterImage}
        />
      </div>
      <div className="memory-box-title">
        <h3>{props.characterName}</h3>
      </div>
    </div>
  );
};

MemoryBox.propTypes = {
    characterName: PropTypes.string,
    characterImage: PropTypes.string,
    buttonAction: PropTypes.func
}

export { MemoryBox };
