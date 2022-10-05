package com.te.carinfoapp.dto;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class CarDetailsTest {
	
	ObjectMapper mapper=new ObjectMapper();
	String json="{\"id\":1,\"name\":\"car\",\"company\":\"mercedes\",\"fuelType\":\"petrol\",\"powerSteering\":false,\"brakeSystem\":\"ABS\",\"showroomPrice\":60.0,\"onroadPrice\":50.0,\"imageURL\":\"bcbkb\",\"mileage\":8.0,\"seatingCapacity\":9,\"engineCapacity\":9,\"gearType\":\"MANUAL\"}";

	@Test
	void serializeTest() throws JsonProcessingException {
//		CarDetails carDetails=new CarDetails(1, "car", "mercedes", "petrol", false, "ABS", 60.0, 50.0, "bcbkb", 8.0, 9, 9, "MANUAL", null);
//		System.out.println(mapper.writeValueAsString(carDetails));
		
		CarDetails readvalue=mapper.readValue(json, CarDetails.class);
		String writeValueAsString=mapper.writeValueAsString(readvalue);
		assertEquals(json, writeValueAsString);
	}
	
	@Test
	public void deSerializeTest() throws JsonMappingException, JsonProcessingException {
		CarDetails readvalue=mapper.readValue(json, CarDetails.class);
		assertEquals("mercedes", readvalue.getCompany());
	}

}
