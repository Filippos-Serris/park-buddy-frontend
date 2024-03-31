import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [firstLoad, setFirstLoad] = useState(true);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    const logInUser = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logInUser),
        });
        if (!res.ok) {
          const errorData = await res.json();
          setError(`Error: ${errorData.error}`);
        }

        const resData = await res.json();
        const token = resData.token;
        localStorage.setItem("token", token);

        const role = resData.role;
        localStorage.setItem("role", role);

        navigate("/dashboard");
      } catch (error) {
        setShowError(true);
      }
    }
    fetchUser();
  }, [triggerSubmit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTriggerSubmit(!triggerSubmit);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" ref={usernameRef} />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          ref={passwordRef}
          autoComplete="on"
        />

        <button>Log in</button>
      </form>
      {showError && <p>{error}</p>}
    </div>
  );
};

export default Register;
