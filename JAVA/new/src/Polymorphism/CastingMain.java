package Polymorphism;

public class CastingMain {
    public static void main(String[] args) {
        // 업캐스팅
        Parent poly = new Child();

        // poly.childMethod(); : 자식메소드 참조 못함. 하려면 다운캐스팅 필요

        //일시적 다운캐스팅
     //   ((Child) poly).childMethod();

    }
}
