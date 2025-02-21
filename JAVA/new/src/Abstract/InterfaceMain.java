package Abstract;

public class InterfaceMain {
    public static void main(String[] args) {
        CatInterface cat = new CatInterface();

        cat.sound();
        cat.move();

        Bird bird = new Bird();
        bird.fly(); // 인터페이스 상속
        bird.move(); // 클래스 상속 1
        bird.sound(); // 클래스 상속 2

    }
}
