import axios from "axios";

//카카오 토큰 발급받는 코드
export const getKakaoToken = async (code) => {
    const data = {
        grant_type : "authorization_code",
        client_id : "da2f0a7ee9633a0c036283a7a5b7dbb8", //REST api Key
        redirect_uri : "http://localhost:8080/login",
        code: code,  // 카카오에서 들어오는 인가 코드 위치
    };

    // 쿼리스트링 : get 요청을 보내는 상세주고, querystring을 짜줘야함
    const queryString = Object.keys(data) //위 data object의 key들을 빼서 mapping
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
    console.log(queryString);
    //해당 url로 만들어낸 queryString과 헤더즈를 post로 쏴준다. 그럼 발급가능 
    return axios.post("https://kauth.kakao.com/oauth/token", queryString, {  // 리턴으로 어떤 데이터를 받을 것. 
        headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
    });
};


export const getKakaoUserInfo = async () => {
    return window.Kakao.API.request({
        url: "/v2/user/me",
    });
};


