package com.example.security.controller;


import com.example.security.domain.User;
import com.example.security.dto.request.LoginRequest;
import com.example.security.repository.UserRepository;
import com.example.security.service.SecurityService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class SecurityController {

    private final SecurityService securityService;

    @Autowired
    public SecurityController(SecurityService securityService) {
        this.securityService = securityService;
    }


    @GetMapping("/user")
    public String user(){
        return "User Page";
    }

    @GetMapping("/user/me")
    public String username(){
        return "username";
    }
    @GetMapping("/admin")
    public String admin(){
        return "ADMIN Page";
    }
    @GetMapping("/admin/me")
    public String adminname(){
        return "ADMIN NAME";
    }


//    @GetMapping("/")
//    public String root(){
//        return "root page";
//    }

    @GetMapping("/")
    public String getCurrentUserRole(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<?extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roles = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(", "));
        return "현재사용자 : " + authentication.getName() + "권한 : " + roles;
    }

    // 테스트용 임시 로그인 화면...몰라도 되는 코딩
    @GetMapping("/login")
    public String loginPage() throws IOException{
        Path path = Paths.get("src/main/resources/templates/login.html");
        return Files.readString(path);
    }

    @PostMapping("/login")
    // HttpServletRespons 는 테스트용 임시 화면전환... 원래는 걍 프론트에서 하면 됨. 인수로 받지말기
    // 로그인 정보, 요청을 받으면, service에서 authenticate(인증)기능을 불러온다. 그 때 받은 데이터를 같이 넘긴다.
    // 넘어간 정보는 manager.authenticate 기능에 의해 authentication(인증서, 토큰) 모양으로 반환되고,
    // 해당 리턴은 boolean 값을 같는다.
    public void login(@RequestBody LoginRequest loginRequest, HttpServletResponse response)throws Exception{
        if(!securityService.authenticate(loginRequest.getUsername(),loginRequest.getPassword())){
            // 인증서, 인증여부가 false일 경우.
            response.sendRedirect("http://localhost:8080/login?error=true");
            return;
        } response.sendRedirect("http://localhost:8080/"); // 인증서, 인증여부가 true일 경우.
    }

    // 테스트용 임시 회원가입 화면...몰라도 되는 코딩
    @GetMapping("/signup")
    public String signupPage() throws IOException{
        Path path = Paths.get("src/main/resources/templates/signup.html");
        return Files.readString(path);
    }

    @PostMapping("/signup")
    public void signup(@RequestBody User user, HttpServletResponse response)throws Exception{
        securityService.registerUser(user);
        response.sendRedirect("http://localhost:8080/login");
    }



}



