
// fs 자체가 콜백함수를 불러오는것. 파일을 불러올 때 무엇을 해야할지(콜백)를 기반으로 만든다. 
// 그렇기 때문에 if 기반의 콜백함수로 짤 수 도 있고, 
// promise 기반으로 직관적인 콜백을 보통 짠다.

const fs = require('fs').promises  /// fs는 모조리 promises 먹이겠다.

const context = "룰랄라"

//promise 형태의 사용법
// (새) 파일 쓰기.('파일 명', 내용, '인코딩규칙' )  // 있으면 "덮어쓰기", 없으면 새파일 제작
// then이나 catch를 중괄호라거나 묶어서 구역을 나누지 않는 이유는, 원래 이게 코드 한줄이다. 
fs.writeFile('text2.txt', context, 'utf8') 
    .then(() => {
        console.log("파일쓰기 완료")
    }).catch((err) => {
        console.error(err)
    })



// await 비동기함수를 처리하는 동안 다음 함수를 기다리도록 하는 것. ==> 
// function은 기본적으로 동기적 수행. 그런데 여기에 async-await이 붙어 비동기적 수행을 해준다. 
// 비동기 함수를 연속적으로 사용해야할 때, promise를 쓰면 콜백지옥으로 들어간다. 이럴때 더 깔끔하게 await으로 정리해줄 수 있다. 
async function writeFile(path, context){  
    try {
        await fs.writeFile(path, context, 'utf8'); // await에 promise를 쓰면, 해당 코드 밑에 있는 함수를 기다리게 한다. 
        console.log('async-파일 쓰기 완료') // 위의 함수가 끝나기 전까지 기다리게 한다. (task queue엔 들어가지 않는다. )
    } catch(err) {
        console.log('async-파일쓰기 실패') // 여기서의 catch는 try-catch의 예외처리.
    }
}

writeFile('./text.txt', context)