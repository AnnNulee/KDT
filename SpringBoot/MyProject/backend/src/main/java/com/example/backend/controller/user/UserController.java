package com.example.backend.controller.user;

import com.example.backend.dto.user.request.UserCreateRequest;
import com.example.backend.dto.user.response.UserResponse;
import com.example.backend.service.user.UserServiceJPA;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;


// 컨트롤러의 역할
// 1. 해당 라우터와 요청에 일치하는 메소드를 찾아 실행 / ex) @PostMapping("/user")
// 2. 받아야하는 데이터 받아서/ ex) (@PathVariable Long id, @RequestBody UserCreateRequest request)
// 3. Service에 데이터 넘기면서 실행. / ex) userService.updateUser(id, request);

@RestController // 객체화 시키지 않아도 사용할 수 있게끔 해주는 어노테이션. 컨트롤러를 지정해주면 해당 클래스는 생성하지 않아도 사용할 수 있다.
public class UserController {

    // service를 호출하기 위한 선언.
    private final UserServiceJPA userService;

    // 컨트롤러 메소드 : jdbcTemplate을 userService에 대입
    // repository에서 SQL문 쓰려면 jdbcTemplate 써야하기때문에 계속 전달해준다.
    //  service 어노테이션 붙여놓으면 template 전달 안해도 됨
//    public UserController(JdbcTemplate jdbcTemplate) {
//        this.userService = new UserService(jdbcTemplate);
//    }

    // 컨트롤러 생성자. 매개변수는 service 형식으로 받음을 정의,
    public UserController(UserServiceJPA userService) {
        this.userService = userService;
    }

    @PostMapping("/user") // 해당 라우터에서 post 요청을 처리 => service
    // 요청에 포함된 데이터는 JSON, JSON데이터를 객체로 변환해서 받아줌

    // http 요청의 body 데이터가 해당 request에들어가고, request에서 객체로 저장된다.
    public void saveUser(@RequestBody UserCreateRequest request){
        userService.saveUser(request);

    }

    @PutMapping("/{id}")
    // PathVariable: 라우터(path) {} 내부값을 인수로 받을 수 있다.
    public void updateUser(@PathVariable Long id, @RequestBody UserCreateRequest request){
        userService.updateUser(id, request);
    }


    // Jdbc delete
//    @DeleteMapping("/{id}")
//    public void deleteUser(@PathVariable Long id){
//        userService.deleteUser(id);
//    }

    // jpa delete
    @DeleteMapping("/{name}")
    public void deleteUser(@PathVariable String name){
        userService.deleteUser(name);
    }

//
//    @GetMapping("/user") // 다불러오는 요청 만들어보자. read는 리턴일 발생.
//    public List<UserResponse> getAllUsers(){ // List<> 타입은 <>내부에 원하는 타입을 정의하면 된다.
//        return userService.getAllUsers();
//    }
//
//    @GetMapping("/user/{id}")
//    public UserResponse getUser(@PathVariable Long id){
//        return userService.getUser(id);
//    }


}
