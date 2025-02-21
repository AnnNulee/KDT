package Inheritance;

public class ClassC extends ClassB {
    public ClassC() {
        super(10, 20); // 부모클래스가 매개변수를 받으면 생략불가. , ClassB
        // super(10);
        // 생성자는 두개 생성 불가. 원하는 메소드를 실행시키려면 해당 메소드의 시그니처를 맞추어서 대입해야 함.
        System.out.println("ClassC 생성자");
    }
}
