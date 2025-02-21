package com.example.library_app.dto.calculator.request;

public class CalculatorMultiplyRequest {
    private final int number1; // 캡슐화
    private final int number2;

    // 생성자
    public CalculatorMultiplyRequest(int number1, int number2) {
        this.number1 = number1;
        this.number2 = number2;
    }

    // 게터
    public int getNumber1() {
        return number1;
    }

    public int getNumber2() {
        return number2;
    }
}
