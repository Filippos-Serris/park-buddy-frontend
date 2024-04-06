import { useNavigate } from "react-router-dom";

import "../../../assets/styles/client/Dashboard/ClientDashboard.css";

const ClientDashboard = () => {
  const navigate = useNavigate();

  const registerVehicle = () => {
    navigate("/add-vehicle");
  };

  const searchParking = () => {
    navigate("/search-parking");
  };

  return (
    <div>
      <div className="client-dashboard-container">
        <div className="profile">Profile</div>
        <div className="settings">Settings</div>
        <div className="vehicles">Vehicles</div>
        <div className="active-reservations">Active reservations</div>
        <div className="reservation-history">Reservation History</div>
        <div className="register-vehicle" onClick={registerVehicle}>
          Register vehicle
        </div>
      </div>

      <button onClick={searchParking}>Search for parking</button>
    </div>
  );
};

export default ClientDashboard;
