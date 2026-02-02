import React, { use, useInsertionEffect, useState } from 'react'
import {useFirebase} from '../context/Firebase'
import { useEffect } from 'react';
import  { Cards } from '../components/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const HomePage = () => {
    const {listAllBooks} = useFirebase();
    const [books, setBooks] = useState([]);
    useEffect(() => {  
        listAllBooks().then((books) => {
            console.log("Books in store:", books.docs);
            setBooks(books.docs);
        }).catch((error) => {
            console.error("Error fetching books:", error);
        });
    }, []);
  return (
    <div className='container'>
        <h1>Welcome to the Book Store</h1>
        <CardGroup >
            {books.map((book) => (
                 console.log("Rendering book:", book.id),
                <Cards key={book.id} id={book.id} {...book.data()}/>
            ))}
        </CardGroup>
    </div>  
  )
}

export default HomePage