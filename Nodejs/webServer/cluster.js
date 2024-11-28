const cluster = require('cluster');
const http = require('http');
const os = require('os');


/// 클러스터가 있으면, 서버가 종료되더라도 다른 서버에서 해당 프로세스가 쭉 운영이 된다. 

if (cluster.isMaster) {
    console.log(`마스터 프로세스 : ${process.pid}`)  //메인 프로세스의 아이디. 
    const numCPUs = os.cpus().length //내가 사용하고 있는 내 컴퓨터의 cpu갯수
    
    // CPU 개수만큼 워커를 생산
    for ( let i = 0; i < numCPUs; i ++){
        cluster.fork(); // 클러스터 생산 코드 fork:여러갈래로 나누고 개개의 길을 가다. 
    }
    // 워커가 종료될 때 마다 실행
    cluster.on('exit', (worker, code, signal) => { // exit이라는 이벤트가 들어왔을 때, 
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log(`code : ${code} / signal : ${signal}`);
        // cluster.fork();  // 이 코드 살리면 워커가 하나 종료될 때 마다 새로운 워커를 생성함. 
    });

} else {
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Cluster</h1>');
        res.end('<p>1초마다 워커 종료</p>');

        //워커의 존재를 확인하기 위한 3초단위 프로세스 강제종료
        setTimeout(() => {
            process.exit(1);    // 1번 프로세스 종료
        }, 1000);
    }).listen(8080);
    console.log(`${process.pid} 워커 실행`)
}