import React, { useState, useEffect } from "react";
import "./PlayerInfoModal.css";
import Modal from "react-bootstrap/Modal";
import { usePlayers } from '../context/PlayerContext';
import playerItems from '../data/player.json'
import { CgClose } from 'react-icons/cg'

export default function PlayerInfoModal({
  playerID,
  handelClose,
  show,
  handelClick,
  playerInfo,
  localCurrentPlayer
}) {

  // Set Image URLS
  // const item = playerItems.find((i) => i.id === playerInfo[0].id);
  // if (item == null) return null;

  // const [playerFullName, setPlayerFullName] = useState("");



  // const [infoP, setInfo] = useState({});

  // useEffect(() => {
  //   setInfo(playerInfo[0]);
  //   console.log(infoP);
  // }, [playerInfo, info]);

  // Path for Stats
  // console.log(info.stats[0].splits[0].stat.games)

  // console.log(info)

  // console.log(playerInfo[0])

  // const info = playerInfo[0]



  const info = localCurrentPlayer[0];

  const imgs = playerItems.find((item) => item.id === info.id)
  if (imgs == null) return null;

  return (
    <Modal className="player-info-container" show={show} onHide={handelClick}>
      <div className="player-info-modal">
        <div className="player-profile-display">
          <div className="image-container">
            <img
              className="player-image"
              src={imgs.imgURL}
              alt="player image"
            ></img>
          </div>
          <h1>{info.fullName}</h1>
          <h2>{info.primaryNumber}</h2>
          <span className="divider" />
        </div>
        <div className="player-profile-info">
          <ul className="info-list">
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
              Shoots: <span>{info.shootsCatches}</span>
            </li>
            <li>
              Age: <span>{info.currentAge}</span>
            </li>
            <li>
              Nationality: <span>{info.nationality}</span>
            </li>
          </ul>
        </div>
        <div className="player-profile-stats">
          <button className="btn-close" onClick={handelClose}>
            <CgClose/>
          </button>
          <ul className="stats-list">
            <h1 className="stats-label">Stats</h1>
            <li>
              Games: <span>{info.stats[0].splits[0].stat.games}</span>
            </li>
            <li>
              Goals: <span>{info.stats[0].splits[0].stat.goals}</span>
            </li>
            <li>
              Assists: <span>{info.stats[0].splits[0].stat.assists}</span>
            </li>
            <li>
              Points: <span>{info.stats[0].splits[0].stat.points}</span>
            </li>
            <li>
              PP Goals: <span>{info.stats[0].splits[0].stat.powerPlayGoals}</span>
            </li>
            <li>
              PP Points: <span>{info.stats[0].splits[0].stat.powerPlayPoints}</span>
            </li>
            <li>
              PIM: <span>{info.stats[0].splits[0].stat.penaltyMinutes}</span>
            </li>
            <li>
              Plus/Minus: <span>{info.stats[0].splits[0].stat.plusMinus}</span>
            </li>
            <li>
              Shots: <span>{info.stats[0].splits[0].stat.shots}</span>
            </li>
            <li>
              Hits: <span>{info.stats[0].splits[0].stat.hits}</span>
            </li>
            <li>
              Faceoffs: <span>{info.stats[0].splits[0].stat.faceOffPct}%</span>
            </li>
            <li>
              Blocks Shots: <span>{info.stats[0].splits[0].stat.blocked}</span>
            </li>
            <li>
              Average TOI: <span>{info.stats[0].splits[0].stat.timeOnIcePerGame}</span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
