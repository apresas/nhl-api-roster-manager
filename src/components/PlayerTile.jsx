import React from "react";
import "./PlayerTile.css";

export default function PlayerTile({
  number,
  position,
  shoots,
  lastName,

}) {
  return (
    <div className="player-tile">
      <h3 className="player-name">{lastName}</h3>
      <h1 className="player-number">{number}</h1>
      <h4 className="player-position">{position}</h4>
      <h5 className="player-shoots">{shoots}</h5>
    </div>
  );
}
