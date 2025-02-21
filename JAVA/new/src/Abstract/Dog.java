package Abstract;

public class Dog extends AbstractAnimal{
    @Override
    public void sound(){
        System.out.println("멍멍");
    }

    @Override
    public void move() {
        System.out.println("뽀짝뽀짝");
    }
}
