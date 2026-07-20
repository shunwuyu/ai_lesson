import "./Chat.css";
import BotIcon from "./icons/BotIcon";
import UserIcon from "./icons/UserIcon";

function Message({ role, content, answerIndex }) {
  return (
    <div className="flex items-start space-x-4">
      {role === "assistant" ? (
        <>
          <BotIcon className="h-6 w-6 min-h-6 min-w-6 my-3 text-gray-500"/>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
            <div className="min-h-6 text-gray-800 dark:text-gray-200 overflow-wrap-anywhere">
              
            </div>
          </div>
        </>
      ) : (
        <>
          <UserIcon className="h-6 w-6 min-h-6 min-w-6 my-3 text-gray-500 dark:text-gray-300" />
          <div className="bg-blue-500 text-white rounded-lg p-4">
            <p className="min-h-6 overflow-wrap-anywhere">{content}</p>
          </div>
        </>
      )}
    </div>
  )
}
export default function Chat({ messages }) {
  const empty = messages.length === 0;
  return (
    <div
      className={`flex-1 p-6 max-w-[960px] w-full ${empty ? "flex flex-col items-center justify-end" : "space-y-4"}`}
    >
      {/* {empty && (
        <div className="text-xl">Ready!</div>
      ) } */}
      {empty ? (
        <div className="text-xl">Ready!</div>
      ) : (
        messages.map((msg, i) => <Message key={`message-${i}`} {...msg} />)
      )}
     
    </div>
  )
}