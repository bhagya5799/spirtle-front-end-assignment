import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import Login from './Components/Login'
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />}>
          </Route>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
