package com.example.backend.dto.book.request;

public class BookCreateRequest {
    private String book;

    // 생성
    public BookCreateRequest(String book) {
        this.book = book;
    }

    // getter
    public String getBook() {
        return book;
    }
}
