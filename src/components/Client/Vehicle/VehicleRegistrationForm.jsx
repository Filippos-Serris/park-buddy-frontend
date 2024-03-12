import { useRef, useEffect, useState } from "react";

const VehicleRegistrationForm = () => {
  const token = localStorage.getItem("token");

  const brandRef = useRef();
  const modelRef = useRef();
  const colorRef = useRef();
  const plateRef = useRef();
  const sizeRef = useRef();

  const [firstLoad, setFirstLoad] = useState(true);
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    const vehicle = {
      brand: brandRef.current.value,
      model: modelRef.current.value,
      color: colorRef.current.value,
      plate: plateRef.current.value,
      size: sizeRef.current.value,
    };
    console.log(vehicle);

    async function postVehicle() {
      const res = await fetch("http://localhost:8080/vehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vehicle),
      });
      //const resData = await res.json();
      //console.log(resData);
    }
    postVehicle();
  }, [run]);

  const handleVehicleSubmit = (event) => {
    event.preventDefault();
    setRun(!run);
  };
  return (
    <form onSubmit={handleVehicleSubmit}>
      <label htmlFor="brand">Brand</label>
      <input id="brand" ref={brandRef}></input>

      <label htmlFor="model">Model</label>
      <input id="model" ref={modelRef}></input>

      <label htmlFor="color">Color</label>
      <input id="color" ref={colorRef}></input>

      <label htmlFor="plate">Plate</label>
      <input id="plate" ref={plateRef}></input>

      <label htmlFor="size">Size</label>
      <input id="size" ref={sizeRef}></input>

      <button>Submit</button>
    </form>
  );
};

export default VehicleRegistrationForm;
