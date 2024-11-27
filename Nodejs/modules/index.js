
// javaScript의 방식
// import var from './varExport'



//------------------------------------------------------------

//node의 방식

const Name = require('./varExport')   // const 변수값이 뭐던, exports 값이 하나뿐이라면 그 값을 그대로 받는다. 받아주는 const 변수이름과 export 변수이름와 반드시 같을 이유는 없음

// console.log(Name) // 전체 모듈 값 
// console.log(Name.oddKey)  // 모듈 내 키값 불러오기



// 키값을 아예 구조분의 할당으로 불러와서 
const {oddKey, even} = require('./varExport')

//바로 키값으로 사용 가능
console.log(oddKey)
console.log(even)


//------------------------------------------------------------


const func = require('./func')

console.log(func(3))