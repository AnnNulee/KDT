const fs = require('fs')

// fs 자체가 콜백함수를 불러오는것. 애초에 비동기 함수임.
// promises 는 형식을 부여한다. .then과 .catch. 라는 형식을 부여한다. 비동기함수를 사용하는 방식중 하나임. 
// 파일을 불러올 때 무엇을 해야할지(콜백)를 기반으로 만든다. 
// 동기함수의 범위 (파일 하나. anonymouse.)의 실행이 모두 끝나야 비동기의 callback이 들어올 수 있다.


//------------------------------------------------------------------//

console.log('시작');


fs.readFile('./sample.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('1번', data.toString()) 
    // 주어진 시간(3초)이 없어도, 이 친구가 비동기여서 task queue에 가는 이상 함수가 끝난 후에 실행된다. 
    // 비동기 함수는 주어진 함수가 다 끝나야 실행된다. 
})
console.log('끝');




//------------------------------------------------------------------//


// // async는 함수 앞에만 붙일 수 있다.
// // 익명 함수 만드는 법 : () => {}
// // function() 이라 알고있겠지만, 'function'은 생략가능하기 때문에 이따구로 생김


(async () => {
    try{
        const data1 = await fs.promises.readFile('./sample.txt', 'utf8');
        console.log('1번', data1.toString());

        const data2 = await fs.promises.readFile('./sample.txt', 'utf8');
        console.log('2번', data2.toString());

        const data3 = await fs.promises.readFile('./sample.txt', 'utf8');
        console.log('3번', data3.toString());

        const data4 = await fs.promises.readFile('./sample.txt', 'utf8');
        console.log('4번', data4.toString());

    }catch (err) {
        console.error('에러발생', err);
    }
})(); // () 붙이면 바로 실행
console.log('끝');


//------------------------------------------------------------------//


    // 비동기함수는 backgound에서 처리되는데, 그 순서가 반드시 지켜지지 않는다. 

fs.readFile('./sample.txt', (err, data) => {
    if (err) {throw err}
    console.log('1번', data.toString())
});

fs.readFile('./sample.txt', (err, data) => {
    if (err) {throw err}
    console.log('2번', data.toString())
});

fs.readFile('./sample.txt', (err, data) => {
    if (err) {throw err}
    console.log('3번', data.toString())
});

fs.readFile('./sample.txt', (err, data) => {
    if (err) {throw err}
    console.log('4번', data.toString())
});


//------------------------------------------------------------------//

        //Sync : 동기함수.background로 안감.
// 동기함수의 범위 (파일 하나. anonymouse.)의 실행이 모두 끝나야 비동기의 callback이 들어올 수 있다.
// 그런데 콜백을 동기함수 범위 내에 순서를 지정해주고싶을 수도 있잖아. 그럴때는 
// Sync를 써준다. 

const data1 = readFileSync('./sample.txt', 'utf8');
console.log('1번', data1.toString());

const data2 = readFileSync('./sample.txt', 'utf8');
console.log('2번', data1.toString());

const data3 = readFileSync('./sample.txt', 'utf8');
console.log('3번', data1.toString());

const data4 = readFileSync('./sample.txt', 'utf8');
console.log('4번', data1.toString());