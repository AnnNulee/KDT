const express = require('express');
const router = express.Router();

let todos = [
    {id: 1, title: '연애하기', done: false},
    {id: 2, title: '금연하기', done: false},
    {id: 3, title: '온천가기', done: false},
    {id: 4, title: '24시간 잠자기', done: true},
]

router.get('/', (req, res)=>{
    console.log('전송 완료')
    console.log(todos)
    res.json(todos)
})

router.post('/', (req, res) => {
    const newId = todos[todos.length -1].id + 1
    const newTitle = req.body.reqTitle 
    // req줄때, 전송한 데이터는 body라는 (데이터 보관함이라 생각해) 곳에 들어간다. 거기서 꺼내쓰기. 파싱된 데이터중에서 타이틀만 가져오겠다. 
    todos.push({id:newId, title: newTitle, done: false})
    console.log(`${newId}의 todo가 추가되었습니다.`)
    res.json(todos);   
})

router.put('/:id', (req, res)=>{
    const {id} = req.params
    // todos = todos.map(todo=> todo.id == id ? { ...todo, ...req.body} : todo) : todo object 뒤에 req.body (done)을 붙여줌. 그럼 done키의 value가 덮어씌워진다. 
    todos = todos.map(todo=> todo.id == id ? {id:id, title:todo.title, done: req.body.done} : todo)
    //for문은 효율적이지 않다. 각각의 요소에다가 함수든 메서드를 적용하고싶을 때 적용하는게 map. 실제 for문보다 가볍다.
    // .map은 array의 함수. 
    res.end()
    console.log('Todo Done 업데이트 완료')
    console.log(todos)
})

// 메소드와 경로가 같은게 두개있으면 실행안되면, 새로운 경로를 만들어준다.
router.put('/edit/:id', (req, res) => {
    const {id} = req.params //  edit까지 params로 받아온거에서 'id' key의 value만 가져온다
    todos = todos.map(todo => todo.id == id ? {id:id, title: req.body.title, done: todo.done} : todo)
//map, todos 에 4개의 요소가 있는데, 여기에있는 id를 찾아야하는데 , 하나씩 가서 각각의 id를 확인해서 매칭하려고. 
// 여기서 todo는 한 줄, todo의 id가 req에서 가져온 id.  같으면 id는 그대로, title은 내가 req에서 받은 title로 변경하고, done은 todo의 done 그대로. 
    res.json(todos); //우리가 보내는 todos는 qodufrkqt. 
    console.log(todos)
})

router.delete('/:id', (req, res) => {
    const {id} = req.params
    todos = todos.filter(todo => todo.id != id)
    res.json(todos)
    console.log(todos)
})

module.exports = router;