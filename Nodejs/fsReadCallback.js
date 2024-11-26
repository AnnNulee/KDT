const fs = require('fs');


// fs는 기본이 콜백함수.
// 비동기적인 역할은 promise를 붙여야 사용 가능하다. 
// 파일 읽어오기
// 읽었을때 어떻게 처리? 에러시엔 어떻게 처리?


fs.readFile('./sample.txt', (err, data) => { // 첫번째 인수는 error 변수. 뒤에는 들어올 data
    if (err) {
        throw err;
    }
    console.log(data)  // data는 object로 들어온다. 데이터가져오기를 수행한 후 찍기
    console.log(data.toString()) // 해당 데이터 값 출력
} ) 




fs.promises.readFile('./sample.txt')
    .then((data)=> { // promise가 성공했을 때 이거 실행해라. 
        console.log(data);
        console.log(data.toString())
    }).catch((err)=> { // promise가 실패했을 때 이거 실행해라. 
        console.error(err)
    })