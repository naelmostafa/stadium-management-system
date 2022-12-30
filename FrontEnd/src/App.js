// import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { AddStadium } from "./components/add-stadium.component";
import Register from "./components/Register";
import ReservationsList from "./components/ReservationsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStadiums from "./components/GetStadiums";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-stadium" element={<AddStadium/>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/reservations" element={<ReservationsList />} />
          <Route path="/fetch" element={<GetStadiums />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
