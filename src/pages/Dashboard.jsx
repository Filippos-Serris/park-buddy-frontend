import { useContext } from "react";
import { UserContext } from "../store/user-context";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const vehicle = () => {
    navigate("/add-vehicle");
  };

  const parking = () => {
    navigate("/add-parking");
  };

  return (
    <div>
      <h1>
        {user.role}, {user.id}
      </h1>

      <button onClick={vehicle}>Vehicle</button>
      <button onClick={parking}>Parking</button>
    </div>
  );
};

export default Dashboard;
