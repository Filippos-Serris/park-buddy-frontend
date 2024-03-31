const ParkingResult = (props) => {
  const { parkings } = props;
  return (
    <div>
      <h2>{parkings.name}</h2>
      <p>
        Address:
        {`${parkings.location.street} ${parkings.location.number}, ${parkings.location.city} ${parkings.location.postal}`}
      </p>

      <p>
        Available slots cars:{`${parkings.availableSlots.vehicle}`}, moto:
        {`${parkings.availableSlots.moto}`}
      </p>
    </div>
  );
};

export default ParkingResult;
