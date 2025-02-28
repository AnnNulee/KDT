package com.example.security.service;

import com.example.security.domain.User;
import com.example.security.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SecurityService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public SecurityService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }


    //    // 로그인 인증 (회원인지 확인)
//    public boolean authenticate(String username, String password){
//        Optional<User> userOpt = userRepository.findByUsername(username);
//        return userOpt.isPresent() && userOpt.get().getPassword().equals(password); // get()는 Optional 객체에서 user 객체를 빼와준다.
//    }
    
    // 로그인 인증 (회원인지 확인), 서로 암호화된 상태로 비교하기
//    public boolean authenticate(String username, String password){
//        Optional<User> userOpt = userRepository.findByUsername(username);
//        if(userOpt.isEmpty()){
//            return false;
//        }
//        User user = userOpt.get();
//        boolean matches = passwordEncoder.matches(password, user.getPassword());
//        return matches;
//    }

//    public boolean authenticate(String username, String password){
//        try{
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(username, password)  // 토큰발행
//
//            );
//            return authentication.isAuthenticated();
//        } catch (AuthenticationException e){
//            return false;
//        }
//    }


    // authenticate : 인증하는 기능. 이 기능을 위해서 manager를 불러야 한다. 그 안에 authenticate 기능이 있으니까.
    // security가 알아서 인증 해주는애 : authenticationManager. configue에 있다.
    // 얘가 customuserdatailservice
    // AuthenticationManager : 인증 실행자. authenticate 호출해서 인증기능 실행
    // athenticate에 (정보를 넣은 토큰)을 먹이면, '인증서 역할을 하는 객체'를 발행
    // 해당 인증서가 인증 된 상태 인 경우, 최종적으로 true 반환
    public boolean authenticate(String username, String password){
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            return authentication.isAuthenticated();
        } catch (AuthenticationException e){
            return false;
        }
    }

    // 회원등록. 프론트에서 받은 정보 + setRole 해서  DB로 POST
    public void registerUser(User user){
        user.setRole("ADMIN");
        user.setPassword(passwordEncoder.encode((user.getPassword())));
        userRepository.save(user);
    }





}
