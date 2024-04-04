import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../assets/styles/pages/Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };
  return (
    <div className="logout-container">
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Outlet />
    </div>
  );
};

export default Logout;
