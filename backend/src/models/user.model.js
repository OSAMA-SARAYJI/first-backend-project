import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true, // Remove leading and trailing whitespace
        minLenght: 1,
        maxLenght:20
    },
    password:{
        type:String,
        required:true,
        minLenght: 6,
        maxLenght: 20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
},
{timestamps:true}
)

userSchema.pre("save", async function(next){
    if (!this.isModified("password"))
        return next;
    this.password = await bcrypt.hash(this.password,10);
    next;
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

export const User = mongoose.model("User", userSchema)

    