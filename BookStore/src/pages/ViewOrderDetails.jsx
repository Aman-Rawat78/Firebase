import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ViewOrderDetails = () => {
   const param = useParams();
   const [orders, setOrders] = useState([]);
    const {getOrder} = useFirebase();
   useEffect(() => {   
     getOrder(param.bookId).then((orders)=> setOrders(orders.docs));
   },[param]);
  return (
    <div className=''> 
      <h1>Orders</h1>
      {
        orders.map((order) => {
        const data = order.data();
     return (
           <Card style={{ width: '80rem', margin: '10px' }} key={order.id}>
      <Card.Header>{data.displayName ? data.displayName : "unknown Name"}</Card.Header>
      <Card.Body>
        <Card.Text>
          {data.userEmail}
        </Card.Text>
        <Card.Text>
          Quantity:    <Button variant="primary"> {data.qty}</Button>
        </Card.Text>
     
      </Card.Body>
    </Card>
     )
})
      }
    </div>
  )
}

export default ViewOrderDetails