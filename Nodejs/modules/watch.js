const fs = require('fs')

fs.watch('./Jin.txt', (eventType, filename) => {
    console.log(eventType, filename) // 여기서 파일이름은 Jin.txt
})