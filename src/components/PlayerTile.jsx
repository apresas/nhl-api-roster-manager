import React, { useState, useEffect } from "react";
import "./PlayerTile.css";
import { FaAmbulance } from 'react-icons/fa'
import { AiFillMedicineBox } from 'react-icons/ai'
import { GiAmbulance } from 'react-icons/gi'

export default function PlayerTile({
  number,
  position,
  shoots,
  lastName,
  onClick,
  passPlayerID, 
  id,
  rosterStatus,

}) {
const currentPlayerHandler = () => {
  onClick(id)
  // passPlayerID(id)
  // console.info('ID from PlayerTile: ' + id)

}

const [isInjured, setIsInjured] = useState(false);
const [iPlayer, setIPlayer] = useState([]);
const [isInjuredIcon, setIsInjuredIcon] = useState()
const [isInjuredBorder, setIsInjuredBorder] = useState()

// useEffect(() => {
//   injury(id, isInjured);
//   if(rosterStatus === 'I') {
//     setIsInjured(true)



//     console.log('Injured: ' + id + " " + lastName + " " + rosterStatus)

//     console.log(isInjured)
//     // console.log(iPlayer)
//   }
// }, [])

useEffect(() => {
  if(rosterStatus.includes('I')) {
    setIsInjuredIcon('injury-icon-active')
    setIsInjuredBorder('player-tile-injury')
  } else {
    setIsInjuredIcon('injury-icon')
    setIsInjuredBorder('player-tile') 
  }
  
}, [isInjuredBorder])





// console.log(rosterStatus)



  return (
    <div className={`${isInjuredBorder}`} onClick={currentPlayerHandler}>
      <h3 className="player-name">{lastName}</h3>
      <h1 className="player-number">{number}</h1>
      <h4 className="player-position">{position}</h4>
      {/* <AiFillMedicineBox className={`${isInjuredIcon}`} size={'1.5rem'}/> */}
      <GiAmbulance className={`${isInjuredIcon}`} size={'1.5rem'}/>
    </div>
  );
}
