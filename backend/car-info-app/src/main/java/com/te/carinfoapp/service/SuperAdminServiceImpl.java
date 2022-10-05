package com.te.carinfoapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.te.carinfoapp.dao.AdminDao;
import com.te.carinfoapp.dao.CarDetailsDao;
import com.te.carinfoapp.dto.CarDetails;

@Service
public class SuperAdminServiceImpl  implements SuperAdminService{

	@Autowired
	private CarDetailsDao carDao;
	
	private AdminDao adminDao;
	
	@Override
	public List<CarDetails> getAllCarDetails() {
return (List<CarDetails>) carDao.findAll();
		}

}
