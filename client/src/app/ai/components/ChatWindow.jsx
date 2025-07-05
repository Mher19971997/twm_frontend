import React, { useState } from "react";
import styles from "./ChatPage.module.css";
import LinearLogo from "../../../../public/assets/svg/LinearLogoHome";
import { useAppDispatch } from "@/redux/types/types";
import { speakWithAi } from "@/redux/actions/aiAction";

const predefinedResponses = [
  {
    keywords: ["բարև", "բարեվ", "hello", "hi"],
    response: "Բարև, ինչպես կարող եմ օգնել ձեր ճամփորդությանը? 🌍",
  },
  {
    keywords: ["հուլիս", "հանգիստ", "ուր գնալ"],
    response:
      "Հուլիսին առաջարկում եմ այցելել ծովափնյա քաղաքներ կամ Հայաստանը։ 🏖️",
  },
  {
    keywords: ["արմենիա", "հայաստան", "armenia"],
    response: "Հայաստանը հայտնի է իր պատմական վայրերով և բնությամբ 🇦🇲",
  },
  {
    keywords: ["օգնիր", "օգնություն", "help"],
    response:
      "Իհարկե, կարող եմ օգնել գտնել լավագույն տուրերը կամ առաջարկել ուղղություններ։✈️",
  },
];

const ChatWindow = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useAppDispatch();

  const getCustomResponse = (text) => {
    const lower = text.toLowerCase();
    for (let item of predefinedResponses) {
      if (item.keywords.some((k) => lower.includes(k))) {
        return item.response;
      }
    }
    return "Կներես, դեռ չեմ հասկացել հարցը, բայց սիրով կսովորեմ 😊";
  };

  const handleSend = async () => {
    // if (!input.trim()) return;

    // const userMessage = { sender: "user", text: input };
    // const aiMessage = { sender: "ai", text: getCustomResponse(input) };

    // setMessages([...messages, userMessage, aiMessage]);
    // setInput("");

    const response = await dispatch(speakWithAi({ text: "barev" }));

    console.log("responseresponseresponse", response)
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
