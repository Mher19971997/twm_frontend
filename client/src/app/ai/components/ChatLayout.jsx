import React from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import styles from "./ChatPage.module.css";

const ChatLayout = () => {
  return (
    <>

      <div className={styles.container}>
        <Sidebar />
        <ChatWindow />
      </div>
    </>
  );
};

export default ChatLayout;
