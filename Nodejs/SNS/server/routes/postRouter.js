const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isLoggedIn } = require('../middleware');
const { afterUploadImage, Uploadpost, updatePost, deletePost } = require('../controllers/post');


const router = express.Router();

try{// 'uploads'라는 폴더가 있어? 물어보기. 
    fs.readdirSync('uploads'); 
    // 여기서 없으면 error나서 catch로 간다. 
}catch (err){
    console.error('uploads 폴더가 없다. 폴더를 생성하겠다.');
    fs.mkdirSync('uploads') // 'uploads' 폴더 생성
}


// 파일 업로드 미들웨어 multer
const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, cb) { // 저장위치는?
            cb(null, 'uploads/'); 
        },
        filename(req, file, cb) { // 파일이름은?
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits : {filesize : 5 *1024*1024} // 5mb
})

// 1. 이미지 + 게시글 저장
// post/img
    // 로그인 되어있는지 확인 하는 미들웨어 isLoggedIn 불러오기
    // upload 라는 미들웨어를 multer를 사용하여 만들 것.
    // controller로는 afterUploadImage 
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);


// post/
const upload2 = multer() 
router.post('/', isLoggedIn, upload2.none(), Uploadpost);

//post/update
router.post('/update/:postId', isLoggedIn, upload2.none(),  updatePost);

//post/delete
router.delete('/delete/:postId', isLoggedIn, deletePost);


module.exports = router;