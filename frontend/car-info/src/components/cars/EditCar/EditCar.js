import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CarService from "../../cars/CarService";
import Carousel from "react-bootstrap/Carousel";
import "./editCar.css";
import axios from "axios";

let EditCar = () => {
  let navigate = useNavigate();

  let { name } = useParams();

  const [updateResponse, setUpdateResponse] = useState();

  let jwtToken = sessionStorage.getItem("JWT");
  const [numOfPros, setNumOfPros] = useState(1);
  const [numOfCons, setNumOfCons] = useState(1);
  const [numOfImgs, setNumOfImgs] = useState(1);
  const [numOfFaqs, setNumOfFaq] = useState(1);

  const [carProsList, setCarProsList] = useState([]);
  const [carConsList, setCarConsList] = useState([]);
  const [carImgList, setCarImgList] = useState([]);
  const [carFaqQuestionList, setCarFaqQuestionList] = useState([]);
  const [carFaqAnswerList, setCarFaqAnswerList] = useState([]);
  const [addBtnDisabled, setAddBtnDisbled] = useState(false);
  const [car, setCar] = useState({
    name: "",
    company: "",
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
    faqList: [],
    imageURL: [],
  });

  const updateList = (name, id, value) => {
    switch (name) {
      case "prosList":
        let prosTemp = [...carProsList];
        prosTemp[id] = value;
        setCarProsList(prosTemp);

        break;
      case "consList":
        let consTemp = [...carConsList];
        consTemp[id] = value;
        setCarConsList(consTemp);
        break;
      case "imgList":
        let newImgUrl = {
          imageUrl: value,
          thumbnailUrl: value,
        };
        const imgUrls = [...carImgList];
        imgUrls[id] = newImgUrl;
        setCarImgList(imgUrls);
        break;
      case "faqList-question":
        const newFaqQuestions = [...carFaqQuestionList];
        newFaqQuestions[id] = value;
        console.log(newFaqQuestions);
        setCarFaqQuestionList(newFaqQuestions);
        break;
      case "faqList-answer":
        const newFaqAnswera = [...carFaqAnswerList];
        newFaqAnswera[id] = value;
        setCarFaqAnswerList(newFaqAnswera);
        break;
      default:
    }
  };

  const createInputBox = (event) => {
    let inputId = event.target.id;
    let value = event.target.value;
    if (inputId === "pros-list") {
      setNumOfPros(value);
      createRows(numOfPros, "prosList");
    } else if (inputId === "cons-list") {
      setNumOfCons(value);
      createRows(numOfCons, "consList");
    } else if (inputId === "img-list") {
      createRows(value, "imgList");
      setNumOfImgs(value);
    } else if (inputId === "faq-list") {
      setNumOfFaq(value);
    }
  };

  const createRows = (count, elementName) => {
    let rows = [];

    if (elementName === "prosList") {
      for (let i = 0; i < count; i++) {
        rows.push("");
      }
      setCarProsList(rows);
      setCar({ ...car, prosList: [...carProsList] });
    } else if (elementName === "consList") {
      for (let i = 0; i < count; i++) {
        rows.push("");
      }
      setCarConsList(rows);
      setCar({ ...car, consList: carConsList });
    } else if (elementName === "imgList") {
      for (let i = 0; i < count; i++) {
        rows.push({
          imageUrl: "",
          thumbnailUrl: "",
        });
      }
      console.log("rows : ", rows);
      setCarImgList(rows);
      setCar({ ...car, imageURL: carImgList });
    }
  };

  let submitForm = (event) => {
    event.preventDefault();
    let faqs = [];
    for (let i = 0; i < numOfFaqs; i++) {
      faqs.push({
        question: carFaqQuestionList[i],
        answer: carFaqAnswerList[i],
      });
    }

    car.prosList = carProsList;
    car.consList = carConsList;
    car.imageURL = carImgList;
    car.faqList = faqs;
    setAddBtnDisbled(true);
    if (jwtToken !== null) {
      responseFunction(car);
    }
  };

  async function responseFunction(car) {
    let response = await CarService.updateCar(car, jwtToken);
    setUpdateResponse(response.data.error);
    // navigate("/admin/car-list");
    <Link to="/admin/car-list" />;

    if (updateResponse === false) {
      setAddBtnDisbled(false);
    }
  }
  const updateInput = (event) => {
    let { name, value } = event.target;
    setCar({ ...car, [name]: value });
  };

  useEffect(() => {
    let getUrl = "http://localhost:9090/user/name/" + name;
    console.log(getUrl);
    axios.get(getUrl).then((response) => {
      let data = response.data.allCarDetails[0];
      console.log("data: ", data);
      setCar(data);
      console.log(car);
      setNumOfPros(data.prosList.length);
      setCarProsList(data.prosList);
      setNumOfCons(data.consList.length);
      setCarConsList(data.consList);
      setNumOfImgs(data.imageURL.length);
      setCarImgList(data.imageURL);
      setNumOfFaq(data.faqList.length);
      let faqQuestion = [];
      let faqAnswer = [];

      //   for (let i = 0; i < numOfFaqs; i++) {
      //     faqQuestion.push(data.faqList[i].question);
      //     faqAnswer.push(data.faqList[i].answer);
      //     setCarFaqQuestionList()
      //   }

      data.faqList.map((item) => {
        faqQuestion.push(item.question);
        faqAnswer.push(item.answer);
      });

      console.log("faqQuestions: ", faqQuestion.length);
      console.log("faqAnswer", faqAnswer.length);
      setCarFaqQuestionList(faqQuestion);
      setCarFaqAnswerList(faqAnswer);
    });
  }, []);

  return (
    <section className="add-car p-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="h3 text-primary fw-bold">Edit Car Details</p>
            <p className="fst-italic">{"Correct the details "} .</p>
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
              <div className="mb-2">
                <h6 className="title">BHP:</h6>
                <input
                  required="true"
                  name="bhp"
                  value={car.bhp}
                  onChange={updateInput}
                  type="text"
                  className="form-control"
                  placeholder="BHP"
                />
              </div>
              <div className="mb-2">
                <h6 className="title">Boot Space:</h6>
                <input
                  required="true"
                  name="bootSpace"
                  value={car.bootSpace}
                  onChange={updateInput}
                  type="text"
                  className="form-control"
                  placeholder="Boot Space"
                />
              </div>
              <div className="mb-2">
                <h6 className="title">Engine capacity:</h6>
                <input
                  required="true"
                  name="engineCapacity"
                  value={car.engineCapacity}
                  onChange={updateInput}
                  type="text"
                  className="form-control"
                  placeholder="Engine Capacity"
                />
              </div>

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
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
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
                  maxLength="3"
                  size={3}
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
                          value={carProsList[i]}
                          onChange={(e) =>
                            updateList(e.target.name, i, e.target.value)
                          }
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
              {(() => {
                let rows = [];

                for (let i = 0; i < numOfCons; i++) {
                  // if (car.consList.length >= i) {
                  rows.push(
                    <div className="mb-2">
                      <textarea
                        key={i}
                        type="text"
                        className="form-control"
                        required="true"
                        value={carConsList[i]}
                        onChange={(e) =>
                          updateList(e.target.name, i, e.target.value)
                        }
                        placeholder={`Cons list ${i + 1}`}
                        name="consList"
                        id={i}
                      />
                    </div>
                  );
                }
                // }
                return rows;
              })()}

              <div className="mb-2 img-tag">
                <p>List of Images:</p>
                <input
                  type="number"
                  className="form-control"
                  required="true"
                  id="img-list"
                  onChange={createInputBox}
                  value={numOfImgs}
                />
              </div>

              <>
                {(() => {
                  let rows = [];
                  for (let i = 0; i < numOfImgs; i++) {
                    console.log("num of imgs: ", numOfImgs);
                    if (carImgList.length > i) {
                      //   console.log("imageUrls : ", i, car.imageURL[i].imageUrl);
                      rows.push(
                        <div className="mb-2">
                          <textarea
                            key={i}
                            type="text"
                            className="form-control"
                            required="true"
                            value={carImgList[i].imageUrl}
                            onChange={(e) =>
                              updateList(e.target.name, i, e.target.value)
                            }
                            placeholder={`Image ${i + 1}`}
                            name="imgList"
                            id={i}
                          />
                        </div>
                      );
                    }
                  }
                  return rows;
                })()}

                <Carousel className="carsosel-gallery">
                  {carImgList.map((item) =>
                    item.imageUrl !== ""
                      ? (("item: ", item),
                        (
                          <Carousel.Item className="carosel-item">
                            <img
                              // className="d-block w-100"
                              className="d-block"
                              src={item.imageUrl}
                              alt="First slide"
                            />
                          </Carousel.Item>
                        ))
                      : ""
                  )}
                </Carousel>
              </>

              <div className="mb-2">
                <h6 className="title">video URL:</h6>
                <input
                  required="true"
                  name="videoUrl"
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
                  type="number"
                  className="form-control"
                  required="true"
                  id="faq-list"
                  name="faq-list"
                  onChange={createInputBox}
                  value={numOfFaqs}
                />
              </div>
              <>
                {(() => {
                  let rows = [];

                  for (let i = 0; i < numOfFaqs; i++) {
                    // console.log("faqQuestionList: ", carFaqQuestionList[i]);
                    // console.log("faqAnswerList: ", carFaqAnswerList[i]);
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
                            placeholder={`FAQ's Questions ${i + 1}`}
                            value={carFaqQuestionList[i]}
                            name="faqList-question"
                            onChange={(e) =>
                              updateList(e.target.name, i, e.target.value)
                            }
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
                            placeholder={`FAQ's Answer ${i + 1}`}
                            value={carFaqAnswerList[i]}
                            name="faqList-answer"
                            id={i}
                            onChange={(e) =>
                              updateList(e.target.name, i, e.target.value)
                            }
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
                  disabled={addBtnDisabled}
                  value="Edit"
                />
                <Link to={"/admin/car-list"} className="btn btn-dark ms-2">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          {/* <div className="col-md-6">
            <img src={car.photo} className="car-img" alt="car1" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default EditCar;
