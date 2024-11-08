

class Person{
    constructor(name, age){ // 생성자의 스코프 지역. 
        this.name = name;
        this.age = age;
    }

    //메소드 정의할때, 속성을 사용하고싶으면 this.를 속성변수명 앞에 붙여서 해당 instance의 값임을 알려야한다.
    sayHello(){
        console.log(`Hello, my name is ${this.name}, and i am ${this.age}years old`);
    }
}

              //new : 새 객체선언
const person1 = new Person('Nulee', '32');
const person2 = new Person('Taeyoon', '33');

person1.sayHello();
person2.sayHello();



//조회(Getter)와 지정(Setter) #########################이해필요. 교안 읽기

    class Rectangle {
        constructor(height, width){
            this._height = height;
            this._width = width;
        }

        // height값 10cm 올려주는 메소드
        get height(){
            return this._height + 10;
        }


        // height값 재정의 하는 메소드
        set height(value){  
            if (value > 0 ) {
                this._height = value;
            } else {
                console.log("높이는 0보다 커야합니다.")
            }
        }
        
        
    };

    const rec = new Rectangle(10, 20);
    console.log(rec);
    console.log(rec.height); // getter. +10 추가되는 기능. height 안에 변수넣지 않음
    rec.height = 190; // 변수에 값 대입
    console.log(rec.height); // getter. 190에 +10 추가됨



// Object(객체) 
// 아무 값 다 넣어도 됨. 함수도 넣어도 된다.
// {} 중괄호를 사용하여 생성한다. 속성과 값의 쌍을 포함할 수 있다.

    const obj = {};
    const person = {
        name:'mike',
        age : 20,
    };

    // 속성 조회. 
        console.log(person.name);  // mike 출력
        console.log(person['age']);  // 20 출력

    // 속성 추가 또는 변경
        person.hasJob = false; // 속성 추가 (점 연산자)
        person['hasJob'] = true; // 속성 추가 (대괄호)
        person.age = 25; // 속성 변경 (점 연산자)


    // 객체를 함수의 인자로 전달
        function printPerson(person) {
            console.log(`Name: ${person.name}`);  // 객체의속성을 함수의 인자로 사용 가능
            console.log(`Age: ${person.age}`);
        }
        
        printPerson(person); // 함수에 객체를 전달하여 데이터 출력


    // for in 루프

    const obj1 = {
        'pizza': '🍕',
        'chicken': '🍗',
        'meat': '🍖'
    };

    for (const k in obj1 ){
        console.log(k); // key 출력
        console.log(obj1[k]); // key에 해당하는 value 출력
    }


    // 객체복사

        // shallow copy 얕은 복사 :        
        // 객체의 복사본을 생성하되, 참조의 느낌이다. 마치 주소값 저장하는것 처럼, 가리키는 데이터는 동일하다.

        
            const obj_1 = {key:'value'};

                // 대입 연산자 (=)를 사용
                const obj_2 = obj_1;
                // Object.assign() 을 사용
            //  const obj_2 = Object.assign({}, obj_1);
                // Spread 연산자 (...)를 사용
            //  const obj2 = { ...obj1 };

            obj_2.key = 'shellow'
            console.log(obj_1.key); // 출력 'shellow'