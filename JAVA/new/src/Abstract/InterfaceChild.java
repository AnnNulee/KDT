package Abstract;

public class InterfaceChild implements InterfaceA, InterfaceB{

    @Override
    public void methodA(){
        System.out.println("InterfaceChild.methodA");
    }
    @Override
    public void methodB() {
        System.out.println("InterfaceChild.methodB");
    }
    @Override
    public void methodCommon(){
        System.out.println("InterfaceChild.methodCommon");
    }
}
