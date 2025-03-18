const mongoose = require('mongoose');
require('dotenv').config(); // DB URI

// MongoDB 연결 함수
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // 몽고DB 드라이브 설정 (최신) 
            useUnifiedTopology:true, // 
        })
        console.log("MongoDB Connected Success");
    } catch (err) {
        console.error("MongoDB Can not Connect", err );
        process.exit(1); // 프로세스 강제종료. 없으면 계속 시도함. 
    }
};

module.exports = connectDB;