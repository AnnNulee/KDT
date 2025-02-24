package com.example.backend.domain;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Child {
    //Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //Column : 무조건 초기값을 받야아함.
    @Column // 이 어노테이션은 안해도 되긴 함. 그냥 명시화
    private String loginID;
    private String password;
    private String name;


    // 관계설정
    // Child - Parent (N:1)
    @ManyToOne
    @JoinColumn(name = "parent_id")
    // @Child 엔티티에서 Parent 엔티티와의 관계를 매핑하기 위한 외래 키 컬럼을 정의
    // JPA에서 연관 관계는 항상 기본 키(id)를 참조하여 외래 키로 설정.
    // 여기서 parent_id는 Child 테이블에 생성될 외래 키 컬럼의 이름이 된다.
    private Parent parent;


    // Child - Personality (N:M)

    //counselorList 속성은 실제로 데이터베이스에 생성되는 속성은 아님.
    // professionalArea와 Counselor 간의 다대다(N: M) 관계를 나타내기 위해 사용되는 연관 관계를 나타내는 필드.
    @ManyToMany
    @JoinTable(
            name = "child_personality",
            joinColumns = @JoinColumn(name = "child_id"),
            inverseJoinColumns = @JoinColumn(name = "personality_id")
    )
    private List<Personality> personalityList = new ArrayList<>();

    //연관관계메소드
    // 차일드를 불러서 personality 를 추가할때 두 테이블 모두에 각자의 id값을 추가해준다.
    // 반대로 personality에다가 child를 추가할때는 그쪽 메소드로 정의해야해.
    public void addPersonality(Personality personality){
        this.personalityList.add(personality);
        // Child 엔티티의 PersonaList 속성에 연결된 personality 추가
        personality.getChildList().add(this);
        // personality 엔티티의 childlist에 나(child) 추가
    }





    // 기본생성자 : protected : 패키지(폴더) 밖의 외부 접근을 막는다.
    protected Child(){};

    //클래스가 생성될때 필요한 값. 쓸것만 넣어도 됨. 초기화만
    public Child(String loginID, String password, String name) {
        this.loginID = loginID;
        this.password = password;
        this.name = name;
        // 생성자 만들때, 관계설정 속성 ( pareent_id) 이 없다면?
    }

    // Getter
    public long getId() {        return id;    }
    public String getLoginID() {        return loginID;    }
    public String getPassword() {        return password;    }
    public String getName() {        return name;    }
    public Parent getParent() {        return parent;    }

    public List<Personality> getPersonalityList() {
        return personalityList;
    }

    // Setter
    public void setLoginID(String loginID) {        this.loginID = loginID;    }
    public void setPassword(String password) {        this.password = password;    }
    public void setName(String name) {        this.name = name;    }
    public void setParent(Parent parent) {        this.parent = parent;    }
}
