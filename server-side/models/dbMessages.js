import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});
// mongoose makes the collection name lower case & plural
const chatModel = mongoose.model("messagecontents", chatSchema);

export default chatModel;
