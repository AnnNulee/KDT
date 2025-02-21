package com.example.backend.domain;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// 인터페이스 생성
// Jpa에서 제공하는 레포지토리 형식을 상솓받음
// 인터페이스는 bean에 들어갈 수 없지만, 우리가 활용하는 함수는 JpaRepository는 bean에 등록된 클래스이기때문에 전역에서 사용가능
public interface UserRepository extends JpaRepository<User, Long> {


    // 사용자 정의 함수 설정
    // 함수 이름 만들때는 규칙을 따라야 한다. JPA가 메서드 이름을 분석하여 자동으로 SQL을 조립한다.
    User findByName(String name);
    //List<User> findAllByName(String name);

    // By를 기준으로, 앞은 기능, 뒤는 속성명.
    // find : 하나의 데이터만 찾길 원할 때 (2개 이상의 데이터가 있으면 안됨)
    // findall :
}
