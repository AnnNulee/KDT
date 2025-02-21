package Polymorphism;

public class AnimalSoundMain1 {
    public static void main(String[] args) {
        // 모두 super 클래스를 가지고 있는 sub 클래스.
        // 그럼 얘네는 우리가 부모타입으로 정해줄 수 있다.
        Dog dog = new Dog();
        Cat cat = new Cat();
        Cow cow = new Cow();

        soundAnimal(dog);
        soundAnimal(cat);
        soundAnimal(cow);
    }
    public static void soundAnimal (Animal animal) { // 대입 말고 그냥 이렇게 매개변수로 받는것도 업캐스팅
        // 매개변수는 Animal animal 로 변수를 받는데, 거기에는 자식 인스턴스 참조값을 넣는다.
        animal.sound();
    }
}
