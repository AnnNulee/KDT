package Polymorphism;

import Polymorphism.Parent;

public class Child extends Parent {
//    public void childMethod(){
//        System.out.println("Child.childMethod");
//    }

    public String value = "Child"; // value는 오버라이딩 안됨

    @Override
    public void method(){
        System.out.println("Child.method");
    }

}
