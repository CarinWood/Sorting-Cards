import './cardItem.css'
import { useDrag } from 'react-dnd'

export const CardItem = ({face, id, suit, value}) => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: "card",
        item: {id: id, suit: suit, value: value},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })

    }))

  return (
    <div ref={drag}>
        <img src={face} className={isDragging ? 'card hidden': 'card' }/>
    </div>
  )
}
