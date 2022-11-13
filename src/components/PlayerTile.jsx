import React from "react";
import "./PlayerTile.css";

export default function PlayerTile({
  number,
  position,
  shoots,
  lastName,
  onClick,
  passPlayerID, 
  id

}) {
const currentPlayerHandler = () => {
  onClick(id)
  // passPlayerID(id)
  // console.info('ID from PlayerTile: ' + id)

}

  return (
    <div className="player-tile" onClick={currentPlayerHandler}>
      <h3 className="player-name">{lastName}</h3>
      <h1 className="player-number">{number}</h1>
      <h4 className="player-position">{position}</h4>
    </div>
  );
}
