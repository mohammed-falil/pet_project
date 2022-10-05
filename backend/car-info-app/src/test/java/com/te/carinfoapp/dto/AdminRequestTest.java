package com.te.carinfoapp.dto;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class AdminRequestTest {

	ObjectMapper mapper=new ObjectMapper();
	String json="{\"username\":\"user\",\"password\":\"1234\"}";

	
	@Test
	void serializeTest() throws JsonProcessingException {
		//fail("Not yet implemented");
//		AdminRequest adminRequest=new AdminRequest("user", "1234");
//		System.out.println(mapper.writeValueAsString(adminRequest));
//		
		AdminRequest readvalue=mapper.readValue(json, AdminRequest.class);
		String writeValueAsString=mapper.writeValueAsString(readvalue);
		assertEquals(json, writeValueAsString);
	}
	
	@Test
	public void deSerializeTest() throws JsonMappingException, JsonProcessingException {
		AdminRequest readvalue=mapper.readValue(json, AdminRequest.class);
		assertEquals("user", readvalue.getUsername());
	}

}
