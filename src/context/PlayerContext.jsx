import React, { useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";

const PlayerContext = React.createContext();

export function usePlayers() {
  return useContext(PlayerContext);
}

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useLocalStorage("players", []);
  const [xtraPlayers, setXtraPlayers] = useState([]);
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
  

  // const [isSet, setIsSet] = useState(false);

  // const getXtraPlayer = async () => {
  //   const result = await axios.get("https://statsapi.web.nhl.com/api/v1/people/8481161?hydrate=stats(splits=statsSingleSeason)")
  //   // xtraPlayers.map(...players, )
  //   result.data.people[0].rosterStatus = 'Y';
  //   setXtraPlayers(player => [...player, ...players ])

  //   setIsSet(true)
  //   setXtraPlayers((prevArray) => [...prevArray, result.data.people[0]])
  //   // console.log(players)

  //   console.log(xtraPlayers)
  // }

  // const makeInjuredPlayer= async () => {
  //   const result = players.filter(p => p.id === 8478460)
  //   result.rosterStatus = 'I';
  // }
  // // JAKE Christiansen
  // const [jcItem, setJCItem] = useState();


  // // Get Jake Christiansen
  // const getJC = async () => {
  //   // const jcURL = starterURL.concat('/api/v1/people/8481161').concat(statsURL);
  //   // // const result = await axios.get(jcURL)
  //   // console.log(jcURL);

  //   const result = await axios.get(
  //     "https://statsapi.web.nhl.com/api/v1/people/8481161?hydrate=stats(splits=statsSingleSeason"
  //   );
  //   players.push(...result.data.people)

    // result.data.people[0].rosterStatus = 'Y'
  //   addPlayers(players)
  //   console.log(result.data.people[0].rosterStatus)
  //   // console.log(players)

  //   setIsSet(true);
  // };


  // console.log(jcItem);

  // useEffect(() => {
  //   getJC();
  //   console.log(jcItem);
  // }, [isSet]);

    // Get Jake Christiansen

    // const getPlayerData = async (id) => {
    //   const starterURL = "https://statsapi.web.nhl.com";
    //   const statsURL = "?hydrate=stats(splits=statsSingleSeason)";
    //   const playerURL = '/api/v1/people/';
    //   const newURL = starterURL.concat(playerURL).concat(id).concat(statsURL);
    //   const result = await axios.get(newURL);
    //   players.filter(p => p.id !== id).map(p => setPlayers(p))
    //   setIsSet(true);
    // };

    // useEffect(() => {
    //   console.log(players)
    // }, [setIsSet]);

  const [localCurrentPlayer, setCurrentPlayer] = useLocalStorage(
    "currentPlayer",
    [{ defaultCurrentPlayer }]
  );

  function getPlayers(id) {
    console.log( players.filter((p) => p.id === id))
  }

  function addCurrentPlayer(player) {
    setCurrentPlayer(player);
    return [...player];
  }

  function addPlayers(player) {
    setPlayers(player);
    return [player];
  }

  return (
    <PlayerContext.Provider
      value={{
        players,
        getPlayers,
        // addForward,
        addPlayers,
        addCurrentPlayer,
        localCurrentPlayer,
        // getXtraPlayer,
        // xtraPlayers,
        // isSet
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
