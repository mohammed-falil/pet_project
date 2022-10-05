package com.te.carinfoapp.dto;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class AdminResponseTest {
	ObjectMapper mapper=new ObjectMapper();
	String json="{\"error\":false,\"messaage\":\"success\",\"token\":\"fghjhgfdfgh\",\"role\":\"ADMIN\"}";
	

	@Test
	void serializeTest() throws JsonProcessingException {
//		
//		AdminResponse adminResponse=new AdminResponse(false,"success","fghjhgfdfgh","ADMIN");
//		System.out.println(mapper.writeValueAsString(adminResponse));
		
		AdminResponse readValue = mapper.readValue(json, AdminResponse.class);
		String writeValueAsString = mapper.writeValueAsString(readValue);
		assertEquals(json,writeValueAsString);
		
		
	}
	@Test
	public void deSerializeTest() throws JsonMappingException, JsonProcessingException {
		
		AdminResponse readValue = mapper.readValue(json, AdminResponse.class);
		assertEquals("success", readValue.getMessaage());
		
		
	}

}


