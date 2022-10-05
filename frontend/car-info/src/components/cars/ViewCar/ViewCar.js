import React, { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom';
import CarService from "../CarService";
import Spinner from "../../cars/spinner/Spinner";

let ViewCar = () => {

    let {carId} = useParams();

    let [state,setState] = useState({
        loading:false,
        car:{},
        errorMessage:'',
        fueltypes:{},
        powersteerings:{},
        seatings:{},
        gears:{},
        brakes:{}
    });

    useEffect(()=>{
        async function fetchData(){
            try{
                setState({...state,loading:true});
                let response=await CarService.getCar(carId);
                let fuelResponse = await CarService.getFuel(response.data);
                let steeringResponse = await CarService.getSteering(response.data);
                let seatingResponse = await CarService.getSeats(response.data);
                let gearResponse =await CarService.getGears(response.data);
                let brakeResponse = await CarService.getBrake(response.data);
                setState({
                    ...state,
                    loading:false,
                    car: response.data,
                    fueltypes:fuelResponse.data,
                    powersteerings: steeringResponse.data,
                    seatings: seatingResponse.data,
                    gears: gearResponse.data,
                    brakes: brakeResponse.data
                });
            }
            catch(error){
                setState({
                    ...state,
                    loading: false,
                    errorMessage:error.message
                })    
            }
        }
        
        fetchData();
    
    },[carId])

    let{loading, car, errorMessage, powersteerings, fueltypes,seatings, gears, brakes} = state;

    return(
        <>
        <section className="view-car-intro p-3">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="h3 text-warning fw-bold">View Cars</p>
                        <p className="fst-italic">View the details of car.</p>
                    </div>
                </div>
            </div>
        </section>

        {
            loading ? <Spinner/> : <>
            {
                Object.keys(car).length > 0 && Object.keys(fueltypes).length > 0 &&
                Object.keys(powersteerings).length > 0 && Object.keys(seatings).length > 0 &&
                <section className="view-contact mt-3">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <img src={car.photo} alt="" className="car-img"/>
                    </div>
                    <div className="col-md-8">
                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-action">
                                            Name: <span className="fw-bold">{car.name}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-action">
                                            Company: <span className="fw-bold">{car.company}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-action">
                                            Fuel Type: <span className="fw-bold">{fueltypes.name}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-ation">
                                            Power Steering: <span className="fw-bold">{powersteerings.name}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-action">
                                            Break System: <span className="fw-bold">{brakes.name}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-action">
                                            Showroom Price: <span className="fw-bold">Rs. {car.ShowroomPrice} </span>
                                        </li>
                                        <li className="list-group-item list-group-item-action">
                                            On Road Price: <span className="fw-bold">Rs. {car.OnRoadPrice}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-action">
                                            Mileage: <span className="fw-bold">{car.Mileage}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-action">
                                            Seating Capacity: <span className="fw-bold">{seatings.name}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-action">
                                            Gear Type: <span className="fw-bold">{gears.name}</span>
                                        </li>
                                    </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Link to={'/cars/list'} className="btn btn-warning">Back</Link>
                    </div>
                </div>
            </div>
        </section>
            }
            
            </>
        }
        
        </>
    )
};
export default ViewCar;