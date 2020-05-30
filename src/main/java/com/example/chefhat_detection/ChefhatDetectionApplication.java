package com.example.chefhat_detection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChefhatDetectionApplication {
    @Autowired
    public static void main(String[] args) {
        SpringApplication.run(ChefhatDetectionApplication.class, args);
    }

}
