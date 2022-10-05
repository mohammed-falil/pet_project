import "./App.css";
import React from "react";
import NavigationBar from "./components/navigation_bar/NavigationBar";
import CarView from "./components/car_view/CarView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import AddCar from "./components/cars/AddCar/AddCar";
import CarList from "./components/cars/CarsList/CarList";
import EditCar from "./components/cars/EditCar/EditCar";
import ViewCar from "./components/cars/ViewCar/ViewCar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/user/view/:item" element={<CarView />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/add-car" element={<AddCar />} />
          <Route path="/admin/car-list" element={<CarList />} />
          <Route path="/admin/edit-car" element={<EditCar />} />
          <Route path="/admin/view-car" element={<ViewCar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
