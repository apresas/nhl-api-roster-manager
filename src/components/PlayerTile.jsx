import React, { useState, useEffect } from "react";
import "./PlayerTile.css";
import { GiAmbulance } from "react-icons/gi";
import { GrStar } from "react-icons/gr";
import { BiPlusMedical } from "react-icons/bi";

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
      <div className="navy-border"></div>
      <div className="red-border"></div>
      <div className="white-border"></div>
      <h3 className="player-name">{lastName}</h3>
      <h1 className="player-number">{number}</h1>
      <div className="position-container">
        <h4 className="player-position">
          <div className="left-divider">
            <GrStar />
            <GrStar />
          </div>
          {position}
          <div className="right-divider">
            <GrStar />
            <GrStar />
          </div>
        </h4>
      </div>
      <GiAmbulance className={`${isInjuredIcon}`} />
    </div>
  );
}
