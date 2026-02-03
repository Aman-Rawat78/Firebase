import React, {  useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import Cards from '../components/Card.jsx';
import CardGroup from 'react-bootstrap/CardGroup';
const OrdersPage = () => {
  const [books,setBooks] = useState([])
  const { fetchMyBooks,isLoggedIn,user} = useFirebase();

  useEffect(() => {
    if(isLoggedIn) fetchMyBooks(user.uid)?.then((books)=> setBooks(books.docs));
  }, [isLoggedIn]);

  if(!isLoggedIn){
    return <h2>Please login to view your orders</h2>
  }
   
  return (
    <div>
      <CardGroup>
        {books.length === 0 ? (
          <div style={{ width: '100%', textAlign: 'center', margin: '2rem 0', fontSize: '2rem', fontWeight: 'bold' }}>
            You haven't listed any books yet.
          </div>
        ) : (
          books.map((book) => (
            <Cards key={book.id} link={`/book/orders/${book.id}`} {...book.data()} text={"Check order"} />
          ))
        )}
      </CardGroup>
    </div>
  )
}

export default OrdersPage