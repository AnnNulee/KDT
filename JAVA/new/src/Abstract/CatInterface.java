package Abstract;

public class CatInterface implements InterfaceAnimal{
    // 인터페이스 구현할 때 ( 상속 아님)는 impliments 사용.

    @Override
    public void sound() {
        System.out.println("야옹");
    }

    @Override
    public void move() {
        System.out.println("살금살금");
    }
}
