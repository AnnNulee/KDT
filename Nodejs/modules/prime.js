// const min = 2 // 시작숫자
// const max = 10_000_000 // 끝 숫자
let primes = []  // const로 주면 안된다. PrimeWorker에서 다른 값을 대입할것.

function findPrime(start, range) {
    let isPrime = true; // 모든것을 소수라고 가정하고 시작. 아니면 false로 변함
    const end = start + range;
    for (let i = start; i < end; i++) {  // 소수의 후보 탐색
        for (let j = 2; j < Math.sqrt(end); j++) { // 해당값이 소수인지 판단하는 영역 // sqrt : 루트값. 
            //여기서 worker에게 일을 분배할 때, i의 start 시점이 각자 달라지므로 j는 항상 고정값인 2로 실제 숫자로 배정해줌.
            if (i !== j && i % j === 0) {  //나누었을때 나머지가 0으로 나누어떨어지면 무언가의 배수임. 같은 숫자일때는 나누어지므로 주의. 
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i)
        }
        isPrime = true;
    }
}

// console.time('prime');
// findPrime(min, max);
// console.timeEnd('prime');
// console.log(primes.length)



// 모듈로 제작하여 다른곳에서 식을 사용할 수 있도록 한다.
module.exports = {
    findPrime, primes
};
