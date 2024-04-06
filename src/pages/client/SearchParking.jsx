import { useEffect, useState } from "react";
import SearchForm from "../../components/Client/Dashboard/SearchParking/SearchForm";
import ParkingResults from "../../components/Client/Dashboard/SearchParking/ParkingResults";

import "../../assets/styles/pages/client/SearchParking.css";

const SearchParking = () => {
  const token = localStorage.getItem("token");

  const [firstLoad, setFirstLoad] = useState(true);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [showParkings, setShowParkings] = useState(false);

  const [filters, setFilters] = useState({});
  const [parkings, setParkings] = useState();

  const searchForParking = (searchData) => {
    setFilters(searchData);
    console.log(filters);
    setTriggerSearch(!triggerSearch);
  };

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    async function fetchParkings() {
      try {
        const fetchUrl = new URL("http://localhost:8080/parking");

        fetchUrl.searchParams.append("city", filters.city);
        fetchUrl.searchParams.append("arrivalDate", filters.arrivalDate);
        fetchUrl.searchParams.append("arrivalTime", filters.arrivalTime);
        fetchUrl.searchParams.append("departDate", filters.departDate);
        fetchUrl.searchParams.append("departTime", filters.departTime);
        fetchUrl.searchParams.append("vehicle", filters.vehicle);

        console.log(fetchUrl);

        const res = await fetch(fetchUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const resData = await res.json();
        console.log(resData);

        setParkings(resData.availableParkings);
        setShowParkings(true);

        if (res.status === 200) {
          //navigate("/dashboard");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchParkings();
  }, [filters]);

  return (
    <div className="search-parking-container">
      <SearchForm onSearch={searchForParking} />
      {showParkings && (
        <div>
          <h2>Available parkings in the area</h2>
          <ParkingResults parkings={parkings} />
        </div>
      )}
    </div>
  );
};

export default SearchParking;
