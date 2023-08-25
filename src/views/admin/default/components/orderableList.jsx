import React, {useState} from 'react';

const OrderableList = ({children, data, setData}) => {

   const [active, setActive] = useState(false)

   const [activeItem, setActiveItem] = useState(null)

   const [currentCard, setCurrentCard] = useState(null)

   const dragStartHandler = (e, item) => {
      setCurrentCard(item)
   }

   const dragOverHandler = (e) => {
      e.preventDefault()
      e.target.style.border = '1px solid'
   }


   const dragEndHandler = (e) => {
      e.preventDefault()
      e.target.style.border = ''
   }

   const dropHandler = (e, card) => {
      e.preventDefault()
      const reOrderedNewCard = {...currentCard, order:card.order}
      setData(prev => prev.map(c => {
         if(currentCard.id === c.id) return reOrderedNewCard
         if(currentCard.order > card.order) {
            if(c.order >= card.order && c.order < currentCard.order) return {...c, order: c.order += 1}
         } else if(currentCard.order < card.order) {
            if(c.order <= card.order &&  c.order > currentCard.order) return {...c, order: c.order -= 1}
         }
         return c
      }))

      e.target.style.border = ''

   }

   return (
       <div>
          {
             data.map((item, i) =>
                 <div
                     key={item.id}
                     onDragStart={(e) => dragStartHandler(e, item)}
                     onDragLeave={e => dragEndHandler(e)}
                     onDragEnd={(e) => dragEndHandler(e)}
                     onDragOver={(e) => dragOverHandler(e)}
                     onDrop={(e) => dropHandler(e, item)}
                     draggable={active}>
                    {children(item, setActiveItem, setActive, active, activeItem)}
                 </div>)
          }
       </div>
   );
};

export default OrderableList;