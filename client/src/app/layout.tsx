import type { Metadata } from "next";
import "../styles/globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";
import NavigateAi from "@/components/AiButton";

export const metadata: Metadata = {
  title: "Travel With Me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <NavigateAi />

          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
