import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const registerVehicle = () => {
    navigate("/add-vehicle");
  };

  const parking = () => {
    navigate("/add-parking");
  };

  return (
    <div>
      <div>Parkings</div>
      <button onClick={registerVehicle}>Vehicle</button>
      <button onClick={parking}>Parking</button>
    </div>
  );
};

export default OwnerDashboard;
