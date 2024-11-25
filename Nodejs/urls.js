const url = require('url')

const { URL } = url;
const newUrl = new URL('https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=%EB%B9%88%EC%A7%80%EB%85%B8')

console.log(newUrl)

console.log(newUrl.searchParams.getAll('query'))
// 쿼리 등은 유저가 입력한 값일 때, 이런식으로 쿼리 추출(파싱 : 추출할 수 있도록 raw 데이터를 구분 가능하도록 만들어주는 것?)해서 데이터로 만들 수 있다. 