package com.example.backend.repository.user;

import com.example.backend.dto.user.response.UserResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
// SQL 관련 처리하도록 돕는 Jdbc


// DB에 대한 요청들을 처리하는 역할.
// DB에 직접 연결하는 모든 작업을 처리함
// JDBC를 사용하여 SQL을 DB로 보내는 작업

@Repository
public class UserJDBCRepository {
    private final JdbcTemplate jdbcTemplate;

    // 생성자 생성
//    public UserRepository(JdbcTemplate jdbcTemplate){
//        this.jdbcTemplate = jdbcTemplate; // 선언
//    }

    public UserJDBCRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 메소드 정의

    // Post 사용자 입력 요청
    public void saveUser(String name, Integer age) {
        // 실행할 sql문 변수에 저장
        String sql = "INSERT INTO user(name, age) VALUES(?, ?)";  // user테이블에 name, age 속성에 ?, ?값을 insert 한다.
        // 실행할 sql문, 입력할 value 값 인수로 넣어 update 실행
        jdbcTemplate.update(sql, name, age); // 값을 입력하는 jdbc
    }

    // Put 사용자 정보 수정
    public void updateUser(Long id, String name, Integer age) {  //Long : SQL 의 bigint랑 매칭되는 타입
        String sql = "UPDATE user SET name = ?, age = ? WHERE id = ? ";
        jdbcTemplate.update(sql, name, age, id);
    }

    // delete 사용자 정보 삭제
    public void deleteUser(Long id) {
        String sql = "DELETE FROM user WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    // Get 사용자 정보 요청
    public List<UserResponse> getAllUsers(){
        String sql = "Select * FROM user";
        return jdbcTemplate.query(sql, userRowMapper);
    }

    //Get 한명 정보 요청
    public UserResponse getUser(Long id){
        String sql = "SELECT * FROM user WHERE id = ?";
        // jdbcTemplate.queryForObject(sql, id);
        return jdbcTemplate.queryForObject(sql, userRowMapper, id); // 순서지키기. sql문에 id 적용.
    }

    private RowMapper<UserResponse> userRowMapper = (rs, rowNum)
            -> new UserResponse(rs.getLong( "id"), rs.getString("name"), rs.getInt("age"));

}
