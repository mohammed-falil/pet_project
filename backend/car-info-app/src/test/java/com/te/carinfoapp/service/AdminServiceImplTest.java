package com.te.carinfoapp.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;

import com.te.carinfoapp.dao.AdminDao;
import com.te.carinfoapp.dao.CarDetailsDao;
import com.te.carinfoapp.dto.AdminDetails;
import com.te.carinfoapp.util.JwtUtil;

@ExtendWith(MockitoExtension.class)
class AdminServiceImplTest {
	@InjectMocks
	private AdminServiceImpl adminServiceImpl;
	
	@Mock
	private AdminDao  adminDao;
	
	@Mock
	private CarDetailsDao carDao;
	
	@Mock
	private JwtUtil jwtUtil;

	@Test
	void testLoadUserByUsername() {
		AdminDetails adminDetails=new AdminDetails();
		adminDetails.setId(1);
		adminDetails.setPassword("123");
		adminDetails.setRole("ADMIN");
		adminDetails.setUsername("user");
		
		when(adminDao.findByUsername("user")).thenReturn(adminDetails);
		
		UserDetails loadUserByUsername = adminServiceImpl.loadUserByUsername("user");
		assertEquals("123", loadUserByUsername.getPassword());
		
	}

	@Test
	void testSaveSignupData() {
		fail("Not yet implemented");
	}

	@Test
	void testGetAllCarDetails() {
		fail("Not yet implemented");
	}

	@Test
	void testAddCarDetails() {
		fail("Not yet implemented");
	}

	@Test
	void testUpdateCarDetails() {
		fail("Not yet implemented");
	}

	@Test
	void testDeleteCarDetails() {
		fail("Not yet implemented");
	}

	@Test
	void testGetcarbyname() {
		fail("Not yet implemented");
	}

	@Test
	void testGetAdminDetails() {
		fail("Not yet implemented");
	}

	@Test
	void testGetcarbyfuelType() {
		fail("Not yet implemented");
	}

	@Test
	void testGetcarbycompany() {
		fail("Not yet implemented");
	}

}
