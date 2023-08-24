import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Messages from "./models/dbMessages.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;
const MONGO_URI = process.env.MONGO_URI;

// Middlewares
app.use(express.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
