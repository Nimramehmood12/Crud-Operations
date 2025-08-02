const mongoose =require("mongoose");
const UserSchema =new mongoose.Schema({
    name: {
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
    },
})

const UserModel=mongoose.model("users",UserSchema)

module.exports=UserModel;