package com.example.backend.domain;

import jakarta.persistence.*;

@Entity // JPA가 해당 클래스를 엔티티로 인식
@Table(name = "user") // 내 DB의 테이블 이름
public class User {

    @Id // pk
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 25, name = "name") // 속성명 DB랑 여기설정된거랑 같으면 name 은 생략가능
    private String name;

    @Column // nullable 안적으면 기본값은 true.
    private Integer age;




//    // 관계설정
//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    private Profile profile;
//
//    public void setProfile(Profile profile){
//        this.profile = profile; // user 정보와 연동된 profile이 뭔지 알도록 대입
//        profile.setUser(this); // 내 정보(user) 정보를 profile에 보내서 저장하도록 해줌
//    }





    // JPA에서는 기본 생성자가 필수.
    protected User() {} // 외부에서 접근 불가도록 protected

    //생성자
    public User(String name, Integer age) {

        //예외처리
        if (name == null || name.isBlank()){
            throw new IllegalArgumentException(String.format("잘못된 name(%s)이 들어왔음", name)); // 인수 잘못왔다는 예외 설정
        }
        this.name = name;
        this.age = age;
    }








//Getter


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getAge() {
        return age;
    }

    //Setter
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(Integer age) {
        this.age = age;
    }


// Method
    public void updateName(String name){
        this.name = name;
    }

    public void updateAge(Integer age){
        this.age = age;
    }

}
