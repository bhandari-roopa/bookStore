const mongoose = require('mongoose');

const userSchema= new mongoose.Schema(
    {
        userName : {type : String , required :true},
        userPassword :{ type :String, required: true}
    },
    {
        timestamps:true
    }
)

const User = mongoose.model("users",userSchema);

module.exports = User;