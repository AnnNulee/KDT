
package com.example.security.service;

import com.example.security.domain.User;
import com.example.security.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    // UserDetail : spring security에서 사용하는 [user객체 + 인증여부] 역할을 하는 객체.
    // 이 객체가 추후 securitycontextholder에 저장된다.
    // UserDetailService : userDetail 객체를 만들어주는 auth provider 역할을 해준다.
    // CustomUserDetailService : userDetail객체를 내가 custom 하고싶을 때 overide 해줌


    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // userdetail 을 custom 정의한 것.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        System.out.println(username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("해당 유저 없음"));

        System.out.println(username + ": 사용자 인증 성공");



        // 여기서 보면 알 수 있듯, userdatails 내부에는 이미 User data가 포함되어있다.
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }
}