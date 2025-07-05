"use client";

import React, { useState } from "react";
import styles from "./ChatPage.module.css";
import LinearLogo from "../../../../public/assets/svg/LinearLogoHome";
import { useAppDispatch } from "@/redux/types/types";
import { speakWithAi } from "@/redux/actions/aiAction";

const ChatWindow = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useAppDispatch();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    // First add user message
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await dispatch(
        speakWithAi({
          text: input,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNTYzZDdmZTNmZjVlZjYzNWJlOWQ2Y2ZkMmZmYWFkODEyZDg2MDM3Mzc4NWFlOGIxZjYzOWRhYmQ0NTZkYzUyYzlhZTg0NzUiLCJpYXQiOjE3NTE3MTg0NTMsImV4cCI6MTc1MTgwNDg1M30.wel2gZUy5c4QqxAt2nFAdfukXaB4kXLE_lwB-lMGJZc",
        })
      );

      const aiText = response.payload || "Ներողություն, խնդիր տեղի ունեցավ։";
      const aiMessage = { sender: "ai", text: aiText };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "ai",
        text: "Ներողություն, չհաջողվեց կապ հաստատել։ Փորձեք կրկին։",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatContent}>
        {messages.length === 0 ? (
          <div className={styles.logoWrapper}>
            <LinearLogo />
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.sender === "user" ? styles.userMessage : styles.aiMessage
              }
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          placeholder="Write your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
