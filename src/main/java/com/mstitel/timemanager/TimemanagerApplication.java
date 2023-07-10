package com.mstitel.timemanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TimemanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TimemanagerApplication.class, args);
	}

	@GetMapping("/root")

	public String apiRoot(){
		return "Alibob";
	}

}
