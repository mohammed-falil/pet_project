package com.te.carinfoapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.te.carinfoapp.dto.CarDetails;
import com.te.carinfoapp.dto.CarDetailsResponse;
import com.te.carinfoapp.service.AdminService;

@RestController
@RequestMapping("/user")
@CrossOrigin("http:localhost:3000/")
public class UserController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/name/{name}")
    public ResponseEntity<?> getCarByName(@PathVariable String name) {
        System.out.println(name);
        try {
            List<CarDetails> carList = adminService.getcarbyname(name);
            return ResponseEntity.ok(new CarDetailsResponse(false, "null", carList));
        } catch (Exception e) {
            return ResponseEntity.ok(new CarDetailsResponse(true, "something went wrong", null));
        }

    }

    @GetMapping("/fuel-type/{fuelType}")
    public ResponseEntity<?> getByCarFuelType(@PathVariable String fuelType) {

        try {
            List<CarDetails> car1 = adminService.getCarbyFuelType(fuelType);

            return ResponseEntity.ok(new CarDetailsResponse(false, "null", car1));
        } catch (Exception e) {
            return ResponseEntity.ok(new CarDetailsResponse(true, "something went wrong", null));
        }


    }

    @GetMapping("company/{company}")
    public ResponseEntity<?> getByCarcompany(@PathVariable String company) {
        try {
            List<CarDetails> carDetailsList = adminService.getcarbycompany(company);
            return ResponseEntity.ok(new CarDetailsResponse(false, "null", carDetailsList));
        } catch (Exception e) {
            return ResponseEntity.ok(new CarDetailsResponse(true, "something went wrong", null));
        }


    }

    @GetMapping("search/{search}")
    public ResponseEntity<List<CarDetails>> getSearchItems(@PathVariable String search) {

        System.out.println("Search "+search);
        try {
            List<CarDetails> carDetailsList = adminService.getSearchItems(search);
            if (carDetailsList != null) {
                return ResponseEntity.ok(carDetailsList);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();

        }


    }


}
