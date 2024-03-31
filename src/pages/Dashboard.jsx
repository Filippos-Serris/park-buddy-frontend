import { useNavigate } from "react-router-dom";

import ClientDashboard from "../components/Client/Dashboard/ClientDashboard";
import OwnerDashboard from "../components/Owner/Dashboard/OwnerDashboard";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const parking = () => {
    navigate("/add-parking");
  };

  return (
    <div>
      <h1>Your {role}</h1>
      {role === "client" && (
        <div>
          <ClientDashboard />
        </div>
      )}
      {role === "owner" && (
        <div>
          <OwnerDashboard />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
