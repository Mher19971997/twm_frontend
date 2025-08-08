"use client";

import MessagesSect from "@/components/messagesSect/MessagesSect";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import { LinksHead } from "@/constants/linksHead";

export default function MessagesComponent() {
  return (
    <>
      <HeaderAccount LinksHead={LinksHead} />
      <MessagesSect />
    </>
  );
}
