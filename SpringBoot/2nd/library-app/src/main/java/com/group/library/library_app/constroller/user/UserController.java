package com.group.library.library_app.constroller.user;

import com.group.library.library_app.dto.user.request.UserCreateRequest;
import org.apache.catalina.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    // Post 요청을 받는 api 만들기
    // SQL 사용 고려

    // 여기서 SQL문을 적더라도 mySQL에서 적용할 수 있게 해줌
    private final JdbcTemplate jdbcTemplate;

    // 생성자 : 파라미터에 매개변수로 넣으면 자동으로 생성해주는 역할
    public UserController(JdbcTemplate jdbctemplate){
        this.jdbcTemplate = jdbctemplate;
    }


    // 상황 : 사용자가 유저를 생성하고 싶다.
    // 사용자는 name과 age를 입력하고 Post 요청을 보낸다.
    // '/user' 라우터에 post가 되었을때 실행되는 함수, 'saveUser'가 실행된다.
    // dto UserCreateRequest 클래스 내에 필요 데이터가 저장되고, 여기서 불러와서 만들어준다.
    // 매개변수 내의 @RequestBody 어노테이션이 실행되고, dto 내에 있는 UserCreateRequest 클래스를 인수로 넣는다.
    // 저장된 SQL명령문과, 인수로 받은 리퀘스트 클래스 안에서 값
    @PostMapping("/user")
    public void saveUser(@RequestBody UserCreateRequest request){
        // @RequestBody어노테이션 => 리퀘스트 값을 가져온다
        // SQL문 작성 후 변수에 저장
        String sql = "INSERT INTO user(name, age) VALUE(?,?)";
        //SQL로 날려주기
        jdbcTemplate.update(sql, request.getName(), request.getAge()); // sql에 해당 함수 리턴값(이름,나이) 업로드
    }
}
