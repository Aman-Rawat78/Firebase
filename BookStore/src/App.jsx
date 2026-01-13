import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import {Route,Routes} from"react-router-dom"

function App() {
  
  return (
    <>
    <Routes>
      <Route path='/' element={<h1>Home Page</h1>}/>
      <Route path='/login' element={<h1>Login Page</h1>}/>
    </Routes>
    </>
  )
}

export default App
