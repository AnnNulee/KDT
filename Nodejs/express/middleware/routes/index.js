const express = require('express')
const router = express.Router();


//원래는 서버(app)에서 get을 호출. 근데 express에서 router라는 애를 꺼내 쓰는 것.

router.get('/', (req, res) => {
    res.send('Hello World')
})


module.exports = router;