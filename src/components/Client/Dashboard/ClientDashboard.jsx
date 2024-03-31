import { useNavigate } from "react-router-dom";

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
      <h2>Client dash</h2>
      <button onClick={registerVehicle}>Vehicle</button>
      <button onClick={searchParking}>Search for parking</button>
    </div>
  );
};

export default ClientDashboard;
