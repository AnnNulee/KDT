package com.example.backend.service.book;

import com.example.backend.dto.book.request.BookCreateRequest;
import com.example.backend.repository.book.BookMemoryRepository;
import com.example.backend.repository.book.BookMySqlRepository;
import com.example.backend.repository.book.BookRepository;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    // 레퍼지토리 쓰려면 레퍼지토리 선언 및 생성 필요
//    private final BookMemoryRepository bookMemoryRepository = new BookMemoryRepository();
//    private final BookMySqlRepository bookMySqlRepository = new BookMySqlRepository();

    // 레퍼지토리 두개 구현시킨 인터페이스로 사용
//    private final BookRepository bookRepository1 = new BookMemoryRepository(); // new : 클래스를 인스턴스로 만드는 역할.  + 클래스를 실행시킨것이 인스턴스가 된다.
    // 원래는 이렇게 클래스() 실행시켜서 내부에 있는 생성자 메서드가 실행되어 인스턴스를 만들도록 해야하지만, 어노테이션 붙여놓으면 생략이 가능하다.
//    private final BookRepository bookRepository2 = new BookMySqlRepository();


    // 어노테이션 service랑 repository에 다 적용했을 때 : 생성은 하지 않고 선언만 해도 된다.
    private final BookRepository bookRepostory;

    // 클래스 이름이랑 똑같은 메서드는 생성자. 생성하는 함수등은 클래스 내부에 항상 있어야 한다.
    public BookService(BookRepository bookRepostory) {
        this.bookRepostory = bookRepostory;
    }

    public void saveBook(BookCreateRequest request){
        //bookMemoryRepository.save(request.getBook());

//        bookRepository1.save(request.getBook());
//        bookRepository2.save(request.getBook());

        bookRepostory.save(request.getBook());
    }
}




