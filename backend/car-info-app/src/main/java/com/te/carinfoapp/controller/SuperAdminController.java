package com.te.carinfoapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.te.carinfoapp.dto.CarDetails;
import com.te.carinfoapp.dto.SuperAdminResponse;
import com.te.carinfoapp.service.SuperAdminService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path="/superAdmin")
public class SuperAdminController {
	
	@Autowired
	private SuperAdminService superAdminService;
	
	@GetMapping("/car/info")
	public ResponseEntity<?> getAllCarDetailsWithAdminDetails(){
		List<CarDetails> allCarDetails=superAdminService.getAllCarDetails();
		if(allCarDetails!=null) {
			return ResponseEntity.ok(new SuperAdminResponse(false,"success",allCarDetails));
		}else {
			return  ResponseEntity.ok(new SuperAdminResponse(true, "data not available", null));
		}
	}
	
}
