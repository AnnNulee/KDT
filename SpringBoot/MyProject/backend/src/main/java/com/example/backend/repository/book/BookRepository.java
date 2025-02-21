package com.example.backend.repository.book;


// book repository를 상속해서 다 접근가능하게 하는 인터페이스
// 인터페이스는 bean 등록 못함.
public interface BookRepository {
    public void save(String Name);


}
