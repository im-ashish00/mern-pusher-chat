import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import axios from "./helpers/axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  async function getAllMessages() {
    try {
      const response = await axios.get("/api/v1/messages/sync");
      const messages = response.data;
      setMessages(messages);
    } catch (err) {
      console.log(`Error while fetching messages!!`);
    }
  }

  console.log(messages);

  useEffect(() => {
    getAllMessages();
  }, []);

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage]);
    });
  }, []);

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
