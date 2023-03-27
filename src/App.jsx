import React, { useState, useEffect } from "react";
import PlayerInfoModal from "./components/Modal/PlayerInfoModal";
import GoalieInfoModal from "./components/Modal/GoalieInfoModal";
import axios from "axios";
import PlayerTile from "./components/PlayerTile";
import { Container, Stack } from "react-bootstrap";
import { usePlayers } from "./context/PlayerContext";
import CBJLogo from "./img/cbj_logo.svg";
import { AnimatePresence } from "framer-motion";
import apiRequest from "./utils/apiRequest";
import { assign } from "lodash";

function App() {
  const {
    addCurrentPlayer,
    localCurrentPlayer,
    addPlayers,
    addPlayerList,
    playerList,
    players,
    getPlayers,
    getPlayer,
    addBirthPlace,
    birthPlace, 
    percentFormatter,
    shootsFormatter,
    shoots,
    toggle,
    scratchPlayerStatus,
    injuryPlayerStatus,
    activePlayerStatus,
    scratchedForward,
    scratchedDefense
  } = usePlayers();

  //MODAL CONTROL USESTATES
  const [showPlayerInfoModal, setShowPlayerInfoModal] = useState(false);
  const [showGoalieInfoModal, setShowGoalieInfoModal] = useState(false);

  const [currentSelectedPlayer, setCurrentSelectedPlayer] = useState([{}]);

  const [playerInfoModalID, setPlayerInfoModalID] = useState();
  const [flagCode, setFlagCode] = useState();
  const [hasStats, setHasStats] = useState(true);

  // ROSTERDATA ROSTERURL USESTATES
  const [rosterData, setRosterData] = useState([]);
  const [rosterUrl, setRosterUrl] = useState([
    "https://statsapi.web.nhl.com/api/v1/teams/29/roster",
  ]);

  // PLAYER URL
  const [playerURL, setPlayerURL] = useState([]);

  const starterURL = "https://statsapi.web.nhl.com";

  const statsURL = "?hydrate=stats(splits=statsSingleSeason)";


  // GET INJURY STATUS
  const [injuryStatus, setInjuryStatus] = useState([]);

  // GET SCRATHED STATUS
  const [scratchedStatus, setScratchedStatus] = useState([]);

  // GET ROOKIE STATUS 
  const [rookieStatus, setRookieStatus] = useState([]);

  // GET ROSTER
  const getRoster = async (res) => {
    res.map(async (item) => {
      const newURL = starterURL.concat(item.person.link).concat(statsURL);
      setPlayerURL(newURL);
      const result = await axios.get(newURL);

      setRosterData((state) => {
        state = [...state, ...result.data.people];
        return state;
      });
    });
  };


  // SET PLAYER
  const playerFun = async () => {
    const res = await axios.get(rosterUrl);
    getRoster(res.data.roster);
  };

  useEffect(() => {
    playerFun();
  }, [rosterUrl]);

  useEffect(() => {
    addPlayers(rosterData);
    addPlayerList(rosterData);
  }, [rosterData]);

  // useEffect(() => {
  //   // console.log(players.key)
  //   // console.log('Player List Changed')
  //   // addPlayerList(players)
  //   // addPlayers(players)
  //   console.log(players)
  // }, [players])





  // console.log(playerList);





  // NATIONALITY FORMATTER
  function nationalityFormatter(nationality) {
    const formatted = nationality.toLowerCase().slice(0, 2);
    return formatted;
  }

  // MODAL CONTROLS
  function openPlayerInfoModal(playerID) {
    setPlayerInfoModalID(playerID);

    const selectedPlayer = rosterData.filter((p) => p.id === playerID);

    setCurrentSelectedPlayer(...selectedPlayer);

    if (selectedPlayer[0].stats[0].splits[0] === undefined) {
      // console.log("NO stats avalible");
      setHasStats(false);
    } else {
      // console.log("stats avalible");
      setHasStats(true);
    }

    if (!selectedPlayer[0].primaryPosition.code.includes("G")) {
      setShowPlayerInfoModal(true);
      toggle()
      getPlayers(selectedPlayer[0].id)
    } else {
      setShowGoalieInfoModal(true);
      toggle()
      getPlayers(selectedPlayer[0].id)
    }

    if (selectedPlayer[0].rookie === true) {
      setRookieStatus("rookie-badge-active")
    } else {
      setRookieStatus("rookie-badge")
    }

    if (selectedPlayer[0].rosterStatus.includes("I")) {
      setInjuryStatus("player-modal-injury-icon-active");
    } else {
      setInjuryStatus("player-modal-injury-icon");
    }

    if (selectedPlayer[0].rosterStatus.includes("S")) {
      setScratchedStatus("player-modal-scratch-icon-active")
    }else {
      setScratchedStatus("player-modal-scratch-icon")
    }

    const countryCode = selectedPlayer[0].nationality;
    if (countryCode === "SWE") {
      setFlagCode("fi fi-se fis");
    } else {
      const code = nationalityFormatter(countryCode);
      const flagClassStart = "fi fi-";
      const flagSquare = " fis";
      const flagClass = flagClassStart.concat(code).concat(flagSquare);
      setFlagCode(flagClass);
    }

    addCurrentPlayer(selectedPlayer);
  }

  function closePlayerInfoModal() {
    setShowPlayerInfoModal(false);
    toggle()
  }

  function closeGoalieInfoModal() {
    setShowGoalieInfoModal(false);
    toggle()
  }

  return (
    <>
      <Container className="mb-5">
        <Stack className="player-list-container">
          <header className="player-list-header">
            <h1 className="player-list-title">Columbus Blue Jackets</h1>
            <h2 className="player-list-year">
              2022<span>-</span>2023
            </h2>
            <img className="cbj-logo" src={CBJLogo} alt="CBJ Logo"></img>
          </header>
          <h1 className="player-list-type-title">Forwards</h1>
          <section className="player-list forward-list">
            {players
              .filter(
                (player) =>
                  player.primaryPosition.type.includes("Forward") &&
                  player.rosterStatus.includes("Y")
              )
              .map((forward) => (
                <PlayerTile
                  onClick={openPlayerInfoModal}
                  key={forward.id}
                  id={forward.id}
                  fullName={forward.fullName}
                  lastName={forward.lastName}
                  firstName={forward.firstName}
                  number={forward.primaryNumber}
                  position={forward.primaryPosition.abbreviation}
                  shoots={forward.shootsCatches}
                  stats={forward.stats.splits}
                  rosterStatus={forward.rosterStatus}
                />
              ))}
          </section>
          <div className="scratchs-title-container">
          <h2 className="player-list-type-title scratches-list-title">Scratches</h2>
          </div>
          <section className="player-list forward-list">
          {players
              .filter((player) => player.rosterStatus.includes("S") && player.primaryPosition.type.includes("Forward"))
              .map((scratched) => (
                <li key={scratched.id}>
                  <PlayerTile
                    onClick={openPlayerInfoModal}
                    key={scratched.id}
                    id={scratched.id}
                    fullName={scratched.fullName}
                    lastName={scratched.lastName}
                    firstName={scratched.firstName}
                    number={scratched.primaryNumber}
                    position={scratched.primaryPosition.abbreviation}
                    shoots={scratched.shootsCatches}
                    stats={scratched.stats.splits}
                    rosterStatus={scratched.rosterStatus}
                  />
                </li>
              ))}
              </section>
          <h1 className="player-list-type-title">Defense</h1>
          <section className="player-list defense-list">
            {players
              .filter(
                (player) =>
                  player.primaryPosition.type.includes("Defense") &&
                  player.rosterStatus.includes("Y")
              )
              .map((defense) => (
                <li key={defense.id}>
                  <PlayerTile
                    onClick={openPlayerInfoModal}
                    key={defense.id}
                    id={defense.id}
                    fullName={defense.fullName}
                    lastName={defense.lastName}
                    firstName={defense.firstName}
                    number={defense.primaryNumber}
                    position={defense.primaryPosition.abbreviation}
                    shoots={defense.shootsCatches}
                    stats={defense.stats.splits}
                    rosterStatus={defense.rosterStatus}
                  />
                </li>
              ))}
          </section>
          <div className="scratchs-title-container">
          <h2 className="player-list-type-title scratches-list-title">Scratches</h2>
          </div>
          <section className="player-list defense-list">
          {players
              .filter((player) => player.rosterStatus.includes("S") && player.primaryPosition.type.includes("Defense"))
              .map((scratched) => (
                <li key={scratched.id}>
                  <PlayerTile
                    onClick={openPlayerInfoModal}
                    key={scratched.id}
                    id={scratched.id}
                    fullName={scratched.fullName}
                    lastName={scratched.lastName}
                    firstName={scratched.firstName}
                    number={scratched.primaryNumber}
                    position={scratched.primaryPosition.abbreviation}
                    shoots={scratched.shootsCatches}
                    stats={scratched.stats.splits}
                    rosterStatus={scratched.rosterStatus}
                  />
                </li>
              ))}
              </section>
          <h1 className="player-list-type-title">Goalies</h1>
          <section className="player-list goalie-list">
            {players
              .filter(
                (player) =>
                  player.primaryPosition.type.includes("Goalie") &&
                  player.rosterStatus.includes("Y")
              )
              .map((goalie) => (
                <li key={goalie.id}>
                  <PlayerTile
                    onClick={openPlayerInfoModal}
                    key={goalie.id}
                    id={goalie.id}
                    fullName={goalie.fullName}
                    lastName={goalie.lastName}
                    firstName={goalie.firstName}
                    number={goalie.primaryNumber}
                    position={goalie.primaryPosition.abbreviation}
                    shoots={goalie.shootsCatches}
                    stats={goalie.stats.splits}
                    rosterStatus={goalie.rosterStatus}
                  />
                </li>
              ))}
          </section>
          <div className="scratchs-title-container">
          <h2 className="player-list-type-title scratches-list-title">Scratches</h2>
          </div>
          <section className="player-list goalie-list">
          {players
              .filter((player) => player.rosterStatus.includes("S") && player.primaryPosition.type.includes("Goalie"))
              .map((scratched) => (
                <li key={scratched.id}>
                  <PlayerTile
                    onClick={openPlayerInfoModal}
                    key={scratched.id}
                    id={scratched.id}
                    fullName={scratched.fullName}
                    lastName={scratched.lastName}
                    firstName={scratched.firstName}
                    number={scratched.primaryNumber}
                    position={scratched.primaryPosition.abbreviation}
                    shoots={scratched.shootsCatches}
                    stats={scratched.stats.splits}
                    rosterStatus={scratched.rosterStatus}
                  />
                </li>
              ))}
              </section>
          <h1 className="player-list-type-title">Injuries</h1>
          <section className="player-list injury-list">
            {players
              .filter((player) => player.rosterStatus.includes("I"))
              .map((injured) => (
                <li key={injured.id}>
                  <PlayerTile
                    onClick={openPlayerInfoModal}
                    key={injured.id}
                    id={injured.id}
                    fullName={injured.fullName}
                    lastName={injured.lastName}
                    firstName={injured.firstName}
                    number={injured.primaryNumber}
                    position={injured.primaryPosition.abbreviation}
                    shoots={injured.shootsCatches}
                    stats={injured.stats.splits}
                    rosterStatus={injured.rosterStatus}
                  />
                </li>
              ))}
          </section>
        </Stack>
      </Container>
      <AnimatePresence>
        {showPlayerInfoModal && (
          <PlayerInfoModal
            show={showPlayerInfoModal}
            handleClick={() => setShowPlayerInfoModal(false)}
            handelClose={closePlayerInfoModal}
            addBirthPlace={addBirthPlace}
            birthPlace={birthPlace}
            shoots={shoots}
            shootsFormatter={shootsFormatter}
            localCurrentPlayer={localCurrentPlayer}
            injuryStatus={injuryStatus}
            scratchedStatus={scratchedStatus}
            rookieStatus={rookieStatus}
            flagCode={flagCode}
            hasStats={hasStats}
            currentSelectedPlayer={currentSelectedPlayer}
            playerInfoModalID={playerInfoModalID}
            getPlayers={getPlayers}
            getPlayer={getPlayer}
            scratchPlayerStatus={scratchPlayerStatus}
            injuryPlayerStatus={injuryPlayerStatus}
            activePlayerStatus={activePlayerStatus}

          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showGoalieInfoModal && (
          <GoalieInfoModal
            show={showGoalieInfoModal}
            handleClick={() => setShowPlayerInfoModal(false)}
            handelClose={closeGoalieInfoModal}
            addBirthPlace={addBirthPlace}
            birthPlace={birthPlace}
            shoots={shoots}
            shootsFormatter={shootsFormatter}
            percentFormatter={percentFormatter}
            localCurrentPlayer={localCurrentPlayer}
            injuryStatus={injuryStatus}
            scratchedStatus={scratchedStatus}
            rookieStatus={rookieStatus}
            flagCode={flagCode}
            hasStats={hasStats}
            getPlayer={getPlayer}
            scratchPlayerStatus={scratchPlayerStatus}
            injuryPlayerStatus={injuryPlayerStatus}
            activePlayerStatus={activePlayerStatus}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
