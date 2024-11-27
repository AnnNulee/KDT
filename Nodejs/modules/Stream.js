const fs = require('fs');
const { writer } = require('repl');

// // chunk.txt 를 16byte로 쪼개서 받겠다. 
// const readStream = fs.createReadStream('./chunks.txt', {highWaterMark:16}) 
// // highWarterMark 스트리밍이 한번에 읽어오는 byte 크기
// // 여기에 data 받겠다
// const data = []

// readStream.on('data', (chunk) => {  // on은 이벤트리스너라고 생각하면 됨. 여기서는 data가 들어왔을 때. 
//     data.push(chunk);
//     console.log('data :', chunk.toString(), chunk.length)
    
// });

// readStream.on('end', ()=> { // '스트리밍이 끝나면'
//     // 모든 데이터를 합쳐서 뿌려주겠다. 
//     console.log('end :', Buffer.concat(data).toString())
// });

// readStream.on('error', (err) => {
//     console.log('error :', err)
// });



//-------------------------------------------------------------


// 파일 생성
// const writeStream = fs.createWriteStream('./진달래꽃.txt')
// writeStream.on('finish', () => {
//     console.log('파일 쓰기 완료')
// })

// // 스트림 방식으로 파일 생성하기. 

// writeStream.write('나보기가 역겨워 가실때에는 \n')
// writeStream.write('말없이 고이 보내 드리오리다.\n')
// writeStream.write('영변의 약산 진달래꽃\n')
// writeStream.write('아름 따다 가실 길에 뿌리오리다.\n')
// writeStream.end() // 맨 마지막 end 붙이면 여기서 파일에 데이터 저장. 



// 임시메모리의 크기는 보통 1G. 버퍼는 이 용량이 넘으면 넘친다. streaming은 그럴일이 없다. 

//-------------------------------------------------------------

const readStream = fs.createReadStream('./진달래꽃.txt');
const writeStream = fs.createWriteStream('./Jin.txt')

readStream.pipe(writeStream) 
//진달래꽃에 있는거 읽어들여서 Jin을 만들어 넣어라. 