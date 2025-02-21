package com.example.backend.dto.ChildParentRequest;

public class ParentRequest {

    //받을 타입 정의
    private String email;
    private String name;

    // 시그니처 생성. 및 입력받은 인수를 변수에대입
    public ParentRequest(String email, String name) {
        this.email = email;
        this.name = name;
    }

    //Getter

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }
}
