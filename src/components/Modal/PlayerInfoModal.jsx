import React, { useEffect, useState } from "react";
import "./PlayerInfoModal.css";
import Modal from "react-bootstrap/Modal";
import { motion } from "framer-motion";
import ModalBackDrop from "../Backdrop/ModalBackDrop";
import playerItems from "../../data/player.json";
import { IoClose } from "react-icons/io5";
import { IoBandage } from "react-icons/io5";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function PlayerInfoModal({
  handelClose,
  show,
  localCurrentPlayer,
  injuryStatus,
  flagCode,
  defaultStat,
  hasStats,
  currentSelectedPlayer,
  playerInfoModalID, 
  getPlayers
}) {
  // Path for Stats
  // console.log(info.stats[0].splits[0].stat.games)

  const [playerStats, setPlayerStats] = useState({
    games: localCurrentPlayer[0].stats[0].splits[0].stat.games,
    goals: localCurrentPlayer[0].stats[0].splits[0].stat.goals,
    assists: localCurrentPlayer[0].stats[0].splits[0].stat.assists,
    points: localCurrentPlayer[0].stats[0].splits[0].stat.points,
    powerPlayGoals:
      localCurrentPlayer[0].stats[0].splits[0].stat.powerPlayGoals,
    powerPlayPoints:
      localCurrentPlayer[0].stats[0].splits[0].stat.powerPlayPoints,
    penaltyMinutes:
      localCurrentPlayer[0].stats[0].splits[0].stat.penaltyMinutes,
    plusMinus: localCurrentPlayer[0].stats[0].splits[0].stat.plusMinus,
    shots: localCurrentPlayer[0].stats[0].splits[0].stat.shots,
    hits: localCurrentPlayer[0].stats[0].splits[0].stat.hits,
    faceOffPct: localCurrentPlayer[0].stats[0].splits[0].stat.faceOffPct,
    blocked: localCurrentPlayer[0].stats[0].splits[0].stat.blocked,
    timeOnIcePerGame:
      localCurrentPlayer[0].stats[0].splits[0].stat.timeOnIcePerGame,
  });

  const [currentStats, setCurrentStats] = useState({});

  useEffect(() => {
    if (hasStats === true) {
      console.log("hasStats: " + hasStats);
      console.log(playerStats)
    
      // console.log(playerStats.games)
      // console.log(currentSelectedPlayer)
      // console.log(currentSelectedPlayer.stats[0].splits[0].stat.games)
      // setCurrentStats(() => {
      //   localCurrentPlayer[0].stats[0].splits[0].stat;
      // });
      // console.log(currentStats);
    } else {
      console.log(currentSelectedPlayer)
    }
    console.log(defaultStat)
  }, []);

  // const [playerStats, setPlayerStats] = useState({
  //   games: 0,
  //   goals: 0,
  //   assets: 0,
  //   points: 0,
  //   powerPlayerGoals: 0,
  //   powerPlayPoints: 0,
  //   penaltyMinutes: 0,
  //   plusMinus: 0,
  //   shots: 0,
  //   hits: 0,
  //   faceOffPct: 0,
  //   blocked: 0,
  //   timeOnIcePerGame: 0
  // });

  // useEffect(() => {
  //   if(hasStats === false) {
  //     console.log("hasStats: " + hasStats)
  //     setPlayerStats(() => {[...defaultStat]})
  //   } else if (hasStats === true) {
  //     setPlayerStats(localCurrentPlayer[0].stats[0].splits[0].stat);
  //   }
  // }, [])

  // const CurrentPlayerStats = {
  // stat: {
  //   games: localCurrentPlayer[0].stats[0].splits[0].stat.games,
  //   goals: localCurrentPlayer[0].stats[0].splits[0].stat.goals,
  //   assets: localCurrentPlayer[0].stats[0].splits[0].stat.assists,
  //   points: localCurrentPlayer[0].stats[0].splits[0].stat.points,
  //   powerPlayerGoals: localCurrentPlayer[0].stats[0].splits[0].stat.powerPlayGoals,
  //   powerPlayPoints: localCurrentPlayer[0].stats[0].splits[0].stat.powerPlayPoints,
  //   penaltyMinutes: localCurrentPlayer[0].stats[0].splits[0].stat.penaltyMinutes,
  //   plusMinus: localCurrentPlayer[0].stats[0].splits[0].stat.plusMinus,
  //   shots: localCurrentPlayer[0].stats[0].splits[0].stat.shots,
  //   hits: localCurrentPlayer[0].stats[0].splits[0].stat.hits,
  //   faceOffPct: localCurrentPlayer[0].stats[0].splits[0].stat.faceOffPct,
  //   blocked: localCurrentPlayer[0].stats[0].splits[0].stat.blocked,
  //   timeOnIcePerGame: localCurrentPlayer[0].stats[0].splits[0].stat.timeOnIcePerGame
  // }
  // }

  //   console.log(defaultStats.stat.games)
  //   console.log(CurrentPlayerStats)

  //   useEffect(() => {
  //     if (localCurrentPlayer[0].stats[0].splits[0] === undefined) {
  //       console.log('no stats')
  //     }
  //   }, [])

  useEffect(() => {
    console.log(...localCurrentPlayer);
    console.log(playerStats.goals)
    // getPlayers(playerInfoModalID)
    // console.log(playerStats.games);
    // console.log(defaultStat.games)
  }, [localCurrentPlayer]);

  const info = localCurrentPlayer[0];

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
        ease: 'easeOut',
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
          <div className="player-profile-display">
            <div className="image-container">
              <img
                className="player-image"
                src={imgs.imgURL}
                alt="player image"
              ></img>
            </div>
            <h1>
              <IoBandage className={`${injuryStatus}`} />
              {info.fullName}
            </h1>
            <h2>{info.primaryNumber}</h2>
            <span className="divider" />
          </div>
          <div className="player-profile-info">
            <ul className="info-list">
              <li>
                Position: <span className='space-span'>{info.primaryPosition.name}</span>
              </li>
              <li>
                Height: <span className='space-span'>{info.height}</span>
              </li>
              <li>
                Weight: <span className='space-span'>{info.weight}lbs</span>
              </li>
              <li>
                Shoots: <span className='space-span'>{info.shootsCatches}</span>
              </li>
              <li>
                Age: <span className='space-span'>{info.currentAge}</span>
              </li>
              <li>
                Nationality:{" "}
                <span
                  className={`${flagCode}`}
                  style={{
                    borderRadius: "50%",
                    border: "1px solid var(--CBJ-silver)",
                  }}
                ></span>
              </li>
            </ul>
          </div>
          <div className="player-profile-stats">
            <button className="btn-close" onClick={handelClose}>
              <IoClose className="close-icon" />
            </button>
            <ul className="stats-list">
              <h1 className="stats-label">Stats</h1>
              <li>
                Games: <span className='space-span'>{playerStats.games}</span>
              </li>
              <li>
                Goals: <span className='space-span'>{playerStats.goals}</span>
              </li>
              <li>
                Assists: <span className='space-span'>{playerStats.assists}</span>
              </li>
              <li>
                Points: <span className='space-span'>{playerStats.points}</span>
              </li>
              <li>
                PP Goals: <span className='space-span'>{playerStats.powerPlayGoals}</span>
              </li>
              <li>
                PP Points: <span className='space-span'>{playerStats.powerPlayPoints}</span>
              </li>
              <li>
                PIM: <span className='space-span'>{playerStats.penaltyMinutes}</span>
              </li>
              <li>
                Plus/Minus: <span className='space-span'>{playerStats.plusMinus}</span>
              </li>
              <li>
                Shots: <span className='space-span'>{playerStats.shots}</span>
              </li>
              <li>
                Hits: <span className='space-span'>{playerStats.hits}</span>
              </li>
              <li>
                Faceoffs: <span className='space-span'>{playerStats.faceOffPct}%</span>
              </li>
              <li>
                Blocks Shots: <span className='space-span'>{playerStats.blocked}</span>
              </li>
              <li>
                Average TOI: <span className='space-span'>{playerStats.timeOnIcePerGame}</span>
              </li>
            </ul>
          </div>
        </motion.div>
    </ModalBackDrop>
  );
}
