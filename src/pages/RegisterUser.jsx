import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/styles/pages/RegisterUser.css";

const Register = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  const [matchingPasswords, setMatchingPasswords] = useState(true);
  const [roleError, setRoleError] = useState(false);

  const navigate = useNavigate();

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const repeatPasswordRef = useRef("");
  const contactInfoRef = useRef("");
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    try {
      const userData = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        contactInfo: contactInfoRef.current.value,
        role: role,
      };

      async function postUser() {
        const res = await fetch("http://localhost:8080/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        if (res.status === 200) {
          navigate("/login");
        }
      }
      postUser();
    } catch (error) {
      console.log("Error:", error.message);
    }
  }, [triggerSubmit]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;

    if (password === repeatPassword) {
      setMatchingPasswords(true);
    } else setMatchingPasswords(false);

    if (role === null) {
      setRoleError(true);
    } else setRoleError(false);

    if (password === repeatPassword && role !== null)
      setTriggerSubmit(!triggerSubmit);
  };

  const roleChangeHandler = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="registration-form-container">
      <h1>Sign Up</h1>
      <p>
        Either you are searching for a spot to put you precious car or a way to
        expand your bushiness we have you. <br />
        Register below and lets get it started
      </p>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="name">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            ref={firstNameRef}
            required
            minLength="4"
            maxLength="10"
          ></input>

          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            ref={lastNameRef}
            required
            minLength="4"
            maxLength="10"
          ></input>
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            required
            minLength="4"
            maxLength="10"
          ></input>
        </div>

        <div>
          <label htmlFor="email">e-mail</label>
          <input type="email" id="email" ref={emailRef} required></input>
        </div>

        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            autoComplete="on"
            required
            minLength="8"
            maxLength="10"
          ></input>

          <label htmlFor="repeat-password">Repeat password</label>
          <input
            type="password"
            id="repeat-password"
            ref={repeatPasswordRef}
            autoComplete="on"
            required
            minLength="8"
            maxLength="10"
          ></input>
          {!matchingPasswords && <p>passwords not matching try again</p>}
        </div>

        <div>
          <label htmlFor="contactInfo">Contact information</label>
          <input
            type="number"
            id="contactInfo"
            ref={contactInfoRef}
            required
          ></input>
        </div>

        <div>
          <label>Role</label>{" "}
          <input
            id="client"
            type="radio"
            name="role"
            value="client"
            onChange={roleChangeHandler}
          ></input>
          <label htmlFor="client">Client</label>
          <input
            id="owner"
            type="radio"
            name="role"
            value="owner"
            onChange={roleChangeHandler}
          ></input>
          <label htmlFor="owner">Owner</label>
          {roleError && <p>role selection is mandatory</p>}
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
