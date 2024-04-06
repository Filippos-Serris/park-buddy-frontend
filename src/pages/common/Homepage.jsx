import { useNavigate } from "react-router-dom";

import "../../assets/styles/pages/common/Homepage.css";

const Home = () => {
  const navigate = useNavigate();

  const logInHandle = () => {
    navigate("/login");
  };
  const registerHandle = () => {
    navigate("/register");
  };
  return (
    <div className="home-container">
      <h1>
        Welcome to <br />
        BiteBuddy
      </h1>
      <p>
        You are new or old in town, lest help you find a spot. Register or Log
        in and get started.
      </p>
      <div>
        <button onClick={logInHandle}>Log in</button>
        <button onClick={registerHandle}>Register</button>
      </div>
    </div>
  );
};

export default Home;
