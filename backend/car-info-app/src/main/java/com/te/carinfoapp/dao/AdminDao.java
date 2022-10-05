package com.te.carinfoapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.te.carinfoapp.dto.AdminDetails;

public interface AdminDao extends JpaRepository<AdminDetails, Integer> {
	
	AdminDetails findByUsername(String name);
	

}
