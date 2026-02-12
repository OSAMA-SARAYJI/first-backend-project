import {User} from '../models/user.model.js';

const registerUser = async (req,res) => {
    try{
        const {username,password,email} = req.body;
        if(!username || !password || !email){
            return res.status(400).json({message:"All fields are required"});
        }
        const existing = await User.findOne({$or:[{username},{email}]});
        if( existing){
            return res.status(400).json({message:"Username or email already exists"});
        }
        const user = new User({username,password,email,loggedIn:false});
        await user.save();
        res.status(201).json({message:"User registered successfully",user:{id:user._id,username:user.username,email:user.email}});
    }
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message});
    }
}

const loginUser = async(req,res) =>{
    try{
        const {email,password}=req.body;
        const user= await User.findOne({email:email});
    if(!user){
        return res.status(400).json({message:"User not found!"});
    }
    // if(user.password !== password){
    //     return res.status(400).json({message:"Invalid password!"});
    // }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid password!"});
    }
    res.status(200).json({message:"Login successful",user:{id:user._id,username:user.username,email:user.email}});
}
catch(error){
    res.status(500).json({message:"Internal server error",error:error.message}); 
}
}

const logoutUser = async(req,res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({
            email:email
        });
        if(!user){
            return res.status(400).json({message:"User not found!"});
        }
        user.loggedIn = false;
        await user.save();
        res.status(200).json({message:"Logged out successfully"});
    } catch(error){
        res.status(500).json({message:"Internal server error",error:error.message});}
    }
export {registerUser,loginUser,logoutUser}