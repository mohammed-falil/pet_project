package com.te.carinfoapp;

import com.te.carinfoapp.dao.AdminDao;
import com.te.carinfoapp.dao.CarDetailsDao;
import com.te.carinfoapp.dto.AdminDetails;
import com.te.carinfoapp.dto.CarDetails;
import com.te.carinfoapp.util.FaqContainer;
import com.te.carinfoapp.util.ImageUrlContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class CarInfoAppApplication {

    @Autowired
    private AdminDao adminDao;

    @Autowired
    private CarDetailsDao carDetailsDao;


    public static void main(String[] args) {
        SpringApplication.run(CarInfoAppApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry register) {
                register.addMapping("/**").allowedOrigins("http://localhost:3000");
            }
        };
    }

    @PostConstruct
    private void creatingInitialData() {

        long adminCount = adminDao.count();
        if (adminCount == 0) {
            AdminDetails adminDetails = new AdminDetails();
            adminDetails.setUsername("Admin");
            adminDetails.setPassword("admin");
            adminDetails.setRole("Admin");

            adminDao.save(adminDetails);
        }

        long carDetailsCount = carDetailsDao.count();
        AdminDetails adminDetails = adminDao.findByUsername("Admin");

        if (carDetailsCount == 0) {
            CarDetails carDetails1 = new CarDetails();

            List<String> prosList = new ArrayList<>();
            prosList.add("Lots of features - Gets a slew of notable features that add convenience ");
            prosList.add("Interior space - The cabin feels airy with ample storage spaces all over ");
            prosList.add("Tall seating - Offers a commanding driving position with good outward visibility");
            prosList.add("Ease of driving - Light controls and the compact proportions make it nimble");
            prosList.add("Service network - Is backed by Maruti Suzuki's exhaustive and robust network");

            List<String> consList=new ArrayList<>();
            consList.add("Engine lacks punch - The mid-range grunt could have been more exciting");
            consList.add("Pricey - Top-end variants are expensive when stacked against segment rivals");
            consList.add("Ride quality at slow speeds - Conspicuous vertical movement over broken roads");

            List<FaqContainer> faqContainerList = new ArrayList<>();
            FaqContainer faqContainer = new FaqContainer();
            faqContainer.setQuestion("What is the exact on-road price of Maruti Brezza?");
            faqContainer.setAnswer("The on-road price of Brezza in Delhi starts at Rs. 8,99,816. The on-road price is inclusive of RTO charges and insurance");
            faqContainerList.add(faqContainer);

            FaqContainer faqContainer1 = new FaqContainer();
            faqContainer1.setQuestion("Which car is better Brezza or Venue?");
            faqContainer1.setAnswer("Brezza price starts at Rs 7.99 Lakh ex-showroom and Venue price starts Rs 7.53 Lakh ex-showroom. Compare these two models on the basis of their price, features & specs.");
            faqContainerList.add(faqContainer1);

            FaqContainer faqContainer2 = new FaqContainer();
            faqContainer2.setQuestion("What will the EMI or down payment for Maruti Brezza?");
            faqContainer2.setAnswer("Maruti Brezza EMI starts at ₹ 17,746 per month for a tenure of 60 months @ 9.8% for a loan amount of Rs 8.39 Lakh & down payment will be ₹ 93,000.");
            faqContainerList.add(faqContainer2);

            FaqContainer faqContainer3 = new FaqContainer();
            faqContainer3.setQuestion("Is Maruti Brezza a 5 or 7 seater SUV?");
            faqContainer3.setAnswer("Maruti Brezza is a 5 seater car, Which is priced at Rs 7.99 Lakh. Check more 5 seater SUV options on CarDekho.");
            faqContainerList.add(faqContainer3);

            FaqContainer faqContainer4 = new FaqContainer();
            faqContainer4.setQuestion("What is the mileage of Maruti Brezza?");
            faqContainer4.setAnswer("The ARAI mileage of Maruti Brezza is 20.15 kmpl.");
            faqContainerList.add(faqContainer4);

            List<ImageUrlContainer> imageUrlContainerList = new ArrayList<>();
            ImageUrlContainer imageUrlContainer = new ImageUrlContainer();
            imageUrlContainer.setThumbnailUrl("https://imgd.aeplcdn.com/664x374/n/cw/ec/107543/vitara-brezza-2022-exterior-right-front-three-quarter.jpeg?isig=0&q=75");
            imageUrlContainer.setImageUrl("https://imgd.aeplcdn.com/664x374/n/cw/ec/107543/vitara-brezza-2022-exterior-right-front-three-quarter.jpeg?isig=0&q=75");
            imageUrlContainerList.add(imageUrlContainer);

            ImageUrlContainer imageUrlContainer1 = new ImageUrlContainer();
            imageUrlContainer1.setThumbnailUrl("https://imgd.aeplcdn.com/664x374/n/cw/ec/107543/brezza-exterior-right-front-three-quarter-6.jpeg?isig=0&q=75");
            imageUrlContainer1.setImageUrl("https://imgd.aeplcdn.com/664x374/n/cw/ec/107543/brezza-exterior-right-front-three-quarter-6.jpeg?isig=0&q=75");
            imageUrlContainerList.add(imageUrlContainer1);

            ImageUrlContainer imageUrlContainer2 = new ImageUrlContainer();
            imageUrlContainer2.setThumbnailUrl("https://imgd.aeplcdn.com/664x374/n/cw/ec/107543/brezza-exterior-right-side-view.jpeg?isig=0&q=75");
            imageUrlContainer2.setImageUrl("https://imgd.aeplcdn.com/664x374/n/cw/ec/107543/brezza-exterior-right-side-view.jpeg?isig=0&q=75");
            imageUrlContainerList.add(imageUrlContainer2);

            ImageUrlContainer imageUrlContainer3 = new ImageUrlContainer();
            imageUrlContainer3.setThumbnailUrl("https://imgd.aeplcdn.com/664x374/n/cw/ec/107543/brezza-exterior-right-side-view.jpeg?isig=0&q=75");
            imageUrlContainer3.setImageUrl("https://imgd.aeplcdn.com/664x374/n/cw/ec/107543/brezza-exterior-right-side-view.jpeg?isig=0&q=75");
            imageUrlContainerList.add(imageUrlContainer3);

            ImageUrlContainer imageUrlContainer4 = new ImageUrlContainer();
            imageUrlContainer4.setThumbnailUrl("https://imgd.aeplcdn.com/664x374/n/cw/ec/107543/brezza-exterior-right-side-view.jpeg?isig=0&q=75");
            imageUrlContainer4.setImageUrl("https://imgd.aeplcdn.com/664x374/n/cw/ec/107543/brezza-exterior-right-side-view.jpeg?isig=0&q=75");
            imageUrlContainerList.add(imageUrlContainer4);

            carDetails1.setAdminId(adminDetails);
            carDetails1.setBhp("101.65");
            carDetails1.setBootSpace("328");
            carDetails1.setOnroadPrice(7.90);
            carDetails1.setShowroomPrice(7.00);
            carDetails1.setBrakeSystem("ABS");
            carDetails1.setCompany("Maruti Sizuki");
            carDetails1.setConsList(consList);
            carDetails1.setEngineCapacity(1500);
            carDetails1.setFaqList(faqContainerList);
            carDetails1.setFuelType("P");
            carDetails1.setGearType("A");
            carDetails1.setImageURL(imageUrlContainerList);
            carDetails1.setMileage(18.00);
            carDetails1.setName("Brezza");
            carDetails1.setProsList(prosList);
            carDetails1.setPowerSteering(true);
            carDetails1.setSeatingCapacity(5);
            carDetails1.setVideoUrl("https://www.youtube.com/embed/UDhQqj7YElA");

            carDetailsDao.save(carDetails1);
        }


    }
}
