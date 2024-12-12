const express = require("express");
const router = express.Router();

//  http://localhost:3000
router.get('/', (req, res, next )=> {
    res.end('연결 성공')
})

module.exports = router;