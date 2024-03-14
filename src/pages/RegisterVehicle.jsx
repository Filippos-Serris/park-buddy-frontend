import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterVehicle = () => {
  const token = localStorage.getItem("token");

  const brandRef = useRef();
  const modelRef = useRef();
  const colorRef = useRef();
  const plateRef = useRef();
  const sizeRef = useRef();

  const [firstLoad, setFirstLoad] = useState(true);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    try {
      const vehicleData = {
        brand: brandRef.current.value,
        model: modelRef.current.value,
        color: colorRef.current.value,
        plate: plateRef.current.value,
        size: sizeRef.current.value,
      };

      async function postVehicle() {
        const res = await fetch("http://localhost:8080/vehicle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(vehicleData),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        if (res.status === 200) {
          navigate("/dashboard");
        }
      }
      postVehicle();
    } catch (error) {
      console.log("Error:", error.message);
    }
  }, [triggerSubmit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTriggerSubmit(!triggerSubmit);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="brand">Brand</label>
      <input id="brand" ref={brandRef}></input>

      <label htmlFor="model">Model</label>
      <input id="model" ref={modelRef}></input>

      <label htmlFor="color">Color</label>
      <input id="color" ref={colorRef}></input>

      <label htmlFor="plate">Plate</label>
      <input id="plate" ref={plateRef}></input>

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

      <button>Submit</button>
    </form>
  );
};

export default RegisterVehicle;
