import "./App.css";
import React, { useState } from "react";
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
// import CarListCopy from "./components/cars/CarsList/CarListCopy";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/user/view/:item" element={<CarView />} />
          <Route
            path="/signup"
            element={<SignUp setLoggedIn={setLoggedIn} />}
          />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/admin/add-car" element={<AddCar />} />
          <Route path="/admin/car-list" element={<CarList />} />
          <Route path="/admin/edit-car/:name" element={<EditCar />} />
          <Route path="/admin/view-car" element={<ViewCar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
