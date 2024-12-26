const dotenv = require('dotenv')
const express = require('express')
const expressSession = require('express-session')
const morgan = require('morgan')

// localhost:3000/
const indexRouter = require('./routes'); 
// localhost:3000/users'
const userRouter = require('./routes/users'); 
// localhost:3000/products'
const commentRouter = require('./routes/products');

const {sequelize} = require('./models')

const app = express();

app.set('port',process.env.PORT || 3000)

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',indexRouter)
app.use('/products',roiductsRouter)




app.use((req,res,next)=>{
    res.status(404).send(`${req.method}  ${req.url} 라우터 없음`);
})

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    console.error(err);
    res.status(status).json({error : err.message})
})

app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')} 번 포트에서 서버 실행중`)
})
