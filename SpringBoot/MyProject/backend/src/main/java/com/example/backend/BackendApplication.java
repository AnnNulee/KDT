package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // 오토설정 해주는 어노테이션. 설정하는 과정에서 다른 어노테이션 (RestController 같은) 것을 찾아서 Bean을 등록해준다.
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
