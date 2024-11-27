//buffer 바이너리, 2진 데이터 처리에 유용, 작은 데이터 한번에 전달하기 유리. 


const buffer = Buffer.from('Hello World')  // Buffer.from 하면 해당 문자를 buffer로 만드는 것을 뜻한다. 

console.log(buffer) // buffer의 내용 출력
console.log(buffer.length) // buffer의 길이 출력
console.log(buffer.toString()) // buffer를 문자열로 변환



/// 여러 버퍼 합치기
const arr = [Buffer.from('나보기가'), Buffer.from('역겨워 가실때에는'), Buffer.from('말없이 고이 보내드리오리다')]
const bufferJin = Buffer.concat(arr)

console.log(bufferJin.toString())


/// 고정크기의 버퍼


const buffer3 = Buffer.alloc(5)  // 5byte짜리로 크기를 고정해준 buffer. 
console.log(buffer3)