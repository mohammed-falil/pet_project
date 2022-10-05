package com.te.carinfoapp.dto;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class AdminDetailsTest {
	ObjectMapper mapper=new ObjectMapper();
	String json="{\"id\":23,\"username\":\"user\",\"password\":\"1234\",\"role\":\"ROLE_ADMIN\"}";

	@Test
	void serializeTest() throws JsonProcessingException {
		//fail("Not yet implemented");
//		AdminDetails adminDetails=new AdminDetails(23, "user", "1234", "ROLE_ADMIN");
//		System.out.println(mapper.writeValueAsString(adminDetails));
		
		AdminDetails readvalue=mapper.readValue(json, AdminDetails.class);
		String writeValueAsString=mapper.writeValueAsString(readvalue);
		assertEquals(json, writeValueAsString);
	}
	
	public void deSerializeTest() throws JsonMappingException, JsonProcessingException {
		
		AdminDetails readvalue=mapper.readValue(json, AdminDetails.class);
		assertEquals("user", readvalue.getUsername());
	}

}
