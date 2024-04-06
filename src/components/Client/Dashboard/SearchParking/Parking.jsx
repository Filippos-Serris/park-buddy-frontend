import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Parking = () => {
  const token = localStorage.getItem("token");

  const [parking, setParking] = useState({});

  useEffect(() => {
    async function fetchParking() {
      try {
        const fetchUrl = new URL("http://localhost:8080/parking/details");
        fetchUrl.searchParams.append("parkingId", params.parkingId);

        const res = await fetch(fetchUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const resData = await res.json();
        console.log(resData);
        setParking(resData);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchParking();
  }, []);

  const params = useParams();
  return <h1>{params.parkingId}</h1>;
};

export default Parking;
