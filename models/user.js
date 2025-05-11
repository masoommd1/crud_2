
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        stats: {
            type:String,
            enum:['active','inactive'],
            default:'active'
        }

    }
,{timestamps:true})

module.exports = mongoose.model('User',userSchema);




// users{
//     id username email and password , status (enom:active and inactive)
// }

//     operation:register ,login user select by id , select all ,update and delete
