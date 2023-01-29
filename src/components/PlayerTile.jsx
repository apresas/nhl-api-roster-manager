import React, { useState, useEffect, useRef } from "react";
import "./PlayerTile.css";
import { GiAmbulance } from "react-icons/gi";
import { MdPersonalInjury } from "react-icons/md";
import { FaUserInjured } from "react-icons/fa";
import { GrStar } from "react-icons/gr";
import VanillaTilt from "vanilla-tilt";

function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}

export default function PlayerTile({
  number,
  position,
  lastName,
  onClick,
  id,
  rosterStatus,
}) {
  const currentPlayerHandler = () => {
    onClick(id);
  };

  const options = {
    scale: 1.12,
    perspective: 1000,
    speed: 300,
    max: 15,
    reset: true,
    reverse: true,
    glare: true,
    "max-glare": 0.2,
    "glare-prerender": true,
  };

  const [isInjuredIcon, setIsInjuredIcon] = useState();
  const [isInjuredBorder, setIsInjuredBorder] = useState();
  const [isInjuredContent, setIsInjuredContent] = useState();

  useEffect(() => {
    if (rosterStatus.includes("I")) {
      setIsInjuredIcon("injury-icon-active");
      setIsInjuredBorder("player-tile-injury");
      setIsInjuredContent('player-content-injury')
    } else {
      setIsInjuredIcon("injury-icon");
      setIsInjuredBorder("player-tile");
      setIsInjuredContent('player-content')
    }
  }, [isInjuredBorder]);

  return (
    <Tilt
      className="box"
      options={options}
      style={{
        transformStyle: "perserve-3d",
        transform: "perspective(1000px)",
        borderRadius: "12px",
      }}
    >
      <div
        className={`${isInjuredBorder}`}
        onClick={currentPlayerHandler}
        style={{ transform: "translateZ(70px)" }}
      >
        <div className="navy-border"></div>
        <div className="red-border"></div>
        <div className="white-border"></div>
        <h3 className="player-name">{lastName}</h3>
        <h1 className="player-number">{number}</h1>
        <div className="position-container">
          <h4 className="player-position">
            <div className="left-divider">
              {/* <GrStar /> */}
              <GrStar />
            </div>
            {position}
            <div className="right-divider">
              <GrStar />
              {/* <GrStar /> */}
            </div>
          </h4>
        </div>
        <GiAmbulance className={`${isInjuredIcon}`} />
      </div>
      <div
        className="js-tilt-glare"
        style={{position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', borderRadius: 'inherit'}}
      >
        <div
          className="js-tilt-glare-inner"
          style={{position: 'absolute', top: '50%', left: '50%', pointerEvents: 'none', backgroundImage: 'linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)', transform: 'rotate(180deg) translate(-50%, -50%)', transformOrigin: '0% 0% 0px', opacity: '0', width: '364px', height: '364px'}}
        ></div>
      </div>
    </Tilt>
  );
}
