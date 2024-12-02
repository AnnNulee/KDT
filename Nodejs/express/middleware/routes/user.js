const express = require('express')
const router = express.Router();
// 라우터 모듈 불러오기


/// router 오버라이딩 시작 

router.get('/', (req, res) => {
    res.send('Welcome User')
})

router.get('/:id/video', function(req, res) { 
    // 슬러쉬 뒤, /vidio 앞에 오는 값은 모두 id로 처리하겠다. 와일드카드 개념.
    // req.params : param은 /슬러쉬 뒤에 있는 것. 여기서는 id값을 가져온다. 
    // req.query : url에서 '?; 이후 query값을 가져온다. 
	console.log(req.params, req.query);
    res.send("Hello user");
});



// 우리가 이 파일에서 수정한 router를 export 한다. 
module.exports = router; 