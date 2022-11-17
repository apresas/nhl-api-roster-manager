import React, { useState, useEffect } from "react";
import "./PlayerInfoModal.css";
import Modal from "react-bootstrap/Modal";
import { usePlayers } from "../context/PlayerContext";
import playerItems from "../data/player.json";
import { CgClose } from "react-icons/cg";
import { IoBandage } from "react-icons/io5";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function PlayerInfoModal({
  handelClose,
  show,
  handelClick,
  localCurrentPlayer,
  flagCode,
  injuryStatus,
}) {
  // Path for Stats
  // console.log(info.stats[0].splits[0].stat.games)


  const info = localCurrentPlayer[0];

  const imgs = playerItems.find((item) => item.id === info.id);
  if (imgs == null) return null;

  function percentFormatter(percent) {
    const formatted = parseFloat(Math.round(percent * 100) / 100).toFixed(2);
    return formatted;
  }

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
            <CgClose className="btn-icon" />
          </button>
          <ul className="stats-list">
            <h1 className="stats-label">Stats</h1>
            <li>
              Games: <span>{info.stats[0].splits[0].stat.games}</span>
            </li>
            <li>
              Games Started:{" "}
              <span>{info.stats[0].splits[0].stat.gamesStarted}</span>
            </li>
            <li>
              Record:{" "}
              <span>
                {info.stats[0].splits[0].stat.wins} -{" "}
                {info.stats[0].splits[0].stat.losses} -{" "}
                {info.stats[0].splits[0].stat.ot}{" "}
              </span>
            </li>
            <li>
              Shutouts: <span>{info.stats[0].splits[0].stat.shutouts}</span>
            </li>
            <li>
              Save %:{" "}
              <span>
                {percentFormatter(info.stats[0].splits[0].stat.savePercentage)}%
              </span>
            </li>
            <li>
              GAA:{" "}
              <span>
                {percentFormatter(
                  info.stats[0].splits[0].stat.goalAgainstAverage
                )}
              </span>
            </li>
            <li>
              SA: <span>{info.stats[0].splits[0].stat.shotsAgainst}</span>
            </li>
            <li>
              GA: <span>{info.stats[0].splits[0].stat.goalsAgainst}</span>
            </li>
            <li>
              EV Save %:{" "}
              <span>
                {percentFormatter(
                  info.stats[0].splits[0].stat.evenStrengthSavePercentage
                )}
                %
              </span>
            </li>
            <li>
              PP Save %:{" "}
              <span>
                {percentFormatter(
                  info.stats[0].splits[0].stat.powerPlaySavePercentage
                )}
                %
              </span>
            </li>
            <li>
              PK Save %:{" "}
              <span>
                {percentFormatter(
                  info.stats[0].splits[0].stat.shortHandedSavePercentage
                )}
                %
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
