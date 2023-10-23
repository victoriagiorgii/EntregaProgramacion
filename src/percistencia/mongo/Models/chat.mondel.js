import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const chatCollection = "chat";

const chatSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        unique:true
    },
    message:{
        type:String,
        required:true
    }
});
chatSchema.plugin(mongoosePaginate);

export const chatModel = mongoose.model(chatCollection,chatSchema);