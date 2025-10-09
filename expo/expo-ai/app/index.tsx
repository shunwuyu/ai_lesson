import React from "react";
import { renderRoot } from "@/actions/render-root";
import { ChatContainer } from "@/components/chat-container";
import { AnimatedLogo } from "@/components/animated-logo";

export default function Index() {
  return <React.Suspense fallback={<Loading />}>{renderRoot()}</React.Suspense>;
}

function Loading() {
  return (
    <ChatContainer
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <></>
      {/* <AnimatedLogo /> */}
    </ChatContainer>
  )
}