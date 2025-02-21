package com.example.backend.domain;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String email;
    private String name;


    //관계설정
    // Parent - Child (1:N)
    // child는 "parent에 의해 묶였다." (mappedBy)
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    // parent는 여러명의 child를 가지기 때문에 List - Child인스턴스 들어와야한다.
    private List<Child> childList = new ArrayList<>();
    
    
    //엔티티에서 관리하는 기본 생성자. 
    protected Parent(){}
    
    //클래스에서 필요한 생성자
    public Parent(String email, String name) {
         this.email = email;
         this.name = name;
    }
    
    
    //Getter
    public long getId() { return id;}
    public String getEmail() { return email;}
    public String getName() { return name;}
    public List<Child> getChildList() { return childList; }


    // 페런트의 메서드로 에드차일드,
    // 그 안에서 차일드에게 부모 정보를 준다.
    public void addChild(Child child) {
        this.childList.add(child);
        child.setParent(this);
    }

   
    //Setter : 변경해야하는것
    public void setEmail(String email) { this.email = email;}
    public void setName(String name) { this.name = name; }
    
}

