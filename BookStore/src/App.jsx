import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { firebaseAuth } from "./context/Firebase";
import MyNav from "./components/Navbar";
import List from "./pages/List";
import HomePage from "./pages/Home";
import Details from "./pages/Details";




function App() {
  return (
    <>
      <MyNav />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/book/list" element={<List />} />
          <Route path="/book/view/:bookId" element={<Details />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
