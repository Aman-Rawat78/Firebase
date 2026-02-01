import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { firebaseAuth } from "./context/Firebase";
import MyNav from "./components/Navbar";
import List from "./pages/List";



function App() {
 

  return (
    <>
    <MyNav/>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/book/list" element={<List />} />
      </Routes>
    </>
  );
}

export default App;
