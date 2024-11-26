

        // 멀티 쓰레딩. 병렬처리 

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// workers_threads 는 object형태 { key : value }로 있다. 
// 하지만 '구조분의 할당' 형식으로 key값을 위처럼 불러다놓으면, 바로 key값으로 불러오는것이 가능하다. 

// Worker : 새로운 worker thread를 생성
// isMainThread : 현재 우리가 사용하는 thread가 메인 thread인지 확인(true/false)
// parentPort : 메인 thread와 다른 worker thread의 연결을 위해 사용. worker들이 main에게 데이터를 보낼 때 사용
// workerData : 메인 thread에서 worker로 전달되는 데이터 저장

let { findPrime, primes } = require('./prime') 
// 파일 불러올 때 불러올 때 한번 실행시킨다. 그럼 그곳에서 정의된 변수들이 적용됨. 
// 적용시키기 싫으면 주석처리 해주던가 해야한다. 

findPrime(2,1000)
console.log(primes.length)


        // 멀티쓰레드
// 작업을 나누는 작업을 먼저 . Main 스레드와 worker스레드로 나뉜다. 
// 메인스레드는 관리자 역할. 업무를 분산해주고 병합하는 역할을 한다.
// 작업이 4분할되면, workers 4개가 필요하고 작업을 분할하고 병합하는 관리자 가 하나. 총 5개가 필요함.

if (isMainThread) {
    // prime에 들어갈 숫자값
    const max = 20_000_000;
    const min = 2;
    
    //worker thread 갯수. 본래 single thread로 동작하고있던 thread가 Main이 되고, 이 작업으로 worker thread 를 끌고오는 것. 
    const threadCount = 6; // Main까지 하면 총 7개

    // Set (js 내장객체 : 집합. 중복허용하지 않는 배열) 객체 생성
    // worker thread를 고나리하고 추적하기 위한 객체 
    // 각각의 worker들의 역할을 넣을 공간. 관리 저장소. 
    const threads = new Set();

    //작업 분배 (floor : 소숫점 자리 내림)
    const range = Math.floor((max-min) / threadCount);

    // 시작값 초기화
    let start = min;

    // 반복문 돌기 전에 한번 시간을 콘솔에 찍어보자. 멀티스레드가 얼마나 빠른지 확인해보자
    console.time('prime');


        /// 반복문 시작

    // worker 마다 해야하는 일을 배당. 
    for (let i=0; i <threadCount; i++) {
        // 첫 worker가 작업을 시작해야 하는 시작점
        const wStart = start;
    //worker 생성구간
        // ( 실행중인 스크립트, { worker에게 줄 데이터 : {인수 적용}})
        // {worker 1 : thread의 스크립트 / 작업범위}
        // 원래 node의 멀티 쓰레딩은 독립된 싱글 스레드를 모아서 일을 시키는거다보니, filename 처럼 여러 쓰레드를 한번에 포함하는 파일을 만들어주어 정의를 해줘야 한다. 
        threads.add(new Worker(__filename, {workerData: {start: wStart, range}}));
        // 다음 worker의 시작 숫자 
        start += range;
    }

    //이벤트 핸들러
    // 각 워커들에게 이벤트가 발생했을 때 어떻게 처리해줄까?
    for (let worker of threads) {
        // on : 이벤트 리스너같은 역할. 
        // 'error'가 들어오면, 다음을 수행.
        worker.on('error', (e) => {
            throw e; // 워커에서 에러 발생 시 프로그램 종료
        });

    // 각 worker들의 일이 끝나면 worker를 삭제. 
        worker.on('exit', () => { 
            threads.delete(worker); 
            if (threads.size === 0) { // 모든 워커가 종료된 상태
                console.timeEnd('prime'); // 그 시간 측정
                console.log(primes.length); //소수의 개수
            }
        });
        worker.on('message', (msg) => {
    // 워커가 전달한 소수 배열을 메인 스레드 배열에 합산
            // concat : 배열 병합. workers 들이 각 배열(msg)를 primes에 보낸다.
            primes = primes.concat(msg) 
        });
    }




} else { // 메인 쓰레드가 아닌, 각 워커들이 할 일
    findPrime(workerData.start, workerData.range);
    parentPort.postMessage(primes); 

}