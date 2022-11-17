import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const PlayerContext = React.createContext();

export function usePlayers() {
  return useContext(PlayerContext);
}

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useLocalStorage("players", []);
  const defaultCurrentPlayer = {
    id: 0,
    fullName: "default",
    primaryNumber: '0',
    primaryPosition: {
      name: "default"
    },
    height: "default",
    weight: "default",
    shootsCatches: 'D',
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
        }
      }
    },

  }

  const [localCurrentPlayer, setCurrentPlayer] = useLocalStorage("currentPlayer", [{defaultCurrentPlayer}]);

  function getPlayers(id) {
    return players.filter((p) => p.id === id);
  }

  function addCurrentPlayer(player) {
    setCurrentPlayer(player);
    return [...player]
  }

  function addPlayers(player) {
    setPlayers(player);
    return [player]
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
      }}
    >
        {children}
    </PlayerContext.Provider>
  );
};
