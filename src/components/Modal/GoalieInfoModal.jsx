import React, { useState, useEffect } from "react";
import "./PlayerInfoModal.css";
import { motion } from "framer-motion";
import ModalBackDrop from "../Backdrop/ModalBackDrop";
import playerItems from "../../data/player.json";
import { IoClose } from "react-icons/io5";
import { IoMdPulse } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { MdSportsHockey } from "react-icons/md";
import { IoBandage } from "react-icons/io5";
import { GrStar } from "react-icons/gr";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function PlayerInfoModal({
  handelClose,
  show,
  localCurrentPlayer,
  flagCode,
  injuryStatus,
  hasStats,
  birthPlace,
  addBirthPlace,
  percentFormatter,
  shoots,
  shootsFormatter,
  getPlayer,
  scratchPlayerStatus,
  injuryPlayerStatus,
  activePlayerStatus,
}) {
  // Path for Stats
  // console.log(info.stats[0].splits[0].stat.games)

  const [goalieStats, setGoalieStats] = useState({
    games: 0,
    gamesStarted: 0,
    wins: 0,
    losses: 0,
    ot: 0,
    shutouts: 0,
    savePercentage: 0,
    goalAgainstAverage: 0,
    shotsAgainst: 0,
    goalsAgainst: 0,
    evenStrengthSavePercentage: 0,
    powerPlaySavePercentage: 0,
    shortHandedSavePercentage: 0,
  });

  useEffect(() => {
    if (hasStats === true) {
      setGoalieStats({
        games: localCurrentPlayer[0].stats[0].splits[0].stat.games,
        gamesStarted:
          localCurrentPlayer[0].stats[0].splits[0].stat.gamesStarted,
        wins: localCurrentPlayer[0].stats[0].splits[0].stat.wins,
        losses: localCurrentPlayer[0].stats[0].splits[0].stat.losses,
        ot: localCurrentPlayer[0].stats[0].splits[0].stat.ot,
        shutouts: localCurrentPlayer[0].stats[0].splits[0].stat.shutouts,
        savePercentage:
          localCurrentPlayer[0].stats[0].splits[0].stat.savePercentage,
        goalAgainstAverage:
          localCurrentPlayer[0].stats[0].splits[0].stat.goalAgainstAverage,
        shotsAgainst:
          localCurrentPlayer[0].stats[0].splits[0].stat.shotsAgainst,
        goalsAgainst:
          localCurrentPlayer[0].stats[0].splits[0].stat.goalsAgainst,
        evenStrengthSavePercentage:
          localCurrentPlayer[0].stats[0].splits[0].stat
            .evenStrengthSavePercentage,
        powerPlaySavePercentage:
          localCurrentPlayer[0].stats[0].splits[0].stat.powerPlaySavePercentage,
        shortHandedSavePercentage:
          localCurrentPlayer[0].stats[0].splits[0].stat
            .shortHandedSavePercentage,
      });
      // console.log(playerStats);
    }
  }, []);

  const info = localCurrentPlayer[0];

  const imgs = playerItems.find((item) => item.id === info.id);
  if (imgs == null) return null;

  useEffect(() => {
    addBirthPlace(info.birthCity, info.birthCountry, info.birthStateProvince);
    shootsFormatter(info.shootsCatches);
  }, []);

  function setScratch() {
    scratchPlayerStatus(getPlayer);
    handelClose();
  }

  function setInjury() {
    injuryPlayerStatus(getPlayer);
    handelClose();
  }

  function setActive() {
    activePlayerStatus(getPlayer);
    handelClose();
  }

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
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return (
    <ModalBackDrop show={show} onHide={handelClose} onClick={handelClose}>
      <motion.div
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
              <IoMdPulse className={`${injuryStatus}`} />
              {info.fullName}
            </h1>
            <h2>{info.primaryNumber}</h2>
            <span className="divider" />
          </div>
          <div className="player-profile-info">
            <ul className="info-list">
              <div className="info-left">
                <li>
                  Position: <span>{info.primaryPosition.name}</span>
                </li>
                <li>
                  Height: <span>{info.height}</span>
                </li>
                <li>
                  Weight: <span>{info.weight}lbs</span>
                </li>
                <li>
                  Catches: <span>{shoots}</span>
                </li>
                <li>
                  Age: <span>{info.currentAge}</span>
                </li>
              </div>
              <div className="info-right">
                <li>
                  Nationality:
                  <span
                    className={`${flagCode} flag`}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid var(--CBJ-silver)",
                      height: "1.2rem",
                      width: "1.2rem",
                      top: "-1px",
                      left: "2.5px",
                      backgroundSize: "cover",
                    }}
                  ></span>
                </li>
                <li>
                  Birthplace : <span className="space-span">{birthPlace}</span>
                </li>
                {/* <li className="cannon_li">
                  <GrStar style={{zIndex:"0"}}/>
                  <GrStar style={{zIndex:"0"}}/>
                  <GrStar style={{zIndex:"0"}}/>
                  <GrStar style={{zIndex:"0"}}/>
                  <GrStar style={{zIndex:"0"}}/>
                  <GrStar style={{zIndex:"0"}}/>
                  <GrStar style={{zIndex:"0"}}/>
                  <GrStar style={{zIndex:"0"}}/>
                  <GrStar style={{zIndex:"0"}}/>
                  <GrStar style={{zIndex:"0"}}/>
                  <GrStar style={{zIndex:"0"}}/>
                  <GrStar style={{zIndex:"0"}}/>
                  <GrStar style={{zIndex:"0"}}/>
                </li> */}
                <li className="controller_li">
                  <button className="btn btn-injured" onClick={setInjury}>
                    Injury{" "}
                    <span>
                      <GiHealthNormal />
                    </span>
                  </button>
                  <button className="btn btn-scratched" onClick={setScratch}>
                    Scratch{" "}
                    <span>
                      <FaUserTie />
                    </span>
                  </button>
                  <button className="btn btn-active" onClick={setActive}>
                    Active{" "}
                    <span>
                      <MdSportsHockey />
                    </span>
                  </button>
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
              Games: <span>{goalieStats.games}</span>
            </li>
            <li>
              Games Started: <span>{goalieStats.gamesStarted}</span>
            </li>
            <li>
              Record:{" "}
              <span>
                {goalieStats.wins} - {goalieStats.losses} - {goalieStats.ot}{" "}
              </span>
            </li>
            <li>
              Shutouts: <span>{goalieStats.shutouts}</span>
            </li>
            <li>
              Save %:{" "}
              <span>{percentFormatter(goalieStats.savePercentage)}%</span>
            </li>
            <li>
              GAA:{" "}
              <span>{percentFormatter(goalieStats.goalAgainstAverage)}</span>
            </li>
            <li>
              SA: <span>{goalieStats.shotsAgainst}</span>
            </li>
            <li>
              GA: <span>{goalieStats.goalsAgainst}</span>
            </li>
            <li>
              EV Save %:{" "}
              <span>
                {percentFormatter(goalieStats.evenStrengthSavePercentage)}%
              </span>
            </li>
            <li>
              PP Save %:{" "}
              <span>
                {percentFormatter(goalieStats.powerPlaySavePercentage)}%
              </span>
            </li>
            <li>
              PK Save %:{" "}
              <span>
                {percentFormatter(goalieStats.shortHandedSavePercentage)}%
              </span>
            </li>
          </ul>
        </div>
      </motion.div>
    </ModalBackDrop>
  );
}
