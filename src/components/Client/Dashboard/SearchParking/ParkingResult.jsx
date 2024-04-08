import { Link, useNavigate } from "react-router-dom";

import "../../../../assets/styles/client/Dashboard/SearchParking/ParkingResult.css";

const ParkingResult = (props) => {
  const { parkings } = props;

  const navigate = useNavigate();

  const handleSelection = () => {
    navigate(`/parking/${parkings._id}`);
  };

  return (
    <div className="parking-container" onClick={handleSelection}>
      <h2>{parkings.name}</h2>
      {parkings.availableSlots.car === 0 &&
        parkings.availableSlots.moto === 0 && <h1>FULL</h1>}
      <p>
        Address <br />
        {`${parkings.location.street} ${parkings.location.number}, ${parkings.location.city} ${parkings.location.postal}`}
      </p>

      <p>
        Available slots cars:{`${parkings.availableSlots.car}`}, moto:
        {`${parkings.availableSlots.moto}`}
      </p>
    </div>
  );
};

export default ParkingResult;
