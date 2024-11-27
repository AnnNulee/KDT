// module.exports = even  // odd가 위에서 정의되지 않은 상황이라 사용 불가!!!

const odd = '홀수';
const even = '짝수';




//------------------------------------------------------------

//module.exports 는 맨 밑에서 실행
//위에서 정의되고 난 이후에야 사용가능.

// module.exports = odd // 하나 보낼 때.

module.exports = {  /// 보내주고싶은 값은 export 내부에 다!!!!!!!!!!!!!!!!!!!!!!!!!!!넣어줘야한다고!
    oddKey : odd, 
    even  // = even:even /  key의 이름을 value와 같이 하면 이렇게 축약해서 쓸 수 있다.
}
