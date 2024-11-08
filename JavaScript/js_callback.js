
//비동기식 처리와 콜백 함수
    console.log(1);
    setTimeout(delayPrint, 1000);  
    // 대표적 비동기함수.
    // 원래 동기식인 경우 1,2,3 순서인데
    // 비동기적 처리를 하기 때문에 출력이 완료되지 않은 상태에서도 다음 라인이 실행이 된다.
        // callback함수 : 비동기 처리를 하는 중, 특정작업(api호출, 타이머)이 완료된 후에 실행되는 함수. 여기서는 delayPrint
    // 카운트를 시작하고 출력을 기다리지 않은 상태로 바로 다음라인 코드를 실행한다.
    console.log(3);

    function delayPrint(){
        console.log(2)
    }


// Promise
    const myPromise = new Promise((resolve, reject)=>{  // Promise 가 비동기처리실행시킴. 
        const condition = true;
        if(condition) {
            resolve('성공');
        }else{
            reject('실패');
        }
    });

    myPromise.then(res =>{    // res : 성공하면 resolve의 도출값 '성공' 이 적용되고 실패하면 reject 도출값인 '실패'
        console.log(res);
    }).catch(err => {
        console.error(err);
    })

