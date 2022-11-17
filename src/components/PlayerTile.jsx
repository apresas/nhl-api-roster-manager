import React, { useState, useEffect } from "react";
import "./PlayerTile.css";
import { GiAmbulance } from "react-icons/gi";

export default function PlayerTile({
  number,
  position,
  shoots,
  lastName,
  onClick,
  passPlayerID,
  id,
  rosterStatus,
}) {
  const currentPlayerHandler = () => {
    onClick(id);
  };

  const [isInjuredIcon, setIsInjuredIcon] = useState();
  const [isInjuredBorder, setIsInjuredBorder] = useState();

  useEffect(() => {
    if (rosterStatus.includes("I")) {
      setIsInjuredIcon("injury-icon-active");
      setIsInjuredBorder("player-tile-injury");
    } else {
      setIsInjuredIcon("injury-icon");
      setIsInjuredBorder("player-tile");
    }
  }, [isInjuredBorder]);

  return (
    <div className={`${isInjuredBorder}`} onClick={currentPlayerHandler}>
      <h3 className="player-name">{lastName}</h3>
      <h1 className="player-number">{number}</h1>
      <h4 className="player-position">{position}</h4>
      <GiAmbulance className={`${isInjuredIcon}`} />
    </div>
  );
}
