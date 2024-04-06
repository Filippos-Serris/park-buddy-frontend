import ClientDashboard from "../../components/Client/Dashboard/ClientDashboard";
import OwnerDashboard from "../../components/Owner/Dashboard/OwnerDashboard";

import "../../assets/styles/pages/common/Dashboard.css";

const Dashboard = () => {
  const role = localStorage.getItem("role");

  return (
    <div className="dashboard-container">
      <h1>Hi {role}</h1>
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
