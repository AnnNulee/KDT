const express = require('express');
const router = express.Router();
const { getChatHistory, sendMessageFromServer } = require("../controllers/chatController"); // 컨트롤러
const Chat = require("../models/Chat.js");

//채팅방 목록 조회
router.get("/rooms", async (req, res) => {
    try {
      console.log("✅ API 호출됨: /chat-rooms");
  
      const chats = await Chat.find({}).lean();
      console.log("✅ DB에서 조회된 전체 데이터:", chats);
  
      if (!chats.length) {
        console.log("❌ MongoDB에서 데이터를 찾을 수 없음.");
      }
  
      const userids = chats.map(chat => chat.userid);
      console.log("✅ 추출된 userid 목록:", userids);
  
      const chatRooms = [...new Set(userids)];
      console.log("✅ 중복 제거된 채팅 목록:", chatRooms);
  
      res.json(chatRooms);
    } catch (err) {
      console.error("❌ Error fetching chat rooms:", err);
      res.status(500).json({ error: "Server error" });
    }
});

router.get("/:userid", getChatHistory); // 해당 라우터로 들어오면, 두번째 인수인 컨트롤러를 실행

router.post("/send-message", sendMessageFromServer);

module.exports = router;