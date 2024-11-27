//OS : 바로 require 가능
const os = require('os')
const path = require('path')



// 서버컴퓨터를 만들때 클라우드에 이런 값을을 지정하기도 한다.


//------------------------------------------------------------

// process : 바로 부르기 가능

// 현재경로
console.log(process.cwd()) 

// pid 현재 process의 id
console.log(process.pid)

//Node의 버전
console.log(process.version)

// cpu architecture. x64 64비트짜리라는거임. 
console.log(process.arch)

// 내 컴퓨터의 운영체제
console.log(process.platform)


//------------------------------------------------------------


// OS 
// cpu architecture. x64 64비트짜리라는거임. 
console.log(os.arch())
// 운영체제
console.log(os.platform())
console.log(os.type())
// 시스템 호스트이름
console.log(os.hostname())
// cpu 정보
console.log(os.cpus())
// 사용가능 메모리 정보 : 바이트기준 용량표기. / 나누기적용 : 기가바이트
console.log(os.freemem() / (1000*1000*1000))
// 총 메모리 ( ram + cpu )
console.log(os.totalmem() / (1000*1000*1000))


//------------------------------------------------------------

//경로상의 directory 부분 반환
console.log(path.dirname('C:/Users/projects/Nodejs/index.js')) //해당 파일의 폴더경로
// 확장자
console.log(path.extname('C:/Users/projects/Nodejs/index.js')) 
console.log(path.basename('C:/Users/projects/Nodejs/index.js', '.js')) // 두번째 인수 : 제거할 확장자

// 인수 순서대로 경로짜줌
console.log(path.join('user', 'project', 'func.js')) // 상대경로의 path를 만들 때 사용
console.log(path.resolve('user', 'project', 'func.js')) // 현재위치부터의 절대경로를 만들때 사용. 루트 뒤로 붙여준다. 