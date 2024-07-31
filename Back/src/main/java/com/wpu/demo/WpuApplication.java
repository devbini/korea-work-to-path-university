package com.wpu.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@SpringBootApplication
public class WpuApplication {

	public static void main(String[] args) {
		SpringApplication.run(WpuApplication.class, args);
	}

	@GetMapping("/testa")
	public Map<String, Object> F_Controller()
	{
		Map<String, Object> firstData = new HashMap<>();

		firstData.put("label1", "check1");
		firstData.put("label2", "check2");
		firstData.put("label3", "check3");

		return firstData;
	}
}
