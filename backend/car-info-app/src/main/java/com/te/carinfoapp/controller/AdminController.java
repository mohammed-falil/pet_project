package com.te.carinfoapp.controller;

import java.util.List;


import javax.management.relation.Role;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.endpoint.web.annotation.RestControllerEndpoint;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.te.carinfoapp.dto.AdminDetails;
import com.te.carinfoapp.dto.AdminRequest;
import com.te.carinfoapp.dto.AdminResponse;
import com.te.carinfoapp.dto.CarDetails;
import com.te.carinfoapp.dto.CarDetailsResponse;
import com.te.carinfoapp.service.AdminService;
import com.te.carinfoapp.util.JwtUtil;

import ch.qos.logback.classic.Logger;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(path = "/admin")

@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AdminService adminService;


    @PostMapping("/loginAuthenticate")
    public ResponseEntity<?> createLoginAuthenticationToken(@RequestBody AdminRequest admin) {

        try {
            log.info("admin" + admin);

            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(admin.getUsername(), admin.getPassword()));
        } catch (AuthenticationException e) {
            return ResponseEntity.ok(new AdminResponse(true, "Invalid Username or Password", null, null));
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(admin.getUsername());
        AdminDetails adminDetails1 = adminService.getAdminDetails(userDetails.getUsername());
        String jwtToken = jwtUtil.generateToken(userDetails);
        System.out.println(jwtToken);
        return ResponseEntity.ok(new AdminResponse(false, "Authentication Success", jwtToken, adminDetails1.getRole()));
    }

    @PostMapping("/signupAuthenticate")
    public ResponseEntity<?> createSignupAuthenticationToken(@RequestBody AdminDetails adminDetails) {

        AdminDetails signupData;
        try {
            signupData = adminService.saveSignupData(adminDetails);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(new AdminResponse(true, "Username already present, Please Login", null, null));
        }
        if (signupData != null) {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signupData.getUsername(), signupData.getPassword()));

            UserDetails userDetails = userDetailsService.loadUserByUsername(signupData.getUsername());

            String jwtToken = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new AdminResponse(false, "Signup Success", jwtToken, adminDetails.getRole()));
        } else {
            return ResponseEntity.ok(new AdminResponse(true, "Username Already Exists", null, null));
        }

    }

    @GetMapping("/car/information")
    public ResponseEntity<?> getAllCarDetails() {

        try {
            List<CarDetails> cars = adminService.getAllCarDetails();
            return ResponseEntity.ok(new CarDetailsResponse(false, "success", cars));
        } catch (Exception e) {
            return ResponseEntity.ok(new CarDetailsResponse(true, "something went wrong", null));
        }
    }

    @CrossOrigin(allowedHeaders = "*", origins = "*")

    @PostMapping("/car/information")
    public ResponseEntity<?> addCarDetails(@RequestBody CarDetails carDetails, HttpServletRequest request) {
        try {
            adminService.addCarDetails(carDetails, request);
            return ResponseEntity.ok(new CarDetailsResponse(false, "Car Details Added Successfully", null));
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());

            return ResponseEntity.ok(new CarDetailsResponse(true, " something went wrong", null));
        }

    }

    @PutMapping("/car/information/{carId}")
    public ResponseEntity<?> updateCarDetails(@RequestBody CarDetails carDetails, HttpServletRequest request,
                                              @PathVariable int carId) {

        try {
            carDetails.setId(carId);
            adminService.updateCarDetails(carDetails, request);
            return ResponseEntity.ok(new CarDetailsResponse(false, "Car Details Updated Successfully", null));
        } catch (Exception e) {
            return ResponseEntity.ok(new CarDetailsResponse(false, "Oops something went wrong", null));
        }

    }

    @DeleteMapping("/car/information/{id}")
    public ResponseEntity<?> deleteCarDetails(@PathVariable int id) {
        try {
            adminService.deleteCarDetails(id);
            return ResponseEntity.ok(new CarDetailsResponse(false, "Car Details Deleted Successfully", null));
        } catch (Exception e) {
            return ResponseEntity.ok(new CarDetailsResponse(true, "Opps something went wrong", null));
        }

    }


}
