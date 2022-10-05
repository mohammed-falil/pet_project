package com.te.carinfoapp.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.te.carinfoapp.dto.AdminDetails;
import com.te.carinfoapp.dto.AdminRequest;
import com.te.carinfoapp.dto.AdminResponse;
import com.te.carinfoapp.dto.CarDetails;
import com.te.carinfoapp.dto.CarDetailsResponse;
import com.te.carinfoapp.dto.MyAdminDetails;
import com.te.carinfoapp.service.AdminService;
import com.te.carinfoapp.util.JwtUtil;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class AdminControllerTest {
	
	@MockBean
	private AuthenticationManager authenticationManager;

	@MockBean
	private UserDetailsService userDetailsService;

	@MockBean
	private JwtUtil jwtUtil;

	@MockBean
	private AdminService adminService;

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext applicationContext;
	
	private ObjectMapper mapper=new  ObjectMapper();

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.webAppContextSetup(applicationContext).build();
	}

	@Test
	void testCreateLoginAuthenticationToken() throws JsonProcessingException, UnsupportedEncodingException, Exception {
		
		AdminDetails adminDetails=new  AdminDetails();
		adminDetails.setId(1);
		adminDetails.setUsername("user");
		adminDetails.setPassword("1234");
		adminDetails.setRole("ROLE_ADMIN");

		AdminRequest adminRequest = new AdminRequest("user", "1234");
		MyAdminDetails myAdminDetails=new MyAdminDetails(adminDetails);
		

		when(authenticationManager.authenticate(Mockito.any())).thenReturn(null);
		when(userDetailsService.loadUserByUsername("user")).thenReturn(myAdminDetails);
		when(adminService.getAdminDetails("user")).thenReturn(adminDetails);
		when(jwtUtil.generateToken(myAdminDetails)).thenReturn("dfghfdfgiofhdgf");
		
		String contentAsString = mockMvc.perform(post("/admin/loginAuthenticate").contentType(MediaType.APPLICATION_JSON_VALUE).
				content(mapper.writeValueAsString(adminRequest)).accept(MediaType.APPLICATION_JSON_VALUE)
				).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		
		AdminResponse readValue = mapper.readValue(contentAsString, AdminResponse.class);
		
		assertEquals("Authentication Success", readValue.getMessaage());
		
		
	}

	@Test
	void testCreateSignupAuthenticationToken() throws JsonProcessingException, UnsupportedEncodingException, Exception {
	AdminDetails adminDetails=new AdminDetails();
	adminDetails.setId(2);
	adminDetails.setPassword("1234");
	adminDetails.setRole("ROLE_ADMIN");
	adminDetails.setUsername("USER");
	when(adminService.saveSignupData(adminDetails)).thenReturn(adminDetails);
	when(authenticationManager.authenticate(Mockito.any())).thenReturn(null);
	
	MyAdminDetails adminDetails2=new MyAdminDetails(adminDetails);
	when(userDetailsService.loadUserByUsername("user")).thenReturn(adminDetails2);
	//when(adminService.adminDetails2("user").then)
	when(adminService.getAdminDetails("user")).thenReturn(adminDetails);
	when(jwtUtil.generateToken(Mockito.any())).thenReturn("eftrgrtbrt");
	
	String contentAsString = mockMvc.perform(post("/admin/signupAuthenticate").contentType(MediaType.APPLICATION_JSON_VALUE).
			content(mapper.writeValueAsString(adminDetails)).accept(MediaType.APPLICATION_JSON_VALUE)
			).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
	
	
	}

	@Test
	void testGetAllCarDetails() throws JsonProcessingException, UnsupportedEncodingException, Exception {
		//AdminDetails adminDetails=new AdminDetails();
		List<CarDetails> carDetails=new ArrayList<CarDetails>();
		CarDetails carDetails2=new CarDetails();
		carDetails2.setId(1);
		carDetails2.setBrakeSystem("ABS");
		carDetails2.setCompany("Mercedes");
		carDetails2.setGearType("Manual");
		carDetails2.setEngineCapacity(200);
		carDetails2.setMileage(4.0);
		carDetails2.setPowerSteering(false);
		carDetails2.setOnroadPrice(56.0);
		carDetails2.setFuelType("Diesel");
		carDetails2.setEngineCapacity(45);
		carDetails2.setImageURL("https://wallpaperaccess.com/full/1130911.jpg");
		
		when(adminService.getAllCarDetails()).thenReturn(carDetails);
		String contentAsString=mockMvc.perform(get("/admin/car/information")
				.accept(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		
		CarDetailsResponse readValue = mapper.readValue(contentAsString, CarDetailsResponse.class);
		assertEquals("success", readValue.getMessage());
	}

	@Test
	void testAddCarDetails() throws UnsupportedEncodingException, Exception {
		
		MockHttpServletRequest httpServletRequest=new MockHttpServletRequest();
		httpServletRequest.getHeader("Authorization");
		
		CarDetails carDetails=new CarDetails();
		
		
		carDetails.setBrakeSystem("ABS");
		carDetails.setCompany("Mercedes");
		carDetails.setGearType("Manual");
		carDetails.setEngineCapacity(200);
		carDetails.setMileage(4.0);
		carDetails.setPowerSteering(false);
		carDetails.setOnroadPrice(56.0);
		carDetails.setFuelType("Diesel");
		carDetails.setEngineCapacity(45);
		carDetails.setImageURL("https://wallpaperaccess.com/full/1130911.jpg");
		
		
		when(adminService.addCarDetails(carDetails, httpServletRequest)).thenReturn(carDetails);
		String contentAsString=mockMvc.perform(post("/admin/car/information").contentType(MediaType.APPLICATION_JSON_VALUE)
				.content(mapper.writeValueAsString(carDetails)).accept(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		
		CarDetailsResponse readValue = mapper.readValue(contentAsString, CarDetailsResponse.class);
		assertEquals("Car Details Added Successfully", readValue.getMessage());
	
	}

	@Test
	void testUpdateCarDetails() throws JsonProcessingException, UnsupportedEncodingException, Exception {
		MockHttpServletRequest httpServletRequest=new MockHttpServletRequest();
		httpServletRequest.getHeader("Authorization");
		CarDetails carDetails=new CarDetails();
		
		carDetails.setBrakeSystem("NON ABS");
		carDetails.setCompany("mercedes");
		carDetails.setGearType("manual");
		carDetails.setEngineCapacity(300);
		carDetails.setMileage(5.0);
		carDetails.setPowerSteering(true);
		carDetails.setOnroadPrice(55.0);
		carDetails.setFuelType("petrol");
		carDetails.setEngineCapacity(55);
		carDetails.setImageURL("njcndjcnn");
		
		when(adminService.updateCarDetails(carDetails, httpServletRequest)).thenReturn(carDetails);
		String contentAsString=mockMvc.perform(put("/admin/car/information/80").contentType(MediaType.APPLICATION_JSON_VALUE)
				.content(mapper.writeValueAsString(carDetails)).accept(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		
		CarDetailsResponse readValue=mapper.readValue(contentAsString, CarDetailsResponse.class);
		assertEquals("Car Details Updated Successfully", readValue.getMessage());
	}

	@Test
	void testDeleteCarDetails() throws JsonProcessingException, UnsupportedEncodingException, Exception {
		CarDetails carDetails=new CarDetails();
		carDetails.setId(5);
		carDetails.setBrakeSystem("ABS");
		carDetails.setCompany("Mercedes");
		carDetails.setGearType("Manual");
		carDetails.setEngineCapacity(200);
		carDetails.setMileage(4.0);
		carDetails.setPowerSteering(false);
		carDetails.setOnroadPrice(56.0);
		carDetails.setFuelType("Diesel");
		carDetails.setEngineCapacity(45);
		carDetails.setImageURL("https://wallpaperaccess.com/full/1130911.jpg");
		
		
	
	when(adminService.deleteCarDetails(5)).thenReturn(true);
	String contentAsString=mockMvc.perform(delete("/admin/car/information/5").contentType(MediaType.APPLICATION_JSON_VALUE)
			)
			.andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
	
	CarDetailsResponse readValue=mapper.readValue(contentAsString, CarDetailsResponse.class);
	assertEquals("Car Details Deleted Successfully", readValue.getMessage());
	
	}

}
