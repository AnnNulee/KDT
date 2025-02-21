package Inheritance;

public class ClassB extends ClassA {
    public ClassB(int a) {
        super(); // 부모클래스가 매개변수가 없는 기본생성자일 경우 생략 가능, ClassA
        System.out.println("ClassB.ClassB : " + a);
    }

    public ClassB(int a, int b) {
        super(); // 부모클래스, ClassA // "ClassA 생성자" 프린트.
        System.out.println("ClassB.ClassB : " + a + b);
    }

}
