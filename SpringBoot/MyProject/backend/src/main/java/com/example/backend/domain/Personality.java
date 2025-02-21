package com.example.backend.domain;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Personality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String personalityName;


    //관계설정
    //child - personality (n:n)
    @ManyToMany(mappedBy = "personalityList")
    private List<Child> childList = new ArrayList<>();


    public void addChild(Child child){
        this.childList.add(child);
        child.getPersonalityList().add(this);
    }


    //
    protected Personality() {};

    public Personality(String personalityName) {
        this.personalityName = personalityName;
    }

    //getter

    public Long getId() {
        return id;
    }
    public String getPersonalityName() {
        return personalityName;
    }
    public List<Child> getChildList() {
        return childList;
    }
    public void setPersonalityName(String personalityName) {
        this.personalityName = personalityName;
    }


}
