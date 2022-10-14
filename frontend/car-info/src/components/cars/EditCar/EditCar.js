import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CarService from "../../cars/CarService";
import Spinner from "../spinner/Spinner";
import Carousel from "react-bootstrap/Carousel";

import "./editCar.css";
import axios from "axios";
let EditCar = () => {
  let navigate = useNavigate();

  let { carId } = useParams();

  const [numOfPros, setNumOfPros] = useState(1);
  const [numOfCons, setNumOfCons] = useState(1);
  const [numOfImgs, setNumOfImgs] = useState(1);
  const [numOfFaqs, setNumOfFaq] = useState(1);

  let [state, setState] = useState({
    loading: false,
    car: {
      name: "",
      company: "",
      photo: "",
      PowerSteering: "",
      fuelType: "",
      brakeSystem: "",
      showroomPrice: "",
      onroadPrice: "",
      mileage: "",
      seatingCapacity: "",
      gearType: "",
      bhp: "",
      bootSpace: "",
      engineCapacity: "",
      videoUrl: "",
      powerSteering: "",
      prosList: [],
      consList: [],
      faqList: [
        {
          question: "",
          answer: "",
        },
      ],
      imageURL: [
        {
          thumbnailUrl: "",
          imageUrl: "",
        },
      ],
    },

    // errorMessage: "",
  });

  let { name } = useParams();

  const updateList = (event) => {
    let { name, id, value } = event.target;
    if (name === "prosList" || name === "consList") {
      setState((current) => {
        return {
          ...current,
          car: {
            ...current.car,
            [name]: {
              id: value,
            },
          },
        };
      });
    } else if (name === "imageURL") {
      let newImgUrl = {
        imageUrl: value,
        thumbnailUrl: value,
      };
      setState((current) => {
        return {
          ...current,
          car: {
            ...current.car,
            imageURL: [
              {
                id: newImgUrl,
              },
              ...current.car.imageURL,
            ],
          },
        };
      });
    } else if (name === "faqList-question" || name === "faqList-answer") {
      let newFaq = {
        question: "",
        answer: "",
      };

      if (name === "faqList-question") {
        newFaq.question = value;
      } else if (name === "faqList-answer") {
        newFaq.answer = value;
      }

      setState((current) => {
        return {
          ...current,
          car: {
            ...current.car,
            faqList: [
              {
                id: newFaq,
              },
              ...current.car.faqList,
            ],
          },
        };
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: false });

        let response = await CarService.getCar(name);
        let carDetails = response.data.allCarDetails[0];

        setState({
          ...state,
          loading: false,
          car: carDetails,
        });

        setNumOfPros(carDetails.prosList.length);
        setNumOfCons(carDetails.consList.length);
        setNumOfFaq(carDetails.faqList.length);
        setNumOfImgs(carDetails.imageURL.length);
        console.log("car details: ", carDetails);
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
    } else if (inputId === "cons-list") {
      setNumOfCons(value);
    } else if (inputId === "img-list") {
      setNumOfImgs(value);
    } else if (inputId === "faq-list") {
      setNumOfFaq(value);
    }
  };

  let submitForm = (event) => {
    event.preventDefault();
    let jwtToken = sessionStorage.getItem("JWT");
    if (jwtToken === null) {
    } else {
      let response = CarService.updateCar(car, "Bearer " + jwtToken);
      console.log("inside onSubmitForm response: ", response);
    }
  };

  let { loading, car } = state;

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
                  <p className="fst-italic">
                    {"Correct the details " + name} .
                  </p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-md-6">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <h6 className="title">Name:</h6>
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
                      <h6 className="title">Company:</h6>
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
                    {/* <div className="mb-2">
                      <h6 className="title">Image URLs:</h6>
                      <input
                        required="true"
                        name="photo"
                        value={car.photo}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="img-url"
                      />
                    </div> */}

                    <div className="mb-2">
                      <h6 className="title">Fuel Type:</h6>
                      <select
                        required="true"
                        name="fuelType"
                        value={car.fuelType}
                        onChange={updateInput}
                        className="form-control"
                      >
                        <option value="" disabled selected>
                          Select Fuel Type
                        </option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="CNG">CNG</option>
                        <option value="Electric">Electric</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <h6 className="title">Power Steering:</h6>
                      <select
                        required="true"
                        name="powerSteering"
                        value={car.powerSteering}
                        onChange={updateInput}
                        className="form-control"
                      >
                        <option value="" disabled selected>
                          Power Steering
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <h6 className="title">Brake System:</h6>
                      <select
                        required="true"
                        name="brakeSystem"
                        value={car.brakeSystem}
                        onChange={updateInput}
                        className="form-control"
                      >
                        <option value="" disabled selected>
                          Break System
                        </option>
                        <option value="ABS">ABS</option>
                        <option value="Drum">Drum</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <h6 className="title">Showroom Price:</h6>
                      <input
                        required="true"
                        name="showroomPrice"
                        value={car.showroomPrice}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Showroom Price"
                      />
                    </div>
                    <div className="mb-2">
                      <h6 className="title">On Road Price:</h6>
                      <input
                        required="true"
                        name="onroadPrice"
                        value={car.onroadPrice}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="On Road Price"
                      />
                    </div>
                    <div className="mb-2">
                      <h6 className="title">Mileage:</h6>

                      <input
                        required="true"
                        name="mileage"
                        value={car.mileage}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Mileage"
                      />
                    </div>
                    <div className="mb-2">
                      <h6 className="title">Seating Capacity:</h6>

                      <select
                        required="true"
                        name="seatingCapacity"
                        value={car.seatingCapacity}
                        onChange={updateInput}
                        className="form-control"
                      >
                        <option value="" disabled selected>
                          Seating Capacity
                        </option>
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="8">8</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <h6 className="title">Gear Type:</h6>

                      <select
                        required="true"
                        name="gearType"
                        value={car.gearType}
                        onChange={updateInput}
                        className="form-control"
                      >
                        <option value="" disabled selected>
                          Gear Type
                        </option>
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
                        name="prosList"
                        onChange={createInputBox}
                        defaultValue="1"
                        value={numOfPros}
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
                                value={car.prosList[i]}
                                onChange={updateList}
                                placeholder={`Pros list ${i + 1}`}
                                name="prosList"
                                id={i}
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
                        defaultValue="1"
                        value={numOfCons}
                        name="consList"
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
                                value={car.consList[i]}
                                name="consList"
                                onChange={updateList}
                                id={i}
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
                        defaultValue="1"
                        value={numOfImgs}
                      />
                    </div>
                    <>
                      {(() => {
                        let rows = [];
                        for (let i = 0; i < numOfImgs; i++) {
                          rows.push(
                            <div className="mb-2">
                              <input
                                key={i}
                                type="text"
                                className="form-control"
                                required="true"
                                placeholder={`Image List ${i}`}
                                value={car.imageURL[i].imageUrl}
                                name="imageURL"
                                onChange={updateList}
                                id={i}
                              />
                              {/* <img src={car.imageURL[i].imageUrl} /> */}
                            </div>
                          );
                        }
                        return rows;
                      })()}

                      <Carousel className="carsosel-gallery">
                        {car.imageURL.map((item) => (
                          <Carousel.Item className="carosel-item">
                            <img
                              // className="d-block w-100"
                              className="d-block"
                              src={item.imageUrl}
                              alt="First slide"
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </>

                    <div className="mb-2">
                      <h6 className="title">video URL:</h6>
                      <input
                        required="true"
                        name="video"
                        value={car.videoUrl}
                        onChange={updateInput}
                        type="video"
                        className="form-control"
                        placeholder="video-url"
                      />
                    </div>
                    <div className="video">
                      <iframe
                        width="560"
                        height="315"
                        src={car.videoUrl}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>

                    <div className="mb-2 faq-tag">
                      <p>List of FAQ's:</p>
                      <input
                        type="text"
                        className="form-control"
                        required="true"
                        id="faq-list"
                        onChange={createInputBox}
                        defaultValue="1"
                        value={numOfFaqs}
                      />
                    </div>
                    <>
                      {(() => {
                        let rows = [];
                        for (let i = 0; i < numOfFaqs; i++) {
                          rows.push(
                            <>
                              <div className="mb-2">
                                <h6 className="title">
                                  {"FAQ Question " + (i + 1) + " :"}
                                </h6>

                                <textarea
                                  key={i}
                                  type="text"
                                  className="form-control"
                                  required="true"
                                  placeholder={`FAQ's Questions ${i}`}
                                  value={car.faqList[i].question}
                                  name="faqList-question"
                                  onChange={updateList}
                                  id={i}
                                />
                              </div>
                              <div className="mb-2">
                                <h6 className="title">
                                  {"FAQ Answer " + (i + 1) + " :"}
                                </h6>
                                <textarea
                                  key={i}
                                  type="text"
                                  className="form-control"
                                  required="true"
                                  placeholder={`FAQ's Answer ${i}`}
                                  value={car.faqList[i].answer}
                                  name="faqList-answer"
                                  id={i}
                                  onChange={updateList}
                                />
                              </div>
                              <hr />
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
