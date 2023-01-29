import React, { useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import useBodyScrollLock from "../hooks/useBodyScrollLock";

const PlayerContext = React.createContext();

export function usePlayers() {
  return useContext(PlayerContext);
}

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useLocalStorage("players", []);
  const [playerList, setPlayerList] = useState();
  const defaultCurrentPlayer = {
    id: 0,
    fullName: "default",
    primaryNumber: "0",
    primaryPosition: {
      name: "default",
    },
    height: "default",
    weight: "default",
    shootsCatches: "D",
    currentAge: "default",
    nationality: "default",
    stats: {
      splits: {
        stat: {
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
        },
      },
    },
  };
  const[isLocked,toggle] = useBodyScrollLock();
  const API_URL = "http://localhost:3500/players";

  const [localCurrentPlayer, setCurrentPlayer] = useLocalStorage(
    "currentPlayer",
    [{ defaultCurrentPlayer }]
  );

  // *** GET JAKE CHRISTIANSEN ***
  const starterURL = "https://statsapi.web.nhl.com";

  const statsURL = "?hydrate=stats(splits=statsSingleSeason)";

  const teamStatsURL = "/api/v1/teams/29/?expand=team.stats"

  const jcURL = "/api/v1/people/8481161";

  const [jcData, setJCData] = useState({});

  const getJC = async () => {
    const newURL = starterURL.concat(jcURL).concat(statsURL);
    const result = await axios.get(newURL);
    setJCData(...result.data.people);
  };

  const setStatus = (data) => {
    if (data.rosterStatus === 'N') {
    data.rosterStatus = "Y";
    players.push(data);
  }
  };

  useEffect(() => {
    getJC();
  }, []);

  useEffect(() => {
    setStatus(jcData);
  }, [jcData]);
  // *** END GET JAKE CHRISTIANSEN ***

  function getPlayers(id) {
    const currentPlayer = players.filter((p) => p.id === id);
    console.log(currentPlayer);
  }

  function addCurrentPlayer(player) {
    setCurrentPlayer(player);
    return [...player];
  }

  function addPlayers(player) {
    const changePlayerNumber = player.filter((p) => p.id === 8478967);
    changePlayerNumber.map((p) => {
      p.primaryNumber = 18;
      p.rosterStatus = "S";
    });

    const manualInjury = player.filter(
      (p) => p.id === 8478460 || p.id === 8483565 || p.id === 8474679
    );
    manualInjury.map((p) => {
      p.rosterStatus = "I";
    });

    const manualScratch = player.filter((p) => p.id === 8483565 || p.id === 8481161);
    manualScratch.map((p) => {
      p.rosterStatus = "S";
    });

    setPlayers(player);
    return [player];
  }

  function addPlayerList(player) {
    setPlayerList(player);
    return [player];
  }

  const postAllPlayerData = (data) => {
    data.map((p) => {
      axios.post(API_URL, p);
    });
    return [data];
  };

  const [birthPlace, setBirthPlace] = useState();

  function addBirthPlace(birthCity, birthCountry, birthStateProvince) {
    if (birthStateProvince === undefined) {
      const birthPlace = birthCity + ", " + birthCountry;
      setBirthPlace(birthPlace);
      // console.log(birthPlace);
    } else {
      const birthPlace =
        birthCity + ", " + birthStateProvince + ", " + birthCountry;
      setBirthPlace(birthPlace);
      // console.log(birthPlace);
    }
  }

  function percentFormatter(percent) {
    const formatted = parseFloat(Math.round(percent * 100) / 100).toFixed(2);
    return formatted;
  }

  const [shoots, setShoots] = useState()

  function shootsFormatter(shoots) {
    if (shoots === 'L') {
      const hand = "Left"
      setShoots(hand);
    } else {
      const hand = "Right"
      setShoots(hand);
    }
  }
  // useEffect(() => {
  //   // console.log(players[1].rosterStatus)
  //   // const playerID = players[1].id
  //   // players[1].rosterStatus = "I"
  //   // const selectedPlayer = getPlayers(playerID)
  //   // players.pop(selectedPlayer)
  //   // players.push(selectedPlayer)
  //   console.log(players[1])
  //   players[1].rosterStatus = "I"
  //   console.log(players[1])

  // }, [])

  return (
    <PlayerContext.Provider
      value={{
        players,
        playerList,
        getPlayers,
        addPlayerList,
        addPlayers,
        postAllPlayerData,
        addCurrentPlayer,
        localCurrentPlayer,
        addBirthPlace,
        birthPlace,
        percentFormatter,
        shootsFormatter,
        shoots,
        toggle
        // dbData,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
