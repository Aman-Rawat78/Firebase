import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LoadingButton from "../components/LoadingButton";

const Details = () => {
  const params = useParams();
  const { getBookById , placeOrder } = useFirebase();
  const [data, setData] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchBookDetails = async () => {
      getBookById(params.bookId).then((value) => setData(value.data()));
    };
    fetchBookDetails();
  }, [params.bookId]);



  const handlePlaceOrder = async () => {
    if(qty <=0){
      alert("Please enter a valid quantity");
      return;
    }
     setLoading(true);
    const result = await placeOrder(params.bookId, qty);
    setLoading(false);
  };

  if (data == null) return <h1>Loading...</h1>;

  return (
    <div className="center-container ">
      <h1>{data.name}</h1>
      <img src={data.imageURL} width="300px" height="350px" alt={data.name} />
      <h1>Details</h1>
      <h4>Price: Rs.{data.price}</h4>
      <h1>Owner Details</h1>
      <h4>Author: {data.Author}</h4>
      <h4>Email: {data.userEmail}</h4>

      <Form.Group className="mb-3" controlId="Quantity">
        <Form.Label>Enter Quantity</Form.Label>
        <Form.Control
          onChange={(e) => setQty(e.target.value)}
          value={qty}
          type="number"
          placeholder="Enter Quantity"
        />
      </Form.Group>
    
      <LoadingButton onClick={handlePlaceOrder} variant="success" type="submit" loading={loading}>
           Buy Now
       </LoadingButton>
    </div>
  );
};

export default Details;
