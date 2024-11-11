
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



    //음식 주문
    //음식 주문 받기 ==> 주문이 완료된 후 음식을 요리 ==>  테이블로 서빙
    // 해당 단계를 비동기식으로 처리하도록 예시 작성


    // 주문을 받고 완료
    function orderFood(food) {
        return new Promise((resole) => {
            console.log(`You got an order. (${food})`
                setTimeout(() = => {
                    resolve(`${food} done`)
                }, 2000)  // 2초 후에 주문 완료
            )
        })
    }


    function serveFood(food) {
        return new Promise((resolve) => {
            console.log(`${food} serving...`)
            setTimeout(() => {
                resolve(`${food} 서빙 완료`)
            }, 1000)
        )
    })
}
        
    // async - await은, 실행은 비동기식으로 처리를 하되 결과는 특정한 순서를 지켜서 받아야 할 때, 결과의 순서를 정리해주는 역할을 한다.
    // async를 쓰면, 내부의 함수들은 비동기적으로 실행이 일어나지만
    // 비동기식 일처리가 끝나고 바로 결과가 나오는 대신 순차적인 결과를 도출해주기 위해서 await으로 순서를짜내준다. 
    //async와 await 사용
    async function placeOrder(){   // async function 내부는 promise 형태를 띈 비동기적 처리 공간이 된다. 이후 await을 붙인걸 비동기처리할 수 있도록 선언해주는 역할
        const orderedFood = await orderFood('피자');    //await이 없으면 주문을 받았는데 피자 서빙이 바로 나온다. 처리가 다 끝날때('준비 완료')까지 기다려라.  수행은 처리하되 결과의 리턴만 기다려라! 
        console.log(orderedFood)
        const servedFood = await serveFood('피자');
        console.log(servedFood);
    }

    placeOrder()






    ///선생님꺼. 비교해보고 다시해보기

//     // 음식 주문
// // 음식 주문 -> 음식을 요리 -> 테이블로 서빙

// //  비동기 작업에 대한 함수를 예시
// function oderFood(food) {
//     return new Promise((resolve) =>{
//       console.log(`주문을 받았습니다.(${food})`)
//       setTimeout(() =>{
//         resolve(`${food} 준비 완료`)
//       }, 2000) // 2초후에 주문 완료
//     })
//   }
  
//   function serveFood(food) {
//     return new Promise((resolve) =>{
//       console.log(`${food} 서빙중...`)
//       setTimeout(()=>{
//         resolve(`${food} 서빙 완료`)
//       }, 1000)
//     })
//   }
  
//   // async 와 await 사용
//   async function placeOder() {
//     const oderedFood = await oderFood('피자');
//     console.log(oderedFood)
//     const servedFood = await serveFood("피자");
//     console.log(servedFood);
//   }
  
//   placeOder()
  


