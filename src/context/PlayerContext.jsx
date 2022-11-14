import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const PlayerContext = React.createContext();

export function usePlayers() {
  return useContext(PlayerContext);
}

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useLocalStorage("players", []);
  const [forwards, setForwards] = useLocalStorage("forwards", []);
  const [localCurrentPlayer, setCurrentPlayer] = useLocalStorage("currentPlayer", {});

  function getPlayers(id) {
    return players.filter((p) => p.id === id);
  }

  function addCurrentPlayer(player) {
    setCurrentPlayer(player);
    return [...player]
  }

  // function addPlayer() {
  //   setPlayers((prevPlayers) => {
  //     if (prevPlayers.find(players => players.id === id))
  //     return prevPlayers;
  //     return [...prevPlayers, {id, lastName, number, position}];
  //   });
  // }

  function addPlayers(player) {
    setPlayers(player);
    return [player]
  }

  // function addForward({id, name, number, position}) {
  //   setForwards((prevForwards) => {
  //     if (prevForwards.find((forwards) => forwards.id === id))
  //     return prevForwards;
  //     return [...prevForwards, {id, name, number, position}];
  //   })
  // }



//   setPlayer((prevPlayers) => {
//     return prevPlayers.filter((player) => player.id === id);
//   });

  return (
    <PlayerContext.Provider
      value={{
        players,
        getPlayers,
        // addForward,
        addPlayers,
        addCurrentPlayer, 
        localCurrentPlayer, 
      }}
    >
        {children}
    </PlayerContext.Provider>
  );
};
