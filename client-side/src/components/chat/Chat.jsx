import React, { useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@mui/icons-material";
import axios from "../../helpers/axios";

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  async function handleSendMessage(event) {
    event.preventDefault();
    await axios.post("/api/v1/messages/new", {
      message: input,
      name: "👦",
      timestamp: "⏰",
      received: false,
    });
    setInput("");
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map(({ message, name, timestamp, received }) => {
          return (
            <p className={`chat__message ${!received && "chat__sender"}`}>
              <span className="chat__name">{name}</span>
              {message}
              <span className="chat__timestamp">{timestamp}</span>
            </p>
          );
        })}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={handleSendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
