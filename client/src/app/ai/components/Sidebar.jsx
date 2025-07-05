import React, { useState } from "react";
import styles from "./ChatPage.module.css";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const chats = ["Trip to Paris", "Explore Armenia", "Beach ideas"];

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logoText}>Travel With Me</h2>
      <input
        className={styles.searchInput}
        placeholder="Search chats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className={styles.newChatBtn}>+ New Chat</button>
      <div className={styles.chatList}>
        {chats
          .filter((c) => c.toLowerCase().includes(search.toLowerCase()))
          .map((chat, i) => (
            <div key={i} className={styles.chatItem}>
              {chat}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
