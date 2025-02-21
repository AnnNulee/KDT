package Polymorphism;

public class OverridingMain {
    public static void main(String[] args) {

        // Child 타입으로 정의된 child 변수에 Child 인스턴스 주소값 대입
        Child child = new Child();
        System.out.println("Child -> Child");
        System.out.println("value = " + child.value);
        child.method();

        //부모 변수가 부모 인스턴스 참조
        Parent parent = new Parent();
        System.out.println("Parent -> Parent");
        System.out.println("Value = " + parent.value); //value는 오버라이딩 안됨
        parent.method();

        //부모 타입에 자식 인스턴스 참조
        Parent poly = new Child();
        System.out.println("Parent -> Child");
        System.out.println("Value = " + poly.value);
        poly.method(); // 자식에서 오버라이드 한 메소드가 출력됨

    }
}
