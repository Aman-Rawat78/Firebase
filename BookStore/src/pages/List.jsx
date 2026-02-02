import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const List = () => {
  const [name, setname] = useState("");
  const [Author, setAuthor] = useState("");
  const [price, setprice] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const fileInputRef = useRef(null);

  const { handleCreateNewListing } = useFirebase();

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
const maxSize = 5 * 1024 * 1024; // 5MB

  const handleFileValidation = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type! Only JPG and PNG are allowed.');
      e.target.value = ""; // Clear file input
      setCoverPic(""); // Clear state
      return;
    }
    if (file.size > maxSize) {
      alert('File is too large! Maximum size is 5MB.');
      e.target.value = ""; // Clear file input
      setCoverPic(""); // Clear state
      return;
    }
    setCoverPic(file);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!name || !Author || !price || !coverPic) {
      alert('Please fill all fields and select a cover image.');
      return;
    }
    const success = await handleCreateNewListing(name, Author, price, coverPic);
    if (success) {
      setname("");
      setAuthor("");
      setprice("");
      setCoverPic("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }
  return (
    <div className="Container">
      <div className="register-inner ">
        <h3>Create Book</h3>
        <Form>
          <Form.Group className="mb-3 mt-5" controlId="Name">
            <Form.Label>Enter Book Name</Form.Label>
            <Form.Control
              onChange={(e) => setname(e.target.value)}
              value={name}
              type="name"
              placeholder="Enter Book Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              onChange={(e) => setAuthor(e.target.value)}
              value={Author}
              type="text"
              placeholder="Enter Author Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Price">
            <Form.Label>Enter Price</Form.Label>
            <Form.Control
              onChange={(e) => setprice(e.target.value)}
              value={price}
              type="text"
              placeholder="Enter Price"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="CoverPic">
            <Form.Label>Add CoverPic</Form.Label>
            <Form.Control
              onChange={handleFileValidation}
              type="file"
              accept="image/*"
              ref={fileInputRef}
            />
          </Form.Group>

          <Button onClick={handleSubmit} variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default List;
