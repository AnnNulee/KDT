package com.example.backend.service.user;

import com.example.backend.domain.User;
import com.example.backend.domain.UserRepository;
import com.example.backend.dto.user.request.UserCreateRequest;
import com.example.backend.dto.user.response.UserResponse;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceJPA {

    // interface(repository)의 method를 사용하기 위한 불러오기.
    private final UserRepository userRepository;

    // 생성자
    public UserServiceJPA(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


        // !!!!!! jpa 함수는 (보통) 도메인을 객체로 받는다 !!!
        // 다른경우는 아직 몰로겠음



    //post 요청 : 데이터 저장
    // 인수 : 요청 데이터 dto
    @Transactional
    public void saveUser(UserCreateRequest request){
        userRepository.save(new User(request.getName(), request.getAge()));
        //jpaRepository를 상속받은 interface이기 때문에 jpa의 메소드(save)를 사용할 수 있다.
        throw new IllegalArgumentException("l");// 무조건 에러 발생
    }

    // Get 요청 : 사용자 전체 조회
    @Transactional
    public List<User> getAllUser(){

        //         SQL에서 온 데이터를 객체로 받아줘야함
        //        1. userRepository.findAll() => SELECT * FROM user : 이 값을 리스트 형식으로 담아주고싶다
        //        2. .stream() => 스트림이라는 데이터타입이 있음. 스트림 형식으로 변환
        //           각 collum 별 데이터를 속성명과 같이 key : value로 매칭 시켜준다.
        //           리스트를 반복적인 함수를 적용할 수 있도록 해주는 함수형 타입. stream 형태로 바꾸면, map 함수를 사용할 수 있다.
        //        3. map(UserResponse::new) => 들어오는 User 형태를 'UserResponse' 형태로 바꿔줘.(객체로 변환하는 작업)
        //        4. collect(Collectors.toList()) => return으로 주어야하는, List형식으로 반환

                // return type이 List<UserResponse> 였을 경우. (보통은 DTO를 넣으니까)

        //        return userRepository.findAll().stream().map(UserResponse::new).collect(Collectors.toList());

        return userRepository.findAll().stream().toList();
                // userRepository는 extends JpaRepository<User, Long> 로 User데이터를 인수로 받기때문에, 애초에 User 데이터 로 들어온다.
                // 그렇기 때문에 반환 타입이 User면, 필드값이 변하지 않으므로 mapping을 해줄 필요가 없다.
    };


    // Put 요청 :
    @Transactional
    public void updateUser(Long id, UserCreateRequest request){
        // id와 일치하는 정보 찾기
        User user = userRepository.findById(id).orElseThrow(IllegalAccessError::new); //id 없으면 에러처리
        user.updateName(request.getName());
        userRepository.save(user);
    }

    // delete 요청
    @Transactional
    public void deleteUser(String name){
        User user = userRepository.findByName(name);
        // List<User> user = userRepository.findAllByName(name);
        if(user == null){
            throw new IllegalArgumentException();
        }
        userRepository.delete(user);
        // delete : 객체 하나 삭제
        // deleteAllInBatch : 여러개 삭제
        //userRepository.deleteAllInBatch(user); // 찾은 데이터를 삭제
    }
}
