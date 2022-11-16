import React, { useState, useEffect } from "react";
import PlayerInfoModal from "./components/PlayerInfoModal";
import GoalieInfoModal from "./components/GoalieInfoModal";
import axios from "axios";
import PlayerTile from "./components/PlayerTile";
import { Container, Stack } from "react-bootstrap";
import { usePlayers } from "./context/PlayerContext";
import CBJLogo from "./img/cbj_logo.svg";

function App() {
  const { addCurrentPlayer, localCurrentPlayer, addPlayers, players } =
    usePlayers();

  //MODAL CONTROL USESTATES
  const [showPlayerInfoModal, setShowPlayerInfoModal] = useState(false);
  const [showGoalieInfoModal, setShowGoalieInfoModal] = useState(false);
  const [viewPlayerInfoModalID, setPlayerInfoModalID] = useState();
  const [flagCode, setFlagCode] = useState();

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
  const [injuredPlayersList, setInjuredPlayersList] = useState([{}])
  const [injuryStatus, setInjuryStatus] = useState([])
  const [injuredPlayerID, setInjuredPlayerID] = useState([])
  const [isInjured, setIsInjured] = useState(false)
  // function getInjuryStatus(id, fullName, rosterStatus) {
    // const playerItem = {
    //   id,
    //   fullName,
    //   rosterStatus
    // }

  //   }
  //   rosterData.map(p => playerItem)
  //   rosterData.filter(fp => fp.rosterStatus === rosterStatus).map(p => setInjuredPlayer(p))
  //   console.log(injuredPlayer)
  // }

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
    getInjuryStatus();

  }, []);

  useEffect(() => {
    addPlayers(rosterData);
    // console.log(injuredPlayersList)

  }, [rosterData]);

  // PLAYER RECORD
  // const [playerRecord, setPlayerRecord] = useState([]);

  // const [recordUrl, setRecordUrl] = useState([
  //   "/site/api/player/byTeam/29",
  // ]);

  // const getRecord = async (res) => {
  //   res.map(async (item) => {
  //     setPlayerURL(item);
  //     setPlayerRecord((state) => {
  //       state = [...state, ...item.data];
  //       return state;
  //     });
  //   });
  // };

  // const recordFun = async () => {
  //   const res = await axios.get('/site/api/player/byTeam/29')
  //   .then(res => res.json());
  //   getRecord(res.data)
  //   // fetch('https://records.nhl.com/site/api/player/byTeam/29')
  //   // .then(record => record.json())
  // }

  // useEffect(() => {
  //   recordFun();
  // }, []);
  
  // const [recordUrl, setRecordUrl] = useState([
  //   "https://records.nhl.com/site/api/player/byTeam/29",
  // ]);

  // const [isInjured, setIsInjured] = useState([]);

  // const [playerRecord, setPlayerRecord] = useState([]);
  //  const getPlayerRecord = async (res) => {
  //   setPlayerRecord(res)
  // }

  // const recordFun = async () => {
  //   const res = await axios.get(recordUrl);
  //   getPlayerRecord(res.data)
  // }

  // useEffect(() => {
  //   recordFun();
  // }, []);

  // NATIONALITY FORMATTER
  function nationalityFormatter(nationality) {
    const formatted = nationality.slice(0, 2);
    return formatted;
  }

  // MODAL CONTROLS
  function openPlayerInfoModal(playerID) {
    setPlayerInfoModalID(playerID);

    const selectedPlayer = rosterData.filter((p) => p.id === playerID);

    if (!selectedPlayer[0].primaryPosition.code.includes("G")) {
      setShowPlayerInfoModal(true);
    } else {
      setShowGoalieInfoModal(true);
    }

    addCurrentPlayer(selectedPlayer);
  }



  function closePlayerInfoModal() {
    setShowPlayerInfoModal(false);
  }

  function closeGoalieInfoModal() {
    setShowGoalieInfoModal(false);
  }

  function getInjuryStatus(id, isInjured ) {
    const iList = [];

    const injuredPlayer = rosterData.filter(p => p.rosterStatus === 'I').map((p) => iList.push(p));


    const rosterID = rosterData.map(p => p.id)
    console.log(rosterID)

    const injuredID = iList.map((p) => p.id)
    console.log(injuredID)

    console.log(id)

    // compare(injuredID.id)

    // function compare(id) {
    //  const playerInjuryStatus = rosterID.filter((r) => r === id).map(p => {
    //   setIsInjured(true)
    //   console.log(p)
    // })
    //   // console.log(isInjured)

    // }

    return injuredPlayer

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
            <img src={CBJLogo} alt="CBJ Logo"></img>
          </header>
          <h1 className="player-list-type-title">Forwards</h1>
          <section className="player-list forward-list">
            {players
              .filter((player) =>
                player.primaryPosition.type.includes("Forward")
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
                  injury={getInjuryStatus}
                />
              ))}
          </section>
          <h1 className="player-list-type-title">Defense</h1>
          <section className="player-list defense-list">
            {players
              .filter((player) =>
                player.primaryPosition.type.includes("Defense")
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
                    injury={getInjuryStatus}
                  />
                </li>
              ))}
          </section>
          <h1 className="player-list-type-title">Goalies</h1>
          <section className="player-list goalie-list">
            {players
              .filter((player) =>
                player.primaryPosition.type.includes("Goalie")
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
                    injury={getInjuryStatus}
                  />
                </li>
              ))}
          </section>
        </Stack>
      </Container>
      <PlayerInfoModal
        show={showPlayerInfoModal}
        handleClick={() => setShowPlayerInfoModal(false)}
        handelClose={closePlayerInfoModal}
        localCurrentPlayer={localCurrentPlayer}
      />
      <GoalieInfoModal
        show={showGoalieInfoModal}
        handleClick={() => setShowPlayerInfoModal(false)}
        handelClose={closeGoalieInfoModal}
        localCurrentPlayer={localCurrentPlayer}
      />
    </>
  );
}

export default App;
