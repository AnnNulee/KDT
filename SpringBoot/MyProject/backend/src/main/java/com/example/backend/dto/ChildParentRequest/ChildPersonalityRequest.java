package com.example.backend.dto.ChildParentRequest;

public class ChildPersonalityRequest {
    private String loginId;
    private String name;
    private String password;
    private String personalityName;

    public ChildPersonalityRequest(String loginId, String name, String password, String personalityName) {
        this.loginId = loginId;
        this.name = name;
        this.password = password;
        this.personalityName = personalityName;
    }
    
    //Getter
    public String getLoginId()   {  return loginId;    }
    public String getName()   {  return name;    }
    public String getPassword()   {  return password;    }
    public String getPersonalityName()   {  return personalityName;    }
}
