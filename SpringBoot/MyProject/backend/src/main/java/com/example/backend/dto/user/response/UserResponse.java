package com.example.backend.dto.user.response;

import com.example.backend.domain.User;

public class UserResponse {
    private Long id;
    private String name;
    private Integer age;


    // 생성자 1 : 각 속성을 따로 매개변수로 받는
    public UserResponse(Long id, String name, Integer age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    // 생성자 2 : User 데이터를 통채로 매개변수로 받는
    public UserResponse(User user) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getAge() {
        return age;
    }
}
