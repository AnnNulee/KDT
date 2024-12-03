const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// multer
const storage = multer.diskStorage({
    destination : './uploads/',
    filename : (req, res, cb) => {
        cb(null, `${Date.now()}-${res.originalname}`)
    }
})

const upload = multer({storage})

///-------------------multer 공부--------------------

// //변수선언 : 미들웨어 위에서 해주는게 좋다.
// // 저장경로와 파일 이름 정해주는 변수
// const storage = multer.diskStorage({ // 저장위치 설정. 서버메모리 / 하드디스크 / 클라우드 s3, gcp 구글스토리지. 선택가능. 이건 하드디스크
//     destination: (req, file, cb) => {  // 파일 저장경로. 요청과 파일이 들어오면, 어떤 곳에 저장(콜백)할거냐?
//         cb(null, 'uploads/') // 업로드 경로, 실제 파일경로
//     },
//     filename: (req, file, cb) => { 
//         // 파일이름이 같으면 덮어쓰기가 되기때문에, filename은 unique값이어야 한다. 기존 filename은 client가 주는것이기 때문에 변경시켜줘야함
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)) // originalname : 파일 전체이름 / fieldnme : 파일이름 /  extname : 확장자
//     }
// });

// const upload = multer({ // 멀터 자체가 미들웨어가 아니다. 멀터 안에있는 함수가 미들웨어임. 
//     storage: storage, 
//     limits : {fileSize : 1024*1024*5}, //파일 크기 제한.  5메가 이상 안됨 // limit : multer 내의 속성
// })
// // 들어오는 파일을 어디에 어떻게 저장하는지 변수로 설정해주는데,  경로-이름과 limit은 왜 따로 설정하는가?   : 함숙 ㅏ이렇게 만들어짐

///-------------------multer 공부--------------------


router.post('/upload', upload.single('image'), (req, res) => {
    // 받은 req에서 어떤 값을 어떻게 파싱할거냐. 생각을 해봐야함
    const imageUrl = `/uploads/${req.file.filename}`  // 파일경로
    res.json({imageUrl}) // 리퀘스트 보낼때의 데이터 형식
    console.log(imageUrl)
})


router.get('/', (req, res) => {
    const dirPath = path.join(__dirname, '../uploads'); 
    fs.readdir(dirPath, (err, files) => {  // uploads 내에 있는 file 전체 검색, '파일 이름만' 배열 형태로 가져온다. 
        if (err) { // 에러처리
            return res.status(500).json({error: '디렉토리 없음'})
        }
        const imageUrls =files.map(file => `/server/uploads/${file}`)  // img의 url들을 업로드 밑의 ~파일 식으로 변환
        res.json(imageUrls) // url를 json 형태로 수정. 
    })
}) 


module.exports = router;