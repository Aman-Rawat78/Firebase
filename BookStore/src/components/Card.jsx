import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const Cards = (props) => {
    const navigate = useNavigate();
    console.log("Card props:", props);
  return (
    <div className="card-uniform">
      
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={props.imageURL} className="card-image"  />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
            Author : <strong>{props.Author}</strong> <br/>
            Price : Rs.<strong>{props.price}</strong> <br/>
          
        </Card.Text>
        <Button onClick={e => navigate(`/book/view/${props.id}`)} variant="primary"> View</Button>
      </Card.Body>
    </Card>

    </div>
  )
}

export default Cards;