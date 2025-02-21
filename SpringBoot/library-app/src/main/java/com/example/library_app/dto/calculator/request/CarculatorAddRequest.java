package com.example.library_app.dto.calculator.request;

public class CarculatorAddRequest {
    private final int number1;
    private final int number2;

    //alt + insert => 생성자 생성
    public CarculatorAddRequest(int number1, int number2) {
        this.number1 = number1;
        this.number2 = number2;
    }

    // alt + insert => getter 생성
    public int getNumber1() {
        return number1;
    }

    public int getNumber2() {
        return number2;
    }
}
