package Polymorphism;

public class CastingMain2 {
    public static void main(String[] args) {
        Child child = new Child();
    //  Parent parent = (Parent) child;
        Parent parent = child; // 업캐스팅은 생략가능
    }
}
