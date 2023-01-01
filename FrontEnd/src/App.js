// import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import ReservationsList from "./components/ReservationsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStadiums from "./components/GetStadiums";
import { AdminDashboard } from "./components/admin-dashboard.component";
import { AdminAddStadium } from "./components/admin-add-stadium.component";
import { AdminViewStadiums } from "./components/admin-stadiums.component";
import { AdminViewReservations } from "./components/admin-reservations.component";
import { AdminViewUsers } from "./components/admin-users.component";
import { AdminLogin } from "./components/admin-portal.component";
import { AdminHome } from "./components/admin-home.component";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reservations" element={<ReservationsList />} />
          {/* <Route path="/fetch" element={<GetStadiums />} /> */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard body={<AdminHome />} />} />
          <Route path="/add-stadium" element={<AdminDashboard body={<AdminAddStadium />} />} />
          <Route path="/view-stadiums" element={<AdminDashboard body={<AdminViewStadiums />} />} />
          <Route path="/view-users" element={<AdminDashboard body={<AdminViewUsers />} />} />
          <Route path="/view-reservations" element={<AdminDashboard body={<AdminViewReservations />} />} />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
