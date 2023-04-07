import './board.css'
import { Deck } from '../deck/Deck'
import { useEffect, useState } from 'react'
import { CardItem } from '../carditem/CardItem'
import { BsSuitSpade } from "react-icons/bs";
import { useDrop } from 'react-dnd';



export const Board = () => {

const [deck, setDeck] = useState(Deck)
const [spadesArray, setSpadesArray] = useState([])

useEffect(() => {
    console.log('spades array: ' + spadesArray);
    console.log('spades array length: ' + spadesArray.length)
  }, [spadesArray]);



 const [{isOver}, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => dropInSpadesArray(item.id, item.suit, item.value),
    collect: (monitor) => ({
        isOver: !!monitor.isOver(),
    })
 
})) 


const dropInSpadesArray = (id, suit, value) => {
    setSpadesArray(spadesArray => {
      if (spadesArray.length === 0 && suit === "spades") {
        if (value === 1) {
          const newArray = deck.filter(item => id === item.id);
          return [...spadesArray, newArray[0]];
        }
      } else if (spadesArray.length > 0 && suit === "spades") {
        if (spadesArray[spadesArray.length-1].value === value - 1) {
            setSpadesArray(spadesArray => {
                const newArray = deck.filter(item => id === item.id);
                return [...spadesArray, newArray[0]];
            })
        }
      }
      return spadesArray;
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
                    <div className='card-place'></div>
                    <div className='card-place'></div>
                    <div className='card-place'></div>
            </div>
  
            <div className='card-box'>
                    {deck.map((card) => {
                        return <span key={card.id}><CardItem face={card.face} id={card.id} suit={card.suit} value={card.value} /></span>
                    })}
            </div>
    </div>
  )
}
