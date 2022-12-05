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

function App() {
  const {
    addCurrentPlayer,
    localCurrentPlayer,
    addPlayers,
    addPlayerList,
    players,
    playerList,
    getPlayers
  } = usePlayers();

  const API_URL = "http://localhost:3500/players";

  const [playerItems, setPlayerItems] = useState([]);

  //MODAL CONTROL USESTATES
  const [showPlayerInfoModal, setShowPlayerInfoModal] = useState(false);
  const [showGoalieInfoModal, setShowGoalieInfoModal] = useState(false);

  const [currentSelectedPlayer, setCurrentSelectedPlayer] = useState([{}]);

  const [playerInfoModalID, setPlayerInfoModalID] = useState();
  const [flagCode, setFlagCode] = useState();
  const [hasStats, setHasStats] = useState(true);
  const [defaultStat, setDefaultStat] = useState({season:'NA', stat:{
    games: 0,
    goals: 0,
    assets: 0,
    points: 0,
    powerPlayerGoals: 0,
    powerPlayPoints: 0,
    penaltyMinutes: 0,
    plusMinus: 0,
    shots: 0,
    hits: 0,
    faceOffPct: 0,
    blocked: 0,
    timeOnIcePerGame: 0,
  }});

  const [noStats, setNoStats] = useState();

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
    // rosterData.map(p => {
    //   axios.post(API_URL, p)
    // })
  }, [rosterData]);

  useEffect(() => {
    setPlayerItems(rosterData);
  }, [players]);

  // useEffect(() => {
  //   const getPlayerItems = async () => {
  //     const reponse = await axios.get(API_URL);
  //     const playerDataItem = await reponse.data;
  //     console.log(playerDataItem);
  //     setPlayerItems(playerDataItem);
  //   };
  //   getPlayerItems();
  // }, []);

  // useEffect(() => {
  //   console.log(playerList)
  //   // getPlayers(8476374);
  // }, [playerItems]);

  // useEffect(() => {
  //   const noStats = players.filter(player => player.stats[0].splits[0] === undefined)
  //   const noStatsID = noStats[0].id
  //   getPlayers(noStatsID)
  //   noStats[0].stats[0].splits.push(defaultStat)
  //   addCurrentPlayer(noStats)
  //   console.log(noStats)
  // }, [])

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
      console.log("no stats avalible");
      setHasStats(false);
    } else {
      console.log("stats avalible");
      setHasStats(true);
    }

    if (!selectedPlayer[0].primaryPosition.code.includes("G")) {
      setShowPlayerInfoModal(true);
    } else {
      setShowGoalieInfoModal(true);
    }

    if (selectedPlayer[0].rosterStatus.includes("I")) {
      setInjuryStatus("player-modal-injury-icon-active");
    } else {
      setInjuryStatus("player-modal-injury-icon");
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
  }

  function closeGoalieInfoModal() {
    setShowGoalieInfoModal(false);
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
          <h1 className="player-list-type-title">Injuries</h1>
          <section className="player-list injury-list">
            {players
              .filter((player) => player.rosterStatus.includes("I"))
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
        </Stack>
      </Container>
      <AnimatePresence>
        {showPlayerInfoModal && (
          <PlayerInfoModal
            show={showPlayerInfoModal}
            handleClick={() => setShowPlayerInfoModal(false)}
            handelClose={closePlayerInfoModal}
            localCurrentPlayer={localCurrentPlayer}
            injuryStatus={injuryStatus}
            flagCode={flagCode}
            defaultStat={defaultStat}
            hasStats={hasStats}
            currentSelectedPlayer={currentSelectedPlayer}
            playerInfoModalID={playerInfoModalID}
            getPlayers={getPlayers}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showGoalieInfoModal && (
          <GoalieInfoModal
            show={showGoalieInfoModal}
            handleClick={() => setShowPlayerInfoModal(false)}
            handelClose={closeGoalieInfoModal}
            localCurrentPlayer={localCurrentPlayer}
            injuryStatus={injuryStatus}
            flagCode={flagCode}
            defaultStat={defaultStat}
            hasStats={hasStats}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
