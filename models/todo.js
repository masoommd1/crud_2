const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    status: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending'
    }

},{timestamps:true});

module.exports = mongoose.model('Todo',todoSchema);

// / todo {
    //     id,title,describtion,status(enum"pendin or done)
    //     operation
    //     create update delete select update status get todo by id
    // }
    




// const userSchema = new mongoose.Schema({
//     title:{
//         username:{
//             type:String,
//             required:true
//         },
//         email:{
//             type:String,
//             required:true
//         },
//         password:{
//             type:String,
//             required:true
//         },
//         stats: {
//             type:String,
//             enum:['active','inactive'],
//             default:'active'
//         }

//     }
// },{timestamps:true})

// module.exports = mongoose.model('User',userSchema);




// users{
//     id username email and password , status (enom:active and inactive)
// }

//     operation:register ,login user select by id , select all ,update and delete
