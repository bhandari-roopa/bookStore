const mongoose =require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({
    title:{type : String , required: true},
    description :{ type : String , required: true},
    user: { type: ObjectId, required: true },
},{
    timestamps : true
})

const Book = mongoose.model("books", bookSchema);

module.exports =Book;
