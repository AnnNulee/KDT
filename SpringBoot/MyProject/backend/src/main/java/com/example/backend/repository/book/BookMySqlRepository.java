package com.example.backend.repository.book;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

@Repository
@Primary // 등록된 레퍼지토리 두개 중 우선권을 가지고 있다.
public class BookMySqlRepository implements BookRepository {

    @Override
    public void save(String bookName){
        System.out.println("MySQL Repository" + bookName);
    }
}
