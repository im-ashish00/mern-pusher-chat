import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});
const chatModel = mongoose.model("messageContent", chatSchema);

export default chatModel;
