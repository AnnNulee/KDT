package com.example.library_app.controller.calculator;

import com.example.library_app.dto.calculator.request.CalculatorMultiplyRequest;
import com.example.library_app.dto.calculator.request.CarculatorAddRequest;
import org.springframework.web.bind.annotation.*;

//@RestController // 해당 클래스를 API 컨트롤러로 지정
//// 어노테이션 찍으면 위에 임포트 자동으로 진행
//public class CalculatorController {
//
//    @GetMapping("/add") // HTTP GET 요청을 받아서 "/add" 경로로 매핑한다는 뜻
//    //==> 라우터를 이런식으로 함수처럼 사용할 수 있다.
//    public int addTwoNumbers (
//        @RequestParam int number1, // 요청 파라미터  / 파라미터ex)?number1=1&number2=2
//        @RequestParam int number2
//        ) {
//        return number1 + number2;
//    }
//}

    // 리퀘스트 역할을 하는 파일에서 정의한 매개변수를
    // 컨트롤러에서는 게터로 불러와서
    // body에 매개변수 값을 넣고, 라우터별 CRUD 함수를 실행시키면
    // 해당 함수의 기능이 수행되는데, 여기서는 게터로 매게변수를 받아 실행한다.

@RestController // 해당 클래스를 API 컨트롤러로 지정
// 어노테이션 찍으면 위에 임포트 자동으로 진행
public class CalculatorController {

    @GetMapping("/add") // GET 요청중에 "/add" 경로로 매핑한다는 뜻
    //==> 라우터를 이런식으로 함수처럼 사용할 수 있다.
    public int addTwoNumbers (CarculatorAddRequest request ) {
        return request.getNumber1() + request.getNumber2(); // 게터역할
        // 게터. 받은 리퀘스트 클래스 내부에 정의된 getNumber1() 함수를 실행.
        // 리퀘스트에서 정의한 getNumber1()의 기능은, 바디에 들어온 값을 추출하여 보내주는 역할.
    }

    @PostMapping("/multiply") // Post 요청중에 "/multiply" 요청이 들어오면 실행함
    public int multiplyTwoNumbers(@RequestBody CalculatorMultiplyRequest request){ // http 요청의 'body'를 불러온다.
        return request.getNumber1() * request.getNumber2(); // 요청의 멤버변수를 가져오는 getter
    }
}
