const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/todo");
const User = require("./models/user");

const app = express();


// middleware for handling json data coming from httpie or postman
app.use(express.json());

// creating a conection 

async function dbconnect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/");
        console.log("database connected");
    } catch (error) {
        console.error(error)
    }
}

app.listen(3000 ,()=> {
    dbconnect();
    console.log("server started");
    
})



//  checking routing

// app.get('/',(req,res)=>{
    //     res.send("hello from node server");
    // })
    
    
    // todo list create 

    app.post("/todo/create",async (req,res)=>{
        try {
            const  todo = await  Todo.create(req.body);

            res.status(200).json({msg:"todo list creted",todo});


        } catch (error) {
            res.status(500).json({msg:"todo creation failed",error:error.message});
        }
    })


    // get todo  list 

    app.get("/Todo/list",async(req,res)=>{
        try {
            const todolist = await Todo.find();
            res.status(200).json(todolist)
        } catch (err) {
            res.status(500).json({msg:"failed to get todo list"})
        }
    })


    // update or put todo list 

    app.put("/todo/update/:id",async(req,res)=>{

        const{id} = req.params;
        const update = req.body;

        try {
            const todolistUpdate = await Todo.findByIdAndUpdate(id,update);

            if(!todolistUpdate){
                return res.status(404).json({msg:"product not found"})
            }

            res.json(todolistUpdate);

        } catch (error) {
            res.status(500).json({msg:"failed to update",error:error.message});
        }
    })


    // delete todo 

    app.delete("/todo/delete/:id", async(req,res)=>{

        const {id} = req.params;
        try { 
            const deleteTodo = await Todo.findByIdAndDelete(id);

            if(!deleteTodo){
                return res.status(404).json({message:"todo list not found"});
            }
             
            res.json({message:'todo list deleted succesfully',Todo:deleteTodo });


        } catch (error) {
            res.status(500).json({msg:'can not delete todo list',error:error.message});
        }
    })


    //  user  creating of post
    app.post('/create/user', async (req,res)=>{

        const {usernaem,email,password,stats} = req.body
        try {
            const user = await  User.create(req.body);
            res.status(200).json({msg:'user created succesfully',user})
            // console.log(req.body);


        } catch (error) {
            res.status(500).json({msg:"cant create user",error:error.message});
        }
    })

    // getting user data

app.get("/get/users", async(req,res)=>{
    try {
        const user = await User.find();
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({msg:"cannot get users ",error:error.message});
    }
})

//updaing user 

app.put("/update/user/:id", async(req,res)=>{

        const {id} = req.params;
        const update = req.body;

   
    try {
        const updateUser = await User.findByIdAndUpdate(id,update);
        
        if(!updateUser)
        {
            return res.status(400).json({msg:'cannot find users ',})
        }
        res.json(updateUser);
    } catch (error) {
        res.status(500).json({msg:'cannot update file',error:error.message});
    }
})


// deleting user 

app.delete('/delete/user/:id',async(req,res)=>{

    const {id} = req.params;

    try {
     const deleteUser = await User.findByIdAndDelete(id);
     
     if(!deleteUser){
       return res.status(404).json({msg:'user not found'});
     }
     res.status(200).json({msg:'user deleted succesfully'});

    } catch (error) {
        res.status(500).json({msg:'can not delete users',error:error.message})
    }
    
})
