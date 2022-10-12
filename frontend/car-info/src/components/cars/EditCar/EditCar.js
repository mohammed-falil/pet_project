import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CarService from "../../cars/CarService";
import Spinner from "../spinner/Spinner";

let EditCar = () => {
  let navigate = useNavigate();

  let { carId } = useParams();

  let [state, setState] = useState({
    loading: false,
    car: {
      name: "",
      company: "",
      photo: "",
      PowerSteering: "",
      FuelType: "",
      BrakeSystem: "",
      ShowroomPrice: "",
      OnRoadPrice: "",
      Mileage: "",
      SeatingCapacity: "",
      GearType: "",
    },
    fueltype: [],
    powersteering: [],
    brakesystem: [],
    seatingcapacity: [],
    geartype: [],
    errorMessage: "",
  });

  let { name } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: false });

        let response = await CarService.getCar(name);
        let carDetails = response.data.allCarDetails[0];
        // let fuelResponse = await
        // let steeringResponse = await CarService.getPowerSteeringTypes();
        // let brakeResponse = await CarService.getBrakeSystemTypes();
        // let seatResponse = await CarService.getSeatingTypes();
        // let gearResponse = await CarService.getGearTypes();

        setState({
          ...state,
          loading: false,
          car: response.data,
          fueltype: ["Petrol", "Diesel", "CNG", "Electric"],
          powersteering: ["Yes", "No"],
          brakesystem: ["ABS", "Drum"],
          seatingcapacity: [2, 5, 8],
          geartype: ["Automatic", "Manual"],
        });
        console.log("carDetails : ", carDetails);
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    }
    fetchData();
  }, [carId]);

  let updateInput = (event) => {
    setState({
      ...state,
      car: {
        ...state.car,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = (event) => {
    async function fetchData() {
      event.preventDefault();
      try {
        let response = await CarService.updateCar(state.car, carId);
        if (response) {
          navigate("/cars/list", { replace: true });
        }
      } catch (error) {
        setState({ ...state, errorMessage: error.message });
        navigate(`/cars/edit/${carId}`, { replace: false });
      }
    }
    fetchData();
  };

  let {
    loading,
    car,
    fueltype,
    powersteering,
    brakesystem,
    seatingcapacity,
    geartype,
    errorMessage,
  } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="add-car p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3 text-primary fw-bold">Edit Car Details</p>
                  <p className="fst-italic">Correct the details of the Car.</p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-md-6">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="name"
                        value={car.name}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="company"
                        value={car.company}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Company"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="photo"
                        value={car.photo}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="img-url"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        required="true"
                        name="FuelType"
                        value={car.FuelType}
                        onChange={updateInput}
                        className="form-control"
                      >
                        <option value="">Select Fuel Type</option>
                        {fueltype.length > 0 &&
                          fueltype.map((ftype, index) => {
                            return (
                              <option key={index} value={ftype}>
                                {ftype}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <select
                        required="true"
                        name="PowerSteering"
                        value={car.PowerSteering}
                        onChange={updateInput}
                        className="form-control"
                      >
                        <option value="">Power Steering</option>
                        {powersteering.length > 0 &&
                          powersteering.map((psType) => {
                            return (
                              <option key={psType.id} value={psType.id}>
                                {psType.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <select
                        required="true"
                        name="BrakeSystem"
                        value={car.BrakeSystem}
                        onChange={updateInput}
                        className="form-control"
                      >
                        <option value="">Break System</option>
                        {brakesystem.length > 0 &&
                          brakesystem.map((bsType) => {
                            return (
                              <option key={bsType.id} value={bsType.id}>
                                {bsType.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="ShowroomPrice"
                        value={car.ShowroomPrice}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Showroom Price"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="OnRoadPrice"
                        value={car.OnRoadPrice}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="On Road Price"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="Mileage"
                        value={car.Mileage}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Mileage"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        required="true"
                        name="SeatingCapacity"
                        value={car.SeatingCapacity}
                        onChange={updateInput}
                        className="form-control"
                      >
                        <option value="">Seating Capacity</option>
                        {seatingcapacity.length > 0 &&
                          seatingcapacity.map((scType) => {
                            return (
                              <option key={scType.id} value={scType.id}>
                                {scType.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <select
                        required="true"
                        name="GearType"
                        value={car.GearType}
                        onChange={updateInput}
                        className="form-control"
                      >
                        <option value="">Gear Type</option>
                        {geartype.length > 0 &&
                          geartype.map((gtType) => {
                            return (
                              <option key={gtType.id} value={gtType.id}>
                                {gtType.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-success"
                        value="Update"
                      />
                      <Link to={"/cars/list"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img src={car.photo} className="car-img" alt="car1" />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default EditCar;
