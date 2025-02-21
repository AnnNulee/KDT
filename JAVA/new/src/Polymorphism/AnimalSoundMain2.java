package Polymorphism;

public class AnimalSoundMain2 {
    public static void main(String[] args) {
        Dog dog = new Dog();
        Cat cat = new Cat();
        Cow cow = new Cow();

        Animal[] animals = {dog, cat, cow}; // Animal 클래스에 대입 가능한 자식 인스턴스들을 속성으로 나열해준다.

        for ( Animal a : animals){
            a.sound();
            a.move();
        }
    }

}


