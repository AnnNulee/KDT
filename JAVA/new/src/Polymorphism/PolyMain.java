package Polymorphism;

public class PolyMain {
    public static void main(String[] args) {

        // 부모 변수가 부모 인스턴스를 참조하는 상황
//        System.out.println("Parent => Parent");
//        Parent parent = new Parent(); // 부모변수 선언 및 생성
//        parent.parentMethod(); // 부모 인스턴스 참조
//
//        // 자식 변수가 자식 인스턴스를 참조하는 상황
//        System.out.println("Child => Child");
//        Child child = new Child();
//        child.childMethod();
//
//        // 부모 변수가 자식 인스턴스를 참조하는 상황
//        System.out.println("Parent => Child");
//        Parent poly = new Child();  // 부모 변수 선언, 자식 인스턴스 참조
//        poly.parentMethod(); // 부모메서드 사용 가능
    //    poly.childMethod();  // 자식메서드 사용 불가 : 로직은 부모로직만 사용 가능. 자식 메서드가 없다.

        // 자식변수가 부모 인스턴스를 참조하는 상황 : 안됨. 자바가 막아놨다.


   //     Child child1 = (Child) poly; // 부모 변수 넣어주기

    }
}
