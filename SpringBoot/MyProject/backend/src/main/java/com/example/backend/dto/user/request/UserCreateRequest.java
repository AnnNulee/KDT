package com.example.backend.dto.user.request;


//import jakarta.persistence.Entity;
//
//@Entity
public class UserCreateRequest {

// DTO가 주로 생성자만 포함하고 있는 경우
    // 모든 데이터는 DTO에만 있다. Data transfer object
    // controller - service - repository 에서는 데이터를 직접다루지 않는다.
    // 이렇게 구분된 구조는 에러관리하기에도 수월하다.
// 이는 데이터를 객체로 변환하거나 객체를 다시 데이터로 변환하는 과정에서
// 생성자를 통해 데이터를 초기화하고, 데이터의 일관성을 유지하기 위함.
// 생성자를 통해 객체가 생성될 때 필요한 데이터를 모두 받아, 객체가 항상 완전한 상태로 유지되게 하는 것


    // 데이터 변수에 접근하여 값이 변하는 상황을 방지하기 위해 private 설정해야한다.
    private String name;
    private Integer age;

    public UserCreateRequest(String name, Integer age) {
        this.name = name;
        this.age = age;
    }


    // Getter : 함수로 만드는 이유 : 값을 변경하지 못하도록. 다른 클래스에서 함수 실행하면 저장된 값만 딱 return 되도록
    public String getName() {
        return name;
    }

    public Integer getAge() {
        return age;
    }

    // Setter : 값을 변형할 수 있도록 하는 역할.

}
