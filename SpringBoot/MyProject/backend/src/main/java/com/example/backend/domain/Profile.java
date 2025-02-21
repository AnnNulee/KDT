//package com.example.backend.domain;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "profile")
//public class Profile {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String bio;
//
//    //일대일
//    @OneToOne
//    @JoinColumn(name="user_id")
//    private User user;
//
//    //기본생성자. 반드시
//    protected Profile() {}
//
//
//    public void setUser(User user){
//        this.user = user;
//        // user가 보내준 user정보를 profile에서 볼수 있도록 대입.
//    }
//
//}
