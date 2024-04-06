import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/pages/client/RegisterVehicle.css";

const RegisterVehicle = () => {
  const token = localStorage.getItem("token");

  const brandRef = useRef();
  const modelRef = useRef();
  const colorRef = useRef();
  const plateRef = useRef();
  const sizeRef = useRef();

  const [firstLoad, setFirstLoad] = useState(true);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  const [sizeError, setSizeError] = useState(false);

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    const vehicleData = {
      brand: brandRef.current.value,
      model: modelRef.current.value,
      color: colorRef.current.value,
      plate: plateRef.current.value,
      size: sizeRef.current.value,
    };

    async function postVehicle() {
      try {
        const res = await fetch("http://localhost:8080/vehicle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(vehicleData),
        });
        if (!res.ok) {
          const errorData = await res.json();
          setError(`Error: ${errorData.error}`);
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        setShowError(true);
      }
    }
    postVehicle();
  }, [triggerSubmit]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (sizeRef.current.value === "---select---") {
      setSizeError(true);
    } else {
      setTriggerSubmit(!triggerSubmit);
    }
  };

  return (
    <div className="vehicle-registration-form-container">
      <form className="vehicle-registration-form" onSubmit={handleSubmit}>
        <label htmlFor="brand">Brand</label>
        <input
          id="brand"
          ref={brandRef}
          required
          minLength="3"
          maxLength="10"
        />

        <label htmlFor="model">Model</label>
        <input
          id="model"
          ref={modelRef}
          required
          minLength="3"
          maxLength="10"
        />

        <label htmlFor="color">Color</label>
        <input
          id="color"
          ref={colorRef}
          required
          minLength="3"
          maxLength="10"
        />

        <label htmlFor="plate">Plate</label>
        <input
          id="plate"
          ref={plateRef}
          required
          minLength="6"
          maxLength="10"
        />

        <div>
          <label htmlFor="size">Size</label>
          <select id="size" ref={sizeRef}>
            <option>---select---</option>
            <option value="s">small</option>
            <option value="m">medium</option>
            <option value="l">large</option>
            <option value="moto">moto</option>
          </select>
        </div>
        {sizeError && (
          <p className="error-message">
            Please select an acceptable size from the provided list
          </p>
        )}

        <button>Submit</button>
        {showError && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterVehicle;
