import React from 'react'
import platter from './Platter'

const Card = () => {
  return (
    <div className="menu">
      {platter.map((item) => (
        <div className="card" key={item.index}>
          <img src={`${item.image}`} alt={item.food_name} />
          <h3>{item.food_name}</h3>
          <p>{item.size}</p>
          <p>{item.type}</p>
          <p>Price: ₹{item.price}</p>
        </div>
      ))}
    </div>
  )
}

export default Card
