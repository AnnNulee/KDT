package Abstract;

public class AbstractAnimalMain {
    public static void main(String[] args) {

    //    AbstractAnimal abstractAnimal = new AbstractAnimal(); : 추상 클래스는 인스턴스 생성이 불가하다

        AbstractAnimal dog = new Dog();

        soundAnimal(dog);
        moveAnimal(dog);



        // 다형성 : 부모(추상클래스) 배열 선언, 자식 인스턴스 생성
        AbstractAnimal[] animals = { new Dog(), new Cat(), new Cow() };
        // 향상된 for문
        for(AbstractAnimal a : animals) {
            a.sound();
            a.move();
        }

    }

    public static void soundAnimal(AbstractAnimal a) {
        a.sound();
    }
    public static void moveAnimal(AbstractAnimal a) {
        a.move();
    }
}
