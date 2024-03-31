import ParkingResult from "./ParkingResult";

const ParkingResults = (props) => {
  const { parkings } = props;

  return (
    <div>
      <h2>Available parkings in the area</h2>
      <ul>
        {parkings.map((data) => (
          <li>
            <ParkingResult parkings={data} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingResults;
