import React, { useState, useEffect } from "react";
import PlayerList from "./components/PlayerList";
import PlayerInfoModal from "./components/PlayerInfoModal";
import GoalieInfoModal from "./components/GoalieInfoModal";
import axios from "axios";
import PlayerTile from "./components/PlayerTile";
import { Container, Stack } from "react-bootstrap";
import { usePlayers } from "./context/PlayerContext";


function App() {
  const { addCurrentPlayer, localCurrentPlayer, addPlayers, players } =
    usePlayers();
  const [showPlayerInfoModal, setShowPlayerInfoModal] = useState(false);
  const [showGoalieInfoModal, setShowGoalieInfoModal] = useState(false);
  const [viewPlayerInfoModalID, setPlayerInfoModalID] = useState();
  const [flagCode, setFlagCode] = useState();
  const [rosterData, setRosterData] = useState([]);
  const [rosterUrl, setRosterUrl] = useState([
    "https://statsapi.web.nhl.com/api/v1/teams/29/roster",
  ]);

  const [playerURL, setPlayerURL] = useState([]);

  const starterURL = "https://statsapi.web.nhl.com";

  const statsURL = "?hydrate=stats(splits=statsSingleSeason)";

  // const [currentPlayer, setCurrentPlayer] = useState([]);

  const getRoster = async (res) => {
    res.map(async (item) => {
      const newURL = starterURL.concat(item.person.link).concat(statsURL);
      setPlayerURL(newURL);
      const result = await axios.get(newURL);

      setRosterData((state) => {
        state = [...state, ...result.data.people];
        // addCurrentPlayer(state)
        return state;
      });
    });
  };

  const playerFun = async () => {
    const res = await axios.get(rosterUrl);
    getRoster(res.data.roster);
  };

  useEffect(() => {
    playerFun();
  }, [rosterUrl]);

  useEffect(() => {
    addPlayers(rosterData);
  }, [rosterData]);

  function nationalityFormatter(nationality) {
    const formatted = nationality.slice(0,2)
    // console.log(formatted)
    return formatted
  }

  function openPlayerInfoModal(playerID) {
    setPlayerInfoModalID(playerID);

    const selectedPlayer = rosterData.filter((p) => p.id === playerID);

    if (!selectedPlayer[0].primaryPosition.code.includes("G")) {
      setShowPlayerInfoModal(true);
    } else {
      setShowGoalieInfoModal(true);
    }



    addCurrentPlayer(selectedPlayer);

        // setCurrentPlayer(selectedPlayer);

    // setShowPlayerInfoModal(true);

    // console.log(...selectedPlayer);
    // // console.log(...currentPlayer);
    // console.log(...localCurrentPlayer);

  }


  function closePlayerInfoModal() {
    setShowPlayerInfoModal(false);
    console.log(...localCurrentPlayer)
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
