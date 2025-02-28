//package com.example.security.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.AuthenticationEntryPoint;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration // Spring 설정파일
//public class SecurityConfig {
//
//    @Bean // IoC/DI 패턴에 자동등록.
//    // 필터체인 구성
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
//        http
//                .csrf(csrf -> csrf.disable()) // 테스트용도니까 csrf 꺼놓는거임
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/", "/login", "/sign").permitAll() // 이 리퀘스트는 다 permit 해줘라
//                        .anyRequest().authenticated()) // 나머지는 다 검증해라
//                .formLogin(form -> form.disable()) // 기본로그인폼 안써!
//                .logout(logout -> logout
//                        .logoutUrl("/logout")
//                        .logoutSuccessUrl("/")
//                        .invalidateHttpSession(true) // 로그아웃 후 세션 완료 / 이전(로그인상황)에 받은 세션 쓸거야?
//                        .deleteCookies("JSESSIONID") //   자동으로 만든 쿠키 무효화
//                        .permitAll());
//        return http.build();
//    }
//
//    @Bean // 패스워드 암호화
//    // 패스워드는 암호화된 상태에서 DB로 들어간다. 로그인할때도 암호화 되어, DB에 암호화되어 저장된 패스워드와 비교된다.
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder(); // bcrypt에서 제공하는 passwordEncoder
//    }
//
////    @Bean
////    // 커스텀 인증 로직을 구성할때 UserDetailService를 사용하는 경우
////    // 로그인시 사용자에 대한 인증처리 해주는 영역.
////    // 근데 security가 자동으로 해주는데
////    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)throws Exception{
////        return authenticationConfiguration.getAuthenticationManager();
////    }
//
//
//
//
//}

package com.example.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers( "/login", "/signup").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/user/**").hasRole("USER")
                        .anyRequest().authenticated())
                .formLogin(form->form.disable())
                .logout(logout ->  logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/")
                        .invalidateHttpSession(true) // 로그아웃후에 세션 만료
                        .deleteCookies("JSESSIONID") //쿠키 무효화
                        .permitAll());
        return http.build();
    }

    @Bean // 패스워드를 암호화
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean // 커스텀 인증 로직을 구성할때 UserDetailService를 사용하는 경우
    // securityservice 에서 불러서 사용하기 위한 정의.
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

}