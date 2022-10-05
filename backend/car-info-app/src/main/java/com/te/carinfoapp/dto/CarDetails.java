package com.te.carinfoapp.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.te.carinfoapp.util.FaqContainer;
import com.te.carinfoapp.util.ImageUrlContainer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Car_Details")
public class CarDetails implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String company;

    private String fuelType;

    private boolean powerSteering;

    private String brakeSystem;

    private Double showroomPrice;

    private Double onroadPrice;

    @ElementCollection
    private List<ImageUrlContainer> imageURL;

    private Double mileage;

    private int seatingCapacity;

    private int engineCapacity;

    private String gearType;

    private String bhp;

    private String bootSpace;

    private String videoUrl;

    @ElementCollection
    private List<String> prosList;

    @ElementCollection
    private List<String> consList;

    @ElementCollection
    private List<FaqContainer> faqList = new ArrayList<>();

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "admin_id", referencedColumnName = "username")
    private AdminDetails adminId;
}
