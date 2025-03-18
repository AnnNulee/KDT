require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io"); // chatting server 실시간 채팅을 구현
const cors = require("cors");
const connectDB = require("./config/db"); //  MongoDB 연결
const chatRoutes = require("./routes/chatRoutes"); // chat 라우터
const Chat = require("./models/Chat"); // 모델을 사용해 MongoDB에서 채팅 데이터 저장/조회
const morgan = require("morgan");




connectDB(); // MongoDB 연결

const app = express(); // 서버생성
const server = http.createServer(app); // HTTP서버 생성
const io = new Server(server, {cors : {origin:"*"}}); // socket.io 서버생성/ 모든 요청에 대해 코스설정

//미들웨어 설정
app.use(cors());
app.use(express.json()); // json 파서 ***() 괄호 꼭넣기***
app.use(morgan("dev")); // 요청과 응답에 대한 정보를 콘솔에 기록 (morgan)



// Socket.io 인스턴스를 Express 요청 객체(req)에 추가 
// 얘는 http가 아님. 다른 프로토콜이라 get, post 이런 api를 못해. 그래서 그걸 수동으로 집어넣어줘야함
// express는 req, res가 있는데 io는그런형식이 아니라서 일부러 만들어주는거임
app.use((req, res, next) => { 
    req.io = io; // 위에 정의한 socket.io의 server 객체를 req에 넣어줌
    next();
});


//디버깅
app.use((req, res, next) => {
    console.log(`🔍 API 요청 감지됨: ${req.method} ${req.url}`);
    next();
});

//router
app.use("/chat", chatRoutes); // 라우터 여기서 받아다가 chatRoutes에서 분리해줌


//websocket
io.on("connection", (socket) => { // io.on"connection" : 클라이언트가 WebSocket을 통해 서버에 연결되면, 이 이벤트가 자동으로 트리거되어 실행
    const userid = socket.handshake.query.userid;
    socket.join(userid); // 룸 id
    console.log(`✅ User connected: ${userid}`);
  
    socket.on("send-messages", async (messages) => {
      io.to(userid).emit("receive-messages", { sender: userid, messages });  // sender : 유저아이디
  
      // MongoDB에 저장
      await Chat.findOneAndUpdate(
        { userid }, // 룸 id
        { $push: { messages: { sender: userid, messages, timestamp: new Date() } } }, // sender : 유저아이디
        { upsert: true, new: true }
      );
    });
  
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${userid}`);
    });
  });

  
// 리슨
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {console.log(`서버 ${PORT}번 포트에서 가동중`)});















// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const chatRoutes = require("./routes/chatRoutes");
// const Chat = require("./models/Chat");
// const morgan = require("morgan");

// connectDB(); //mongodb connection

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server,{
//     cors:{origin:"*"}
// });

// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));

// app.use((req,res,next)=>{ //socket통신은 http가 아니기 때문에 이것처럼 핸들러를 만들어줘야함. 지금은 http 처럼 사용할 수 있도록 요청을 잡아주는 코드.
//     req.io = io;
//     next();
// });


// app.use((req, res, next) => {
//     console.log(`🔍 API 요청 감지됨: ${req.method} ${req.url}`);
//     next();
// });

// //router
// app.use("/chat",chatRoutes);

// //socket
// io.on("connection", (socket) => {//우리같은 경우는 (socket,type) 이런식으로 받아와 아이채팅과 성인 채팅을 구분해 로직을 짜면 될 것 같음.
//     //우리는 userID랑 AnalysisID를 받아와야함.
//     const userId = socket.handshake.query.userId;
//     socket.join(userId); //우린 join에 analysisID를 넣어서 채팅방 구분
//     console.log(`✅ User connected: ${userId}`);
  
//     socket.on("send-message", async (message) => {
//       io.to(userId).emit("receive-message", { sender: userId, message });
  
//       // MongoDB에 저장
//       await Chat.findOneAndUpdate(
//         { userId },//여기도 analysisID를 넣어줘야함.
//         { $push: { messages: { sender: userId, message, timestamp: new Date() } } },
//         { upsert: true, new: true }
//       );
//     });
  
//     socket.on("disconnect", () => {
//       console.log(`❌ User disconnected: ${userId}`);
//     });
//   });


//   const PORT = process.env.PORT || 5000;
//   server.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`);
//   })