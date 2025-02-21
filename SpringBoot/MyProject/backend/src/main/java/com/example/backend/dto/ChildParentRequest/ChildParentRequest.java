package com.example.backend.dto.ChildParentRequest;

public class ChildParentRequest {

    private ParentRequest parentRequest;
    private ChildRequest childRequest;

    // 필요에 따라 시그니처별 생성자를 만들어 준다.

    // 널값 받으면
    public ChildParentRequest(){}
    public ChildParentRequest(ParentRequest parentRequest, ChildRequest childRequest) {
        this.parentRequest = parentRequest;
        this.childRequest = childRequest;
    }


    //게터
    public ParentRequest getParentRequest() {
        return parentRequest;
    }

    public ChildRequest getChildRequest() {
        return childRequest;
    }

    //세터


    public void setParentRequest(ParentRequest parentRequest) {
        this.parentRequest = parentRequest;
    }

    public void setChildRequest(ChildRequest childRequest) {
        this.childRequest = childRequest;
    }
}
