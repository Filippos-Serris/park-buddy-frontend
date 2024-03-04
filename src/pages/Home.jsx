import { Link } from "react-router-dom";

import "../assets/styles/pages/Home.css";

const Home = () => {
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
        <button>
          <Link to="/login">Log in</Link>
        </button>
        <button>
          <Link to="/register">Register</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
