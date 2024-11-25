const min = 2 // 시작숫자
const max = 10_000_000 // 끝 숫자
const primes = []

function findPrime(start, range) {
    let isPrime = true; // 모든것을 소수라고 가정하고 시작. 아니면 false로 변함
    const end = start + range;
    for (let i = start; i < end; i++) {  // 소수의 후보 탐색
        for (let j = min; j < Math.sqrt(end); j++) { // 해당값이 소수인지 판단하는 영역 // sqrt : 루트값. 
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

console.time('prime');
findPrime(min, max);
console.timeEnd('prime');
console.log(primes.length)

