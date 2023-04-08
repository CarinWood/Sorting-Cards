import './board.css'
import { Deck } from '../deck/Deck'
import { useEffect, useState } from 'react'
import { CardItem } from '../carditem/CardItem'
import { BsSuitSpade, BsSuitHeart, BsSuitClub, BsSuitDiamond} from "react-icons/bs";
import { useDrop } from 'react-dnd';



export const Board = () => {

const [deck, setDeck] = useState(Deck)
const [spadesArray, setSpadesArray] = useState([])
const [heartsArray, setHeartsArray] = useState([])
const [clubsArray, setClubsArray] = useState([])
const [diamondsArray, setDiamondsArray] = useState([])


useEffect(() => {
    finishedGame()


}, [spadesArray, diamondsArray, heartsArray, clubsArray, deck])






  const finishedGame = () => {
    if(diamondsArray.length === 13 && heartsArray.length === 13 && spadesArray.length === 13 && clubsArray.length === 13) {
         alert('All cards are sorted!')
    } else {
        return;  
    }
   
  }




 const [{isOver}, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => dropInSpadesArray(item.id, item.suit, item.value, item.face),
    collect: (monitor) => ({
        isOver: !!monitor.isOver(),
    })
 
})) 

const [{isOverHearts}, dropHeart] = useDrop(() => ({
    accept: "card",
    drop: (item) => dropInHeartsArray(item.id, item.suit, item.value, item.face),
    collect: (monitor) => ({
        isOverHearts: !!monitor.isOver(),
    })
 
})) 

const [{isOverClubs}, dropClub] = useDrop(() => ({
    accept: "card",
    drop: (item) => dropInClubsArray(item.id, item.suit, item.value, item.face),
    collect: (monitor) => ({
        isOverClubs: !!monitor.isOver(),
    })
 
})) 

const [{isOverDiamonds}, dropDiamond] = useDrop(() => ({
    accept: "card",
    drop: (item) => dropInDiamondsArray(item.id, item.suit, item.value, item.face),
    collect: (monitor) => ({
        isOverDiamonds: !!monitor.isOver(),
    })
 
})) 


const spliceFromCards = (id) => {
    for (let i = 0; i < deck.length; i++) {
        if(deck[i].id === id) {
            deck.splice(i, 1);
        }
        
    }
}




const dropInHeartsArray = (id, suit, value, face) => {
    setHeartsArray(heartsArray => {
      if (heartsArray.length === 0 && suit === "hearts") {
        if (value === 1) {
          spliceFromCards(id)
          return [...heartsArray, {id: id, face: face, suit: suit, value: value}];
        }
      } else if (heartsArray.length > 0 && suit === "hearts") {
       
        if (heartsArray[heartsArray.length-1].value === value-1) {
            setHeartsArray(heartsArray => {
                spliceFromCards(id)
                return [...heartsArray, {id: id, face: face, suit: suit, value: value}];
            })
        } else {
            console.log('this is the hearts array else statement')
        }
      }

      return heartsArray;
    });
  };

  const dropInSpadesArray = (id, suit, value, face) => {
    setSpadesArray(spadesArray => {
      if (spadesArray.length === 0 && suit === "spades") {
        if (value === 1) {
          spliceFromCards(id)
          return [...spadesArray, {id: id, face: face, suit: suit, value: value}];
        }
      } else if (spadesArray.length > 0 && suit === "spades") {
        if (spadesArray[spadesArray.length-1].value === value - 1) {
            setSpadesArray(spadesArray => {
                spliceFromCards(id)
                return [...spadesArray, {id: id, face: face, suit: suit, value: value}];
            })
        }
      }

      return spadesArray;
    });
  };

  const dropInClubsArray = (id, suit, value, face) => {
    setClubsArray(clubsArray => {
      if (clubsArray.length === 0 && suit === "clubs") {
        if (value === 1) {
          spliceFromCards(id)
          return [...clubsArray, {id: id, face: face, suit: suit, value: value}];
        }
      } else if (clubsArray.length > 0 && suit === "clubs") {
        if (clubsArray[clubsArray.length-1].value === value - 1) {
            setClubsArray(clubsArray => {
                spliceFromCards(id)
                return [...clubsArray, {id: id, face: face, suit: suit, value: value}];
            })
        }
      }

      return clubsArray;
    });
  };

  const dropInDiamondsArray = (id, suit, value, face) => {
    setDiamondsArray(diamondsArray => {
      if (diamondsArray.length === 0 && suit === "diamonds") {
        if (value === 1) {
          spliceFromCards(id)
          return [...diamondsArray, {id: id, face: face, suit: suit, value: value}];
        }
      } else if (diamondsArray.length > 0 && suit === "diamonds") {
        if (diamondsArray[diamondsArray.length-1].value === value - 1) {
            setDiamondsArray(diamondsArray => {
                spliceFromCards(id)
                return [...diamondsArray, {id: id, face: face, suit: suit, value: value}];
            })
        } else {
            return;
        }
      }

      return diamondsArray;
    });
  };


  return (
    <div className='board'>
            <div className='drop-box'>

                    <div className='card-place'  ref={drop} >
                        <BsSuitSpade className={spadesArray.length === 0 ? 'icon': 'icon hidden'}/>
                        {spadesArray.map((card) => {
                            return <span key={card.id}><img src={card.face} className='dropped-card'/></span>
                        })}
                    </div>

                    <div className='card-place' ref={dropHeart}>
                        <BsSuitHeart className={heartsArray.length === 0 ? 'icon': 'icon hidden'}/>
                        {heartsArray.map(card => {
                            return <span key={card.id}><img src={card.face} className='dropped-card'/></span>
                        })}
                    </div>

                    <div className='card-place' ref={dropClub}>
                        <BsSuitClub className={clubsArray.length === 0 ? 'icon': 'icon hidden'}/>
                        {clubsArray.map((card) => {
                            return <span key={card.id}><img src={card.face} className='dropped-card'/></span>
                        })}
                    </div>

                    <div className='card-place' ref={dropDiamond}>
                        <BsSuitDiamond className={diamondsArray.length === 0 ? 'icon': 'icon hidden'}/>
                        {diamondsArray.map((card) => {
                            return <span key={card.id}><img src={card.face} className='dropped-card'/></span>
                        })}
                    </div>
            </div>
  
            <div className='card-box'>
                    {deck.map((card) => {
                        return <span key={card.id}><CardItem face={card.face} id={card.id} suit={card.suit} value={card.value} /></span>
                    })}
            </div>
    </div>
  )
}
