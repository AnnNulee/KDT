package Inheritance;

public class ElectricCar extends Car { // Car를 상속받음 : 'move'기능 사용 가능
    public void charge() {
        System.out.println("충전");
    }
}
