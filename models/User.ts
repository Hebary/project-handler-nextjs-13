import mongoose, { Model, model, Schema } from "mongoose";
import { User } from "../interfaces";

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token:{ type:String},
    confirmed:{ type:Boolean, default:true },  
},{
    timestamps: true
});


const User: Model<User> = mongoose.models.User || model<User>('User', userSchema);

export default User;