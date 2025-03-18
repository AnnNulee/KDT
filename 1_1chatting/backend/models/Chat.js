// MongoDB에 저장될 데이터 구조 정의
const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    userid : {type : String, required : true}, // 룸 아이디. socket.join에 사용되어야 함으로 반드시 필요
    messages: [{
            sender: {type : String},
            message : {type : String},
            timestamp : {type : Date, default: Date.now()},
    }] 
},{timestamps : true});

module.exports = mongoose.model("Chat", ChatSchema); // export 아니고...exports

