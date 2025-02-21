package com.example.backend.service.user;

import com.example.backend.dto.user.request.UserCreateRequest;
import com.example.backend.dto.user.response.UserResponse;
import com.example.backend.repository.user.UserJDBCRepository;
import org.springframework.stereotype.Service;

import java.util.List;


// 비즈니스 로직을 수행.
// controller에서 받은 데이터를 Repostory로 전달.
// 필요시 추가 검증 (몇글자 이내냐 등)

@Service
public class UserService {

    // repository의 method를 사용하기 위한 불러오기.
    private final UserJDBCRepository userJDBCRepository;

    // 생성자 생성
//    public UserService(JdbcTemplate jdbcTemplate) {
//        this.userRepository = new UserRepository(jdbcTemplate); // 레퍼지토리 클래스 사용하려면 생이 필요./
//    }


    public UserService(UserJDBCRepository userJDBCRepository) {
        this.userJDBCRepository = userJDBCRepository;
    }

    // 레포지토리의 SQL문 로드.
    // service method 생성 : 호출한 레퍼지토리 내부의 method 로드 및, dto 데이터 전달.
    public void saveUser(UserCreateRequest request) { // dto 에서 데이터 로드
        userJDBCRepository.saveUser(request.getName(), request.getAge()); // 항상 객체로 전달되던 데이터들을, getter로 꺼내준다.
    }

    public void updateUser(Long id, UserCreateRequest request) {
        userJDBCRepository.updateUser(id, request.getName(), request.getAge());
    }

    public void deleteUser(Long id) {
        userJDBCRepository.deleteUser(id);
    }

    public List<UserResponse> getAllUsers(){
        return userJDBCRepository.getAllUsers();
    }

    public UserResponse getUser(Long id){
        return userJDBCRepository.getUser(id);
    }
}
