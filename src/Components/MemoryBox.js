import React from "react";

const MemoryBox = (props) => {

    return (
        <div key = {props.characterName} className = "memory-box">
            <div className = "memory-box-image"><img height = "320" width = "300" alt = {props.characterName} src = {props.characterImage} /></div>
            <div className = "memory-box-title"><h3>{props.characterName}</h3></div>
        </div>
    )
};

export {MemoryBox};