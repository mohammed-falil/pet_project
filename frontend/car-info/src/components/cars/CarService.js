import axios from "axios";

export default class CarService {
  static serverURL = `http://localhost:9090`;

  //getting geartype list
  static getGearTypes() {
    let dataURL = `${this.serverURL}/geartype`;
    return axios.get(dataURL);
  }

  //getting geartype by id
  static getGears(car) {
    let GearType = car.GearType;
    let dataURL = `${this.serverURL}/geartype/${GearType}`;
    return axios.get(dataURL);
  }

  //getting seating list
  static getSeatingTypes() {
    let dataURL = `${this.serverURL}/seatingcapacity`;
    return axios.get(dataURL);
  }
  //getting seating by id
  static getSeats(car) {
    let SeatingCapacity = car.SeatingCapacity;
    let dataURL = `${this.serverURL}/seatingcapacity/${SeatingCapacity}`;
    return axios.get(dataURL);
  }
  //getting brakesystem list
  static getBrakeSystemTypes() {
    let dataURL = `${this.serverURL}/brakesystem`;
    return axios.get(dataURL);
  }

  //getting brakesystem by id
  static getBrake(car) {
    let BrakeSystem = car.BrakeSystem;
    let dataURL = `${this.serverURL}/brakesystem/${BrakeSystem}`;
    return axios.get(dataURL);
  }
  //getting power steering list
  static getPowerSteeringTypes() {
    let dataURL = `${this.serverURL}/powersteering`;
    return axios.get(dataURL);
  }

  //getting powersteeing by id
  static getSteering(car) {
    let PowerSteering = car.PowerSteering;
    let dataURL = `${this.serverURL}/powersteering/${PowerSteering}`;
    return axios.get(dataURL);
  }

  //getting fueltypes list
  static getFuelTypes() {
    let dataURL = `${this.serverURL}/fueltype`;
    return axios.get(dataURL);
  }
  //getting fueltype by id
  static getFuel(car) {
    let FuelType = car.FuelType;
    let dataURL = `${this.serverURL}/fueltype/${FuelType}`;
    return axios.get(dataURL);
  }

  static getAllCars(jwtToken) {
    let dataURL = `${this.serverURL}/admin/car/information`;
    return axios.get(dataURL, {
      headers: {
        authorization: jwtToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  static getCar(carName) {
    let dataURL = `${this.serverURL}/user/name/${carName}`;
    console.log("getCar is called");
    return axios.get(dataURL);
  }

  static createCar(car, jwtToken) {
    let dataURL = `${this.serverURL}/admin/car/information`;
    console.log(car);
    return axios.post(dataURL, car, {
      headers: {
        authorization: jwtToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  static updateCar(car, jwtToken) {
    let dataURL = `${this.serverURL}/admin/car/information`;
    console.log(car);
    return axios.post(dataURL, car, {
      headers: {
        authorization: jwtToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  static deleteCar(carName, jwtToken) {
    let dataURL = `${this.serverURL}/admin/car/information/${carName}`;
    return axios.delete(dataURL, {
      headers: {
        authorization: jwtToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}
