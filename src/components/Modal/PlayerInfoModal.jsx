import React, { useEffect, useState } from "react";
import "./PlayerInfoModal.css";
import { motion } from "framer-motion";
import ModalBackDrop from "../Backdrop/ModalBackDrop";
import playerItems from "../../data/player.json";
import { IoClose } from "react-icons/io5";
import { IoMdPulse } from "react-icons/io";
import { FaUserTie } from "react-icons/fa"
import { GiCancel } from "react-icons/gi"
import { GiCannon } from "react-icons/gi";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function PlayerInfoModal({
  handelClose,
  show,
  localCurrentPlayer,
  injuryStatus,
  scratchedStatus,
  flagCode,
  hasStats,
  addBirthPlace,
  birthPlace,
  shoots,
  shootsFormatter
}) {
  // Path for Stats
  // console.log(info.stats[0].splits[0].stat.games)

  const [playerStats, setPlayerStats] = useState({
    games: 0,
    goals: 0,
    assists: 0,
    points: 0,
    powerPlayGoals: 0,
    powerPlayPoints: 0,
    penaltyMinutes: 0,
    plusMinus: 0,
    shots: 0,
    hits: 0,
    faceOffPct: 0,
    blocked: 0,
    timeOnIcePerGame: 0,
  });

  useEffect(() => {
    if (hasStats === true) {
      setPlayerStats({
        games: localCurrentPlayer[0].stats[0].splits[0].stat.games,
        goals: localCurrentPlayer[0].stats[0].splits[0].stat.goals,
        assists: localCurrentPlayer[0].stats[0].splits[0].stat.assists,
        points: localCurrentPlayer[0].stats[0].splits[0].stat.points,
        powerPlayGoals: localCurrentPlayer[0].stats[0].splits[0].stat.powerPlayGoals,
        powerPlayPoints: localCurrentPlayer[0].stats[0].splits[0].stat.powerPlayPoints,
        penaltyMinutes: localCurrentPlayer[0].stats[0].splits[0].stat.penaltyMinutes,
        plusMinus: localCurrentPlayer[0].stats[0].splits[0].stat.plusMinus,
        shots: localCurrentPlayer[0].stats[0].splits[0].stat.shots,
        hits: localCurrentPlayer[0].stats[0].splits[0].stat.hits,
        faceOffPct: localCurrentPlayer[0].stats[0].splits[0].stat.faceOffPct,
        blocked: localCurrentPlayer[0].stats[0].splits[0].stat.blocked,
        timeOnIcePerGame: localCurrentPlayer[0].stats[0].splits[0].stat.timeOnIcePerGame,
      });

      // Change Player Info 
      // if (localCurrentPlayer[0].id === 8478967) {
      //   localCurrentPlayer[0].primaryNumber = 18
      // }
      // if (localCurrentPlayer[0].id === 8478460) {
      //   localCurrentPlayer[0].rosterStatus = "I"
      // }
      // if (localCurrentPlayer[0].id === 8474679) {
      //   localCurrentPlayer[0].rosterStatus = "I"
      // }
      // if (localCurrentPlayer[0].id === 8483565) {
      //   localCurrentPlayer[0].rosterStatus = "I"
      // }
      // console.log(playerStats);
    }
  }, []);

  useEffect(() => {
    console.log(...localCurrentPlayer);
  }, [localCurrentPlayer]);

  const info = localCurrentPlayer[0];

  // const [birthPlace, setBirthPlace] = useState()

  // function addBirthPlace(birthCity, birthCountry, birthStateProvince) {
  //   if (birthStateProvince === undefined) {
  //     const birthPlace = birthCity + ', ' + birthCountry
  //     setBirthPlace(birthPlace)
  //     console.log(birthPlace);
  //   } else {
  //     const birthPlace = birthCity + ', ' + birthStateProvince + ', ' + birthCountry
  //     setBirthPlace(birthPlace)
  //     console.log(birthPlace);
  //   }

  // }

  useEffect(() => {
    addBirthPlace(info.birthCity, info.birthCountry, info.birthStateProvince)
    shootsFormatter(info.shootsCatches)
  }, []);

  const imgs = playerItems.find((item) => item.id === info.id);
  if (imgs == null) return null;

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 450,
      },
    },
    exit: {
      y: "-100vh",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <ModalBackDrop show={show} onHide={handelClose} onClick={handelClose}>
      <motion.div
        key="player-info-modal"
        className="player-info-modal"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="player-info-container">
        <div className="player-profile-display">
          <div className="image-container">
            <img
              className="player-image"
              src={imgs.imgURL}
              alt="player image"
            ></img>
          </div>
          <h1>
            <IoMdPulse className={`${injuryStatus}`}/>
            <GiCancel className={`${scratchedStatus}`}/>
            {info.fullName}
          </h1>
          <h2>{info.primaryNumber}</h2>
          <span className="divider" />
        </div>
        <div className="player-profile-info">
          <ul className="info-list">
          <div className="info-left"> 
            <li>
              Position:{" "}
              <span className="space-span">{info.primaryPosition.name}</span>
            </li>
            <li>
              Height: <span className="space-span">{info.height}</span>
            </li>
            <li>
              Weight: <span className="space-span">{info.weight}lbs</span>
            </li>
            <li>
              Shoots: <span className="space-span">{shoots}</span>
            </li>
            </div>
            <div className="info-right">
            <li>
              Age: <span className="space-span">{info.currentAge}</span>
            </li>
            <li>
              Nationality:
              <span
                className={`${flagCode}`}
                style={{
                  borderRadius: "50%",
                  border: "1px solid var(--CBJ-silver)",
                  height: '1.2rem',
                  width: '1.2rem',
                  top: '-1px',
                  left: '2.5px',
                  backgroundSize: "cover"
                }}
              ></span>
            </li>
            <li>
             Birthplace : <span className="space-span">{birthPlace}</span>
            </li>
            </div>
          </ul>
          </div>
        </div>
        <div className="player-profile-stats">
          <button className="btn-close" onClick={handelClose}>
            <IoClose className="close-icon" />
          </button>
          <ul className="stats-list">
            <h1 className="stats-label">Stats</h1>
            <li>
              Games: <span className="space-span">{playerStats.games}</span>
            </li>
            <li>
              Goals: <span className="space-span">{playerStats.goals}</span>
            </li>
            <li>
              Assists: <span className="space-span">{playerStats.assists}</span>
            </li>
            <li>
              Points: <span className="space-span">{playerStats.points}</span>
            </li>
            <li>
              PP Goals:{" "}
              <span className="space-span">{playerStats.powerPlayGoals}</span>
            </li>
            <li>
              PP Points:{" "}
              <span className="space-span">{playerStats.powerPlayPoints}</span>
            </li>
            <li>
              PIM:{" "}
              <span className="space-span">{playerStats.penaltyMinutes}</span>
            </li>
            <li>
              Plus/Minus:{" "}
              <span className="space-span">{playerStats.plusMinus}</span>
            </li>
            <li>
              Shots: <span className="space-span">{playerStats.shots}</span>
            </li>
            <li>
              Hits: <span className="space-span">{playerStats.hits}</span>
            </li>
            <li>
              Faceoffs:{" "}
              <span className="space-span">{playerStats.faceOffPct}%</span>
            </li>
            <li>
              Blocks Shots:{" "}
              <span className="space-span">{playerStats.blocked}</span>
            </li>
            <li>
              Average TOI:{" "}
              <span className="space-span">{playerStats.timeOnIcePerGame}</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </ModalBackDrop>
  );
}
