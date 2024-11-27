
const VarM = require('./varExport')

function checkedOdd(num) {
    if (num % 2){
        return VarM.oddKey
    } else {
        return VarM.even
    }
}

module.exports = checkedOdd;  // checkedOdd() 라고 하면 함수가 아니라 함수실행값임. 