import React, { useState } from "react";
import { getDocs, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../context/firebase";
import { collection, addDoc, doc, getDoc,query,where,updateDoc } from "firebase/firestore";


const firestore = getFirestore(firebaseApp);

export const Collection = () => {
  const [name, setName] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  // to add a collection in firestore
  const writeData = async () => {
    try {
      const docRef = await addDoc(collection(firestore, "cities"), {
        name: name,
        pinCode: pinCode,
        lat: lat,
        long: long,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Data added successfully");
      setName("");
      setPinCode("");
      setLat("");
      setLong("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

// to add a sub-collection in firestore
const makeSubCollection = async () => {
  try {
    const docRef = await addDoc(collection(firestore, "cities/CpVcYryB145xhx0zVuCQ/places"), {
       name: "My Place 2",
       description: "A nice place to visit" ,
       date: new Date().toISOString(),
    });
    console.log("Sub-collection document written with ID: ", docRef.id);
    alert("Sub-collection data added successfully");
  } catch (e) {
    console.error("Error adding sub-collection document: ", e);
  }
};

// to get a document from firestore
const getDocument = async () => {
  const docRef = doc(firestore, "cities", "CpVcYryB145xhx0zVuCQ");
  const docSnap = await getDoc(docRef);

  console.log("Document data:", docSnap.data());
  alert(`Document data: ${JSON.stringify(docSnap.data())}`);
}

// to get a all documents from a collection in firestore
const getCollection = async () => {
  const collectionRef = collection(firestore, "users");
  const q = query(collectionRef, where("isMale", "==", true));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
}

//to update a document in firestore

const updateDocument = async () => {
  // Implementation for updating a document goes here
   const docRef = doc(firestore, "cities", "CpVcYryB145xhx0zVuCQ");
    await updateDoc(docRef, {
      name: "New Delhi",
    });
    console.log("Document updated successfully");
    alert("Document updated successfully");
}

  return (
    <div>
      <div>
        <h1>Details of your cities</h1>
        <div>
          <h3>City</h3>
          <input
            type="text"
            placeholder="Enter your citie name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <h3>Pincode</h3>
          <input
            type="text"
            placeholder="Enter your pin code"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>

        <div>
            <h3>latitude</h3>
          <input
            type="text"
            placeholder="Enter your latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </div>

        <div>
            <h3>Longitude</h3>
          <input
            type="text"
            placeholder="Enter your longitude"
            value={long}
            onChange={(e) => setLong(e.target.value)}
          />
        </div>
      </div>
      <button onClick={writeData}>Write Data</button>
      <br />
        <button onClick={makeSubCollection}>Make Sub-Collection</button>
        <br />
        <button onClick={getDocument}>Get Document</button>
        <br />
        <button onClick={getCollection}>Get Collection</button>
        <br />
        <button onClick={updateDocument}>Update Document</button>
    </div>
  );
};
