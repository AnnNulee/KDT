const mongoose = require('mongoose')


const hashtagSchema = mongoose.Schema({
    title : {
        type : String,
        unique : true,
        required : true,
        maxlength: 20,
    },
    //post : {} // post를 연동하고싶겠지만, 그냥 hastag로 검색하면 된다. 
}, {
    timestamps : true, 
})

const Hashtag = mongoose.model('Hashtag', hashtagSchema);
module.exports = Hashtag;