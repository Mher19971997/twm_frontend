"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import { LinksHead } from "@/constants/linksHead";
const ChatPage = () => {
  return (
    <>
      <HeaderAccount LinksHead={LinksHead} />
      <div className={styles.container}>
        <Sidebar />
        <ChatWindow />
      </div>
    </>
  );
};

export default ChatPage;
