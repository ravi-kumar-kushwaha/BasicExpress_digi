import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
//middleware
app.use(express.json());

const users = [];
let Id = 1;
//Create User
app.post("/users", (req, res) => {
    const {name , email, password} = req.body;
    const newUsers = {
        id:Id++,
        // ...req.body
        name , email, password
    };
    users.push(newUsers);
    res.status(201).json({data:newUsers,
        message:"User Created Successfully"});
});

//Get All Users
app.get("/users", (req, res) => {
    res.status(200).json({data:users,
        message:"Users Fetched Successfully"});
});
//Get Single User
app.get("/users/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((user) => user.id == id);
    if(!user){
        return res.status(404).json({message:"User Not Found"});
    }
    res.status(200).json({data:user,
        message:"User Fetched Successfully"});
});
//update User
app.put("/users/:id",(req,res)=>{
    const {name , email, password} = req.body;
    const index = users.findIndex((user) => user.id === parseInt(req.params.id));
    if(index === -1){
        return res.status(404).json({message:"User Not Found"});
    }
    users[index] = {
        ...users[index],
        // ...req.body
        name , email, password
    }
    res.status(200).json({data:users[index],
        message:"User Updated Successfully"});
});
//Delete User
app.delete("/users/:id", (req, res) => {
    const index = users.findIndex((user) => user.id === parseInt(req.params.id));
    if(index === -1){
        return res.status(404).json({message:"User Not Found"});
    }
    users.splice(index,1);
    res.status(200).json({message:"User Deleted Successfully"});
})
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});