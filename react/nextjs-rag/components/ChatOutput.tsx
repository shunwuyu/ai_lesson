import { Message } from "ai";
import ReactMarkdown from "react-markdown";

const ChatOutput = ({
  messages,
  status,
}: {
  messages: Message[];
  status: string;
}) => {
  return (
    <>
      {messages.map((message, index) =>
        message.role === "user" ? (
          <UserChat key={index} content={message.content} />
        ) : (
          <AssistantChat key={index} content={message.content} />
        )
      )}
      {status === "submitted" && (
        <div className="text-muted-foreground">Generating response...</div>
      )}
      {status === "error" && (
        <div className="text-red-500">An error occurred.</div>
      )}
    </>
  );
};

const UserChat = ({ content }: { content: string }) => {
  return (
    <div className="bg-muted rounded-2xl ml-auto max-w-[80%] w-fit px-3 py-2 mb-6">
      {content}
    </div>
  );
};

const AssistantChat = ({ content }: { content: string }) => {
  return (
    <div className="pr-8 w-full mb-6 prose prose-neutral dark:prose-invert prose-sm">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a target="_blank" href={href}>
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ChatOutput;