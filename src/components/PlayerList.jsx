import React, { useState, useEffect } from "react";
import PlayerTile from "./PlayerTile";
import "./PlayerList.css";
import { usePlayers } from "../context/PlayerContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


export default function PlayerList({ playerData }) {
  // console.info([...playerData]);
  const [localPlayer, setLocalPlayer] = useState([]);
  const { addForwards } = usePlayers();
  const forwardLineOptions = ["L1", "L2", "L3", "L4"];
  const forward = {
    id: "",
    playerName: "",
    number: "",
    position: "",
    line: forwardLineOptions.at(2),
  };

  const [forwardList, setForwardList] = useState([forward]);

  const [showPlayerInfoModal, setShowPlayerInfoModal] = useState(false);
  const [viewPlayerInfoModalID, setPlayerInfoModalID] = useState();

  function openPlayerInfoModal(playerID) {
    setShowPlayerInfoModal(true);
    setPlayerInfoModalID(playerID);
  }

  function testClick() {
    console.log('clicked')
  }


  // console.info(forward);

  return (
    <>
      <div className="player-list-container">
        <header className="player-list-header">
          <h1 className="player-list-title">Columbus Blue Jackets</h1>
          <h2 className="player-list-year">
            2022<span>-</span>2023
          </h2>
        </header>
        <h1 className="player-list-type-title">Forwards</h1>
        <section className="player-list">
          {playerData
            .filter((player) => player.primaryPosition.type.includes("Forward"))
            .map((fp) => (
              <PlayerTile
                onClick={testClick}
                key={fp.id}
                id={fp.id}
                fullName={fp.fullName}
                lastName={fp.lastName}
                firstName={fp.firstName}
                number={fp.primaryNumber}
                position={fp.primaryPosition.abbreviation}
                shoots={fp.shootsCatches}
                stats={fp.stats.splits}
              />
            ))}
        </section>
        <h1 className="player-list-type-title">Defense</h1>
        <section className="player-list defense-list">
          {playerData
            .filter((player) => player.primaryPosition.type.includes("Defense"))
            .map((fp) => (
              <li key={fp.id}>
                <PlayerTile
                  onClick={setShowPlayerInfoModal}
                  key={fp.id}
                  id={fp.id}
                  fullName={fp.fullName}
                  lastName={fp.lastName}
                  firstName={fp.firstName}
                  number={fp.primaryNumber}
                  position={fp.primaryPosition.abbreviation}
                  shoots={fp.shootsCatches}
                  stats={fp.stats.splits}
                />
              </li>
            ))}
        </section>
        <h1 className="player-list-type-title">Goalies</h1>
        <section className="player-list">
          {playerData
            .filter((player) => player.primaryPosition.type.includes("Goalie"))
            .map((fp) => (
              <li key={fp.id}>
                <PlayerTile
                  onClick={setShowPlayerInfoModal}
                  key={fp.id}
                  id={fp.id}
                  fullName={fp.fullName}
                  lastName={fp.lastName}
                  firstName={fp.firstName}
                  number={fp.primaryNumber}
                  position={fp.primaryPosition.abbreviation}
                  shoots={fp.shootsCatches}
                  stats={fp.stats.splits}
                />
              </li>
            ))}
        </section>
      </div>
      
    </>
  );
}
