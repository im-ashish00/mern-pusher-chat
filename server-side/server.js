import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import Pusher from "pusher";
import Messages from "./models/dbMessages.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;
const MONGO_URI = process.env.MONGO_URI;

// It acts like the middleware between mongoDB & our react app to keep messages in sync.
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: process.env.PUSHER_USE_TLS,
});

// Middlewares
app.use(express.json());

app.use(cors());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected!!");
  const collectionName = "messagecontents";
  const changeStream = db.collection(collectionName).watch();

  changeStream.on("change", (change) => {
    console.log(`A change occured in the ${collectionName} collection.`);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;

      pusher.trigger("messages", "inserted", {
        message: messageDetails.message,
        name: messageDetails.name,
        timestamp: messageDetails.timestamp,
      });
    } else {
      console.log("Error triggering Pusher.");
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).send("Hello world!!");
});

app.get("/api/v1/messages/sync", async (req, res) => {
  try {
    const data = await Messages.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/v1/messages/new", async (req, res) => {
  const dbMessage = req.body;

  try {
    const data = await Messages.create(dbMessage);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
