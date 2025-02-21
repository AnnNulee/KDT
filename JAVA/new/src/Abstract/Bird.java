package Abstract;

public class Bird extends AbstractAnimal implements FlyInterface, InterfaceA, InterfaceB{
    // 추상클래스도 상속받고, 인터페이스도 구현함.
    // 추상클래스는 하나 상속 가능, 인터페이스 구현은 여러개 가능 (다중구현)

    // AbstractAnimal 상속. abstract method 모두 override
    @Override
    public void sound() {
        System.out.println("짹짹");
    }
    
    @Override
    public void move() {
        System.out.println("훨훨");
    }

    // FlyInterface 구현
    @Override
    public void fly(){
        System.out.println("슝슝");
    }

    // 복수 인터페이스 구현 가능
    @Override
    public void methodA(){
        System.out.println("Bird.methodA");
    }

    @Override
    public void methodB(){
        System.out.println("Bird.methodB");
    }

    @Override
    public void methodCommon(){
        System.out.println("Bird.methodCommon");
    }
}
