//package com.te.carinfoapp.controller;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//import java.io.UnsupportedEncodingException;
//import java.util.ArrayList;
//import java.util.List;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.mock.web.MockHttpServletRequest;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.web.context.WebApplicationContext;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.te.carinfoapp.dto.CarDetails;
//import com.te.carinfoapp.dto.SuperAdminResponse;
//import com.te.carinfoapp.service.SuperAdminService;
//
//@ExtendWith(MockitoExtension.class)
//@SpringBootTest
//class SuperAdminControllerTest {
//
//	@MockBean
//	private SuperAdminService superAdminService;
//
//	private MockMvc mockMvc;
//
//	@Autowired
//	private WebApplicationContext applicationContext;
//
//	private ObjectMapper mapper=new ObjectMapper();
//
//	@BeforeEach
//	void setUp() throws Exception {
//		mockMvc=MockMvcBuilders.webAppContextSetup(applicationContext).build();
//	}
//
//	@Test
//	void getAllCarDetailsWithAdminDetailsTest() throws UnsupportedEncodingException, Exception {
//		MockHttpServletRequest httpServletRequest=new MockHttpServletRequest();
//		httpServletRequest.addHeader("Authorization", "Bearer vhvhhkbhvhk");
//
//		CarDetails carDetails=new CarDetails();
//		carDetails.setId(16);
//		carDetails.setName("fortuner");
//		carDetails.setCompany("mercedes");
//		carDetails.setFuelType("Electric");
//		carDetails.setPowerSteering(false);
//		carDetails.setBrakeSystem("ABS");
//		carDetails.setShowroomPrice(50d);
//		carDetails.setImageURL("'https://cdni.autocarindia.com/utils/imageresizer.ashx?n=http://cms.haymarketindia.net/model/uploads/modelimages/Mercedes-Benz-A-Class-Limousine-100420211633.jpg'");
//		carDetails.setMileage(5d);
//		carDetails.setSeatingCapacity(5);
//		carDetails.setEngineCapacity(2000);
//		carDetails.setGearType("manual");
//		List<CarDetails> listofcarCarDetails=new ArrayList<CarDetails>();
//
//		listofcarCarDetails.add(carDetails);
//		when(superAdminService.getAllCarDetails()).thenReturn(listofcarCarDetails);
//
//		String contentAsString=mockMvc.perform(get("/superAdmin/car/info").accept(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk())
//				.andReturn().getResponse().getContentAsString();
//
//		SuperAdminResponse readValue=mapper.readValue(contentAsString, SuperAdminResponse.class);
//		assertNotNull(readValue.getCarDetailsWithAdminName());
//
//	}
//
//}
