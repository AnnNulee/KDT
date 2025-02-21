package com.example.backend.dto.ChildParentRequest;

public class ChildRequest {

    private String loginID;
    private String name;
    private String password;

    public ChildRequest(String loginID, String name, String password) {
        this.loginID = loginID;
        this.name = name;
        this.password = password;
    }

    //Getter


    public String getLoginID() {
        return loginID;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }
}
