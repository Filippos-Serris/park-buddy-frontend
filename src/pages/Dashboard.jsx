import { useContext } from "react";
import { UserContext } from "../store/user-context";
import { useNavigate } from "react-router-dom";
import ClientDashboard from "../components/Client/ClientDashboard";
import OwnerDashboard from "../components/Owner/OwnerDashboard";

const Dashboard = () => {
  const { role } = useContext(UserContext);
  const navigate = useNavigate();

  const vehicle = () => {
    navigate("/add-vehicle");
  };

  const parking = () => {
    navigate("/add-parking");
  };

  return (
    <div>
      <h1>{role}</h1>

      <ClientDashboard />
      <OwnerDashboard />

      <button onClick={vehicle}>Vehicle</button>
      <button onClick={parking}>Parking</button>
    </div>
  );
};

export default Dashboard;
