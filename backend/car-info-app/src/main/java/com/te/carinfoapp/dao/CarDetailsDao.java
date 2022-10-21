package com.te.carinfoapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.te.carinfoapp.dto.CarDetails;

public interface CarDetailsDao extends JpaRepository<CarDetails, Integer> {



    List<CarDetails> findByFuelType(String fuelType);

    CarDetails findById(int id);


    List<CarDetails> findByName(String name);



    List<CarDetails> findBycompany(String company);

    List<CarDetails> findByNameContaining(String search);

    CarDetails findCar_DetailsByName(String name);
}
