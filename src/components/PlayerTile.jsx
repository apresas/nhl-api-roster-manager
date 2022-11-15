import React from "react";
import "./PlayerTile.css";
import { FaAmbulance } from 'react-icons/fa'
import { AiFillMedicineBox } from 'react-icons/ai'

export default function PlayerTile({
  number,
  position,
  shoots,
  lastName,
  onClick,
  passPlayerID, 
  id

}) {
const currentPlayerHandler = () => {
  onClick(id)
  // passPlayerID(id)
  // console.info('ID from PlayerTile: ' + id)

}

  return (
    <div className="player-tile" onClick={currentPlayerHandler}>
      <h3 className="player-name">{lastName}</h3>
      <h1 className="player-number">{number}</h1>
      <h4 className="player-position">{position}</h4>
      {/* <FaAmbulance className='injury-icon' size="1.5rem"/> */}
      <AiFillMedicineBox className='injury-icon' size={'1.5rem'}/>
    </div>
  );
}
