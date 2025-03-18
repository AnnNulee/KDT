const Chat = require("../models/Chat");

// 사용자의 채팅 기록 조회
const getChatHistory = async(req, res) => {
    const {userid} = req.params;
    try {
        const chat = await Chat.findOne({userid});
        res.status(200).json(chat ? chat.messages : []);
    } catch(err) {
        res.status(500).json({error:"사용자의 채팅 기록 조회 Server Error"});
    }
};




// 서버에서 메세지 전송
const sendMessageFromServer = async(req, res) => {
    const {userid, message} = req.body;
    try{
        req.io.to(userid).emit("receive-message", {sender :userid, message } ); 
        await Chat.findOneAndUpdate(
            {userid},
            {$push : {messages : {sender : userid, message, timestamp : new Date()}}},
            {upsert: true, new : true}, //없으면 만들라는 말인데 여기서는 아이가 무조건 채팅을 보내야하므로 없을리가 없긴 함
        );
        res.status(200).json({success: true, message: "메시지 전송 성공"});
    } catch(err){
        res.status(500).json({error : " 서버에서 메세지 전송 Server Error"});
    }
};

module.exports = { getChatHistory, sendMessageFromServer};