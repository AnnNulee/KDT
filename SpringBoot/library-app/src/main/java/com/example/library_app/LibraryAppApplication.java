package com.example.library_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication //@ 어노테이션 : 스프링을 실행하는데 필요한 다양한 설정을 자동 적용
public class LibraryAppApplication {

	public static void main(String[] args) {

		// 서버실행
		SpringApplication.run(LibraryAppApplication.class, args);
	}

}
