import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const Cards = (props) => {
    const navigate = useNavigate();
  
  return (
    <div className="card-uniform" onClick={e => navigate(props.link)}>
      
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={props.imageURL} className="card-image"  />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
            Author : <strong>{props.Author}</strong> <br/>
            Price : Rs.<strong>{props.price}</strong> <br/>
          
        </Card.Text>
        <Button onClick={e => navigate(props.link)} variant="primary"> {props.text}</Button>
      </Card.Body>
    </Card>

    </div>
  )
}

export default Cards;