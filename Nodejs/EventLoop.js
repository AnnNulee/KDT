
//Event Loop
// 이벤트 루프는 call stack이 다 비워지면 callback queue에 존재하는 함수를 하나씩 call stack으로 옮기는 역할을 한다.


//------------------------------------------------------------


// stack의 구조상, 나중에 실행된 함수가 가장 먼저 완료되고 실행된 순서의 반대로 완료된다.

// function thirdFunction() {
//     console.log ('third')
// };

// function firstFunction() {
//     setTimeout(()=> {
//         console.log('first')
//     }, 1000)
//     secondFunction()
    
// };

// function secondFunction() {
//     setTimeout(()=> {
//         thirdFunction()
//     }, 2000)
//     console.log('second')
// };

// firstFunction();

//------------------------------------------------------------


// 비동기함수: Call Stack ==> Background
// setTimeout은 비동기 함수로 호출 스택(Call Stack)에서 실행되고 기능을 Background로 넘긴 후 바로 제거된다. 
// 3초 타이머가 완료되면 run 함수는 Task Queue로 들어간다.
// Task Queue에 있는 콜백 함수(run)는 ""호출 스택이 비어 있을 때""" 호출 스택으로 들어가 실행
// 반드시 3초에 실행되는것은 아니고, 스택이나 큐에 실행할게 많으면 지연될 수 있다.

// function run() {
//     console.log("3초 후 시작")
// };
// console.log("시작");
// setTimeout(run, 3000);   
// console.log("끝");


//------------------------------------------------------------

// console.log('시작');
// setTimeout(firstFunction, 3000);  
// setTimeout(secondFunction, 1000);
// setTimeout(thirdFunction, 2000);
// console.log('끝');


//------------------------------------------------------------


function longTask() {
    const start = Date.now() // 호출 스택에 들어가는 순간 시간을 start 변수에 저장.
    while (Date.now() - start < 5000) {  
        // '현재시간'이 start에 기록된 시간보다 3초보다 커지면 false : while탈출 
    }
    console.log("longTask 작업완료")
};

function firstFunction() {
    setTimeout(()=> {
        console.log('first') //stack이 비어야 task Queue에 대기하고 있는 first가 출력된다. 
    }, 1000)
};


console.log('시작');
firstFunction();
longTask();
console.log('끝');  // Anonymous 가 남아있기 때문에 firstFunction의 first가 이 후에 나온다. 