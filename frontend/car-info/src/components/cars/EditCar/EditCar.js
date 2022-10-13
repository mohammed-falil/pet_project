import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CarService from "../../cars/CarService";
import Spinner from "../spinner/Spinner";
import "./editCar.css";
let EditCar = () => {
  let navigate = useNavigate();

  let { carId } = useParams();

  const [numOfPros, setNumOfPros] = useState(1);
  const [numOfCons, setNumOfCons] = useState(1);
  const [listOfImgs, setListOfImgs] = useState(1);
  const [faqList, setFaqList] = useState(1);

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
      Bhp:"",
      BootSpace:"",
      EngineCapacity:"",
      video:""
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

        setState({
          ...state,
          loading: false,
          car: response.data
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

  const createInputBox = (event) => {
    let inputId = event.target.id;
    let value = event.target.value;
    if (inputId === "pros-list") {
      setNumOfPros(value);
    }else if(inputId==="cons-list"){
          setNumOfCons(value);
     }else if(inputId==="img-list"){
      setListOfImgs(value);
    }else if(inputId==="faq-list"){
      setFaqList(value);
    }
  };

  let submitForm = (event) => {
    event.preventDefault();

    console.log("inside onSubmitForm: ", state);
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
                      <input
                        required="true"
                        name="video"
                        value={car.video}
                        onChange={updateInput}
                        type="video"
                        className="form-control"
                        placeholder="video-url"
                        
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
                        <option value="" disabled selected>Select Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="CNG">CNG</option>
                        <option value="Electric">Electric</option>
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
                        <option value="" disabled selected>Power Steering</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
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
                        <option value="" disabled selected>Break System</option>
                        <option value="ABS">ABS</option>
                        <option value="Drum">Drum</option>
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
                        <option value="" disabled selected>Seating Capacity</option>
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="8">8</option>
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
                        <option value="" disabled selected>Gear Type</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                      </select>
                    </div>

                    <div className="mb-2 pros-tag">
                      <p>Number of Pros :</p>
                      <input
                        type="number"
                        className="form-control"
                        required="true"
                        id="pros-list"
                        onChange={createInputBox}
                      />
                    </div>
                    <>
                      {(() => {
                        let rows = [];
                        for (let i = 0; i < numOfPros; i++) {
                          rows.push(
                            <div className="mb-2">
                              <textarea
                                key={i}
                                type="text"
                                className="form-control"
                                required="true"
                                placeholder={`Pros list ${i}`}
                              />
                            </div>
                          );
                        }
                        return rows;
                      })()}
                    </>

                    <div className="mb-2 cons-tag">
                      <p>Number of Cons:</p>
                      <input
                        type="number"
                        className="form-control"
                        required="true"
                        id="cons-list"
                        onChange={createInputBox}
                      />
                    </div>
                    <>
                      {(() => {
                        let rows = [];
                        for (let i = 0; i < numOfCons; i++) {
                          rows.push(
                            <div className="mb-2">
                              <textarea
                                key={i}
                                type="text"
                                className="form-control"
                                required="true"
                                placeholder={`Cons list ${i}`}
                              />
                            </div>
                          );
                        }
                        return rows;
                      })()}
                      </>

                      <div className="mb-2 img-tag">
                        <p>List of Images:</p>
                        <input 
                        type="text"
                        className="form-control"
                        required="true"
                        id="img-list"
                        onChange={createInputBox}
                        />
                      </div>
                      <>
                      {(()=>{
                        let rows=[];
                        for(let i=0;i<listOfImgs;i++){
                          rows.push(
                            <div className="mb-2">
                              <input
                              key={i}
                              type="text"
                              className="form-control"
                              required="true"
                              placeholder={`Image List ${i}`}
                              />
                            </div>
                          );
                        }
                        return rows;
                      })()}
                      </>

                      <div className="mb-2 faq-tag">
                        <p>List of FAQ's:</p>
                        <input 
                        type="text"
                        className="form-control"
                        required="true"
                        id="faq-list"
                        onChange={createInputBox}
                        />
                      </div>
                      <>
                      {(()=>{
                        let rows=[];
                        for(let i=0;i<faqList;i++){
                          rows.push(
                            <>                            
                            <div className="mb-2">
                              <textarea
                              key={i}
                              type="text"
                              className="form-control"
                              required="true"
                              placeholder={`FAQ's Questions ${i}`}
                              />
                            </div>
                            <div className="mb-2">
                            <textarea
                            key={i}
                            type="text"
                            className="form-control"
                            required="true"
                            placeholder={`FAQ's Answer ${i}`}
                            />
                          </div>
                          </>
                          );
                        }
                        return rows;
                      })()}
                      </>
                      

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
