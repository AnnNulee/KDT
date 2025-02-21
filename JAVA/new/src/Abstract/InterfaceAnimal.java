package Abstract;

public interface InterfaceAnimal { // 타입은 class 아니고 interface

    //인터페이스 멤버변수 : 무조건 'public static final'
    public static final double MY_PI = 3.14;


    // 인터페이스 메소드
    public abstract void sound();
    void move(); // public abstract 생략 가능.
}
