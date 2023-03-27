import React, { useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import { findIndex, indexOf, pullAt } from "lodash";

const PlayerContext = React.createContext();

export function usePlayers() {
  return useContext(PlayerContext);
}

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useLocalStorage("players", []);
  const [scratchedDefense, setScratchedDefense] = useLocalStorage(
    "scratchedDefense",
    []
  );
  const [scratchedForward, setScratchedForward] = useLocalStorage(
    "scratchedForward",
    []
  );
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
  const [isLocked, toggle] = useBodyScrollLock();
  const API_URL = "http://localhost:3500/players";

  const [localCurrentPlayer, setCurrentPlayer] = useLocalStorage(
    "currentPlayer",
    [{ defaultCurrentPlayer }]
  );

  const [getPlayer, setGetPlayer] = useState();

  // *** GET PLAYER MANUALLY ***

  // *** URLS ***
  const starterURL = "https://statsapi.web.nhl.com";
  const statsURL = "?hydrate=stats(splits=statsSingleSeason)";

  

  // *** CORSON CEULEMANS ***
  // const ccURL = "/api/v1/people/8482678";
  // const [ccData, setCCData] = useState({});
  // const getCC = async () => {
  //   const newURL = starterURL.concat(ccURL).concat(statsURL);
  //   const result = await axios.get(newURL);
  //   setCCData(...result.data.people);
  // };

  // *** JAKE CHRISTIANSEN ***
  const jcURL = "/api/v1/people/8481161";
  const [jcData, setJCData] = useState({});
  const getJC = async () => {
    const newURL = starterURL.concat(jcURL).concat(statsURL);
    const result = await axios.get(newURL);
    setJCData(...result.data.people);
  };

  // *** DAVID JIRICHEK ***
  // const djURL = "/api/v1/people/8483460";
  // const [djData, setDJData] = useState({});
  // const getDJ = async () => {
  //   const newURL = starterURL.concat(djURL).concat(statsURL);
  //   const result = await axios.get(newURL);
  //   setDJData(...result.data.people);
  // };

  // *** JON GILLIES ***
  const jgURL = "/api/v1/people/8476903";
  const [jgData, setJGData] = useState({});
  const getJG = async () => {
    const newURL = starterURL.concat(jgURL).concat(statsURL);
    const result = await axios.get(newURL);
    setJGData(...result.data.people);
  };

  // *** ALEXANDRE TEXIER ***
  // const atURL = "/api/v1/people/8480074";
  // const [atData, setATData] = useState({});
  // const getAT = async () => {
  //   const newURL = starterURL.concat(atURL).concat(statsURL);
  //   const result = await axios.get(newURL);
  //   setATData(...result.data.people);
  // };

  // *** DANIIL TARASOV ***
  // const dtURL = "/api/v1/people/8480193";
  // const [dtData, setDTData] = useState({});
  // const getDT = async () => {
  //   const newURL = starterURL.concat(dtURL).concat(statsURL);
  //   const result = await axios.get(newURL);
  //   setDTData(...result.data.people);
  // };

  // *** FUNCTIONS ***
  const setStatus = (data) => {
    if (data.rosterStatus === "N") {
      data.rosterStatus = "Y";
      players.push(data);
    }
  };

  useEffect(() => {
    getJC();
    // getJG();
  }, []);

  useEffect(() => {
    setStatus(jcData);
    // setStatus(jgData);
  }, [jcData]);

  // *** END GET PLAYER MANUALLY ***

  function getPlayers(id) {
    const currentPlayer = players.filter((p) => p.id === id);
    setGetPlayer(currentPlayer);
    console.log(...currentPlayer);
  }

  function addCurrentPlayer(player) {
    setCurrentPlayer(player);
    return [...player];
  }

  function addPlayers(player) {
    // const changePlayerNumber = player.filter((p) => p.id === 8482678);
    // changePlayerNumber.map((p) => {
    //   p.primaryNumber = 4;
    //   p.rosterStatus = "S";
    // });

    players
      .filter(
        (player) =>
          player.rosterStatus.includes("S") &&
          player.primaryPosition.type.includes("Defense")
      )
      .map((p) => {
        setScratchedDefense(p);
      });

    players
      .filter(
        (player) =>
          player.rosterStatus.includes("S") &&
          player.primaryPosition.type.includes("Forward")
      )
      .map((p) => {
        setScratchedForward(p);
      });

    const manualInjury = player.filter(
      // (p) => p.id === 8478460 || p.id === 8479339
      (p) => p.id === 8478460 
    );
    manualInjury.map((p) => {
      p.rosterStatus = "I";
    });

    const manualRookie = player.filter(
      (p) => p.id === 8484125
    );
    manualRookie.map((p) => {
      p.rookie = true;
    });

    // const manualScratch = player.filter((p) => p.id === 8483565 || p.id === 8480871 || p.id === 8478967);
    // manualScratch.map((p) => {
    //   p.rosterStatus = "S";
    // });

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

  const [shoots, setShoots] = useState();

  function shootsFormatter(shoots) {
    if (shoots === "L") {
      const hand = "Left";
      setShoots(hand);
    } else {
      const hand = "Right";
      setShoots(hand);
    }
  }

  function updatePlayerStatus(player) {
    // Find Player Index
    const key = findIndex(players, function (o) {
      return o.id === player[0].id;
    });
    console.log("Index: " + key);

    // Pull Player at Index
    pullAt(players, [key]);
    // console.log(players)

    // Push Player Back into Player Array
    players.push(...player);
    console.log(players);
  }

  function scratchPlayerStatus(player) {
    player.map((player) => (player.rosterStatus = "S"));
    console.log(
      "Scratched" +
        " " +
        player[0].primaryPosition.type +
        ": " +
        player[0].fullName
    );

    updatePlayerStatus(player);
  }

  function injuryPlayerStatus(player) {
    player.map((player) => (player.rosterStatus = "I"));
    console.log(
      "Injured" +
        " " +
        player[0].primaryPosition.type +
        ": " +
        player[0].fullName
    );

    updatePlayerStatus(player);
  }

  function activePlayerStatus(player) {
    player.map((player) => (player.rosterStatus = "Y"));
    console.log(
      "Activated" +
        " " +
        player[0].primaryPosition.type +
        ": " +
        player[0].fullName
    );

    updatePlayerStatus(player);
  }

  // useEffect(() => {
  //   // console.log(players[1].rosterStatus)
  //   // const playerID = players[1].id
  //   // players[1].rosterStatus = "I"
  //   // const selectedPlayer = getPlayers(playerID)
  //   // console.log(selectedPlayer)
  //   // players.pop(selectedPlayer)
  //   // players.push(selectedPlayer)
  //   // console.log(players[1])
  //   // players[1].rosterStatus = "I"
  //   // console.log(players[1])

  // }, [])

  return (
    <PlayerContext.Provider
      value={{
        players,
        playerList,
        getPlayers,
        getPlayer,
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
        toggle,
        scratchPlayerStatus,
        injuryPlayerStatus,
        activePlayerStatus,
        scratchedForward,
        scratchedDefense,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
