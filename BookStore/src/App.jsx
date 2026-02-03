import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useFirebase } from "./context/Firebase";
import MyNav from "./components/Navbar";
import List from "./pages/List";
import HomePage from "./pages/Home";
import Details from "./pages/Details";
import OrdersPage from "./pages/OrdersPage";
import ViewOrderDetails from "./pages/ViewOrderDetails";


function App() {
  const { isLoggedIn, user, loading } = useFirebase();

  if (loading) {
    // You can replace this with a spinner or skeleton loader if you want
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Redirect all other routes to /signin */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <MyNav />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Redirect /signin and /register to home if logged in */}
          <Route path="/signin" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="/book/list" element={<List />} />
          <Route path="/book/view/:bookId" element={<Details />} />
          <Route path="/book/orders" element={<OrdersPage />} />
          <Route path="/book/orders/:bookId" element={<ViewOrderDetails />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
