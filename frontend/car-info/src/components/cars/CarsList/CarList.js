import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarService from "../CarService";
import Spinner from "../spinner/Spinner";
import "./carList.css";

let CarList = () => {
  let [state, setState] = useState({
    loading: true,
    cars: [],
    filteredCars: [],
    errorMessage: "",
  });

  useEffect(() => {
    async function fetchData() {
      let jwtToken = sessionStorage.getItem("JWT");
      try {
        setState({ ...state, loading: true });
        let response = await CarService.getAllCars(jwtToken);
        setState({
          ...state,
          loading: false,
          cars: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("state.car: ", state.cars);
  }, [state.cars]);

  //delete car
  let clickDelete = (carName) => {
    async function fetchData() {
      try {
        let jwtToken = sessionStorage.getItem("JWT");
        let response = await CarService.deleteCar(carName, jwtToken);
        if (response) {
          setState({ ...state, loading: true });
          let response = await CarService.getAllCars();
          setState({
            ...state,
            loading: false,
            cars: response.data,
            filteredCars: response.data,
          });
        }
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    }
    fetchData();
  };

  //search cars
  let searchCars = (event) => {
    // setQuery({ ...query, text: event.target.value });
    // let theCars = state.cars.filter((car) => {
    //   return car.name.toLowerCase().includes(event.target.value.toLowerCase());
    // });
    // setState({
    //   ...state,
    //   filteredCars: theCars,
    // });
  };

  let { loading, cars, errorMessage } = state;
  return (
    <>
      <section className="car-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">
                  Car Manager
                  <Link to={"/admin/add-car"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-1" /> New
                  </Link>
                </p>
                <p className="fst-italic">
                  This Shop gives you the best cars with the best prices..
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    {/* <div className="mb-2">
                      <input
                        name="text"
                        // value={query.text}
                        onChange={searchCars}
                        type="text"
                        className="form-control"
                        placeholder="Search cars"
                      />
                    </div> */}
                  </div>
                  {/* <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-outline-dark"
                        value="Search"
                      />
                    </div>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="car-list">
            <div className="container">
              <div className="col">
                {cars.allCarDetails.length > 0 &&
                  cars.allCarDetails.map((car) => {
                    return (
                      <div className="col-md-15" key={car.id}>
                        <div className="card my-2">
                          <div className="card-body my-7">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-3 image-div">
                                <img
                                  src={car.imageURL[0].imageUrl}
                                  alt="car1"
                                  className="car-img"
                                ></img>
                              </div>
                              <div className="col-md-5 detail-div">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name:{" "}
                                    <span className="fw-bold">{car.name}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Company:{" "}
                                    <span className="fw-bold">
                                      {car.company}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Showroom Price:{" "}
                                    <span className="fw-bold">
                                      {car.showroomPrice + "L"}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Mileage:{" "}
                                    <span className="fw-bold">
                                      {car.mileage + " kmpl"}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-3 d-flex flex-column align-items-center">
                                <Link
                                  to={`/user/view/${car.name}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                                <Link
                                  to={`/admin/edit-car/${car.name}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen" />
                                </Link>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => clickDelete(car.name)}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default CarList;
