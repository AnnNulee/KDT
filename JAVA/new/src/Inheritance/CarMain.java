package Inheritance;

public class CarMain {
    public static void main(String[] args) {
        ElectricCar electricCar = new ElectricCar();
        electricCar.move(); // 자식클래스에서 정의되지 않은 메소드지만, 부모클래스에서 정의되어 상속받음
        electricCar.charge(); //지가 만든거
        electricCar.openDoor(); // Car 에서 만듦

        GasCar gasCar = new GasCar();
        gasCar.move();
        gasCar.fillUp();
        gasCar.openDoor();// Car 에서 만듦

        Hydrogen hydrogen = new Hydrogen();
        hydrogen.move();
        hydrogen.fillHydrogen();
        hydrogen.openDoor(); // Car 에서 만듦
    }
}
