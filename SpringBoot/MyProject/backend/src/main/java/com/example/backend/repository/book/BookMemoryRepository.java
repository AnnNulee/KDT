package com.example.backend.repository.book;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

// 인터페이스 구현
@Repository
public class BookMemoryRepository implements BookRepository {

    private final List<String> books = new ArrayList<>(); // 같은 타입의 데이터를 순서대로 저장할 수 있는 리스트

    @Override
    public void save(String bookName){
        books.add(bookName); // 전달받은 이름 리스트에 추가
    }

}
