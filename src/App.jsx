import React, { useState, useEffect } from "react";
import PlayerList from "./components/PlayerList";
import axios from "axios";

function App() {
  const [rosterData, setRosterData] = useState([]);
  const [rosterUrl, setRosterUrl] = useState([
    "https://statsapi.web.nhl.com/api/v1/teams/29/roster",
  ]);

  const [playerURL, setPlayerURL] = useState([]);

  const starterURL = "https://statsapi.web.nhl.com";

  const statsURL = "?hydrate=stats(splits=statsSingleSeason)";

  const playerFun = async () => {
    const res = await axios.get(rosterUrl);
    getRoster(res.data.roster);
  };

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

  useEffect(() => {
    playerFun();
  }, [rosterUrl]);

  return <PlayerList playerData={rosterData} />;
}

export default App;
