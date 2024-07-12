"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ChatSegment from "../components/chat";
import AudioSegment from "../components/audioSegment";
// import ChatChoice from "../components/chat-choice";
// import { blockData } from "../lib/quesLib";
import { useSelector } from "react-redux";
import useSpeechRecognition from "../utils/useSpeechRecognition";

const avatar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-user-circle w-12 h-12"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
  </svg>
);

export async function getServerSideProps(context) {
  let dbFormData = {};
  if (context.query.id) {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/resume-chat/" + context.query.id
    );
    const data = await res.json();
    const messageList = data.messages;
    console.log(data);
    // messageList = { question: string, answer: string}[]
    const reformattedMessageList = messageList
      .map((message, index) => {
        const messages = [
          { text: message.question, id: index, sender: "bot", type: "text" },
        ];
        if (message.answer) {
          messages.push({ text: message.answer, id: index, sender: "user", type: message.answer_type});
        }
        return messages;
      })
      .flat();
    console.log(reformattedMessageList);
    dbFormData = { _id: data._id, messages: reformattedMessageList };
  } else {
    dbFormData = { _id: "", messages: [] };
  }
  // let dbFormData = { _id: '123' };
  return { props: { dbFormData } };
}

export default function AIChat({ dbFormData }) {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [chatHistory, setChatHistory] = useState(dbFormData.messages);
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(dbFormData._id);
  const [completeness, setCompleteness] = useState("");

  const latestChatHistory = useRef(dbFormData.messages);

  const handleResult = useCallback(
    async (result) => {
      setLoading(true);
      console.log(chatHistory);
      const question =
        latestChatHistory.current[latestChatHistory.current.length - 1].text;
      const quesId =
        latestChatHistory.current[latestChatHistory.current.length - 1].id;
      const newChat = {
        id: latestChatHistory.current.length + 1,
        text: result.id,
        sender: "user",
        type: "audio",
      };
      setChatHistory((prevChatHistory) => {
        latestChatHistory.current = [...prevChatHistory, newChat];
        return latestChatHistory.current;
      });
      console.log("Audio result:", result.id);
      if (chatId) {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/resume-chat/" + chatId,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quesId: quesId,
              answer: result.id,
              answer_type: "audio",
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          const nextQuestion = data.message;
          const nextQuesId = data.quesId;
          setChatHistory((prevChatHistory) => {
            latestChatHistory.current = [
              ...prevChatHistory,
              {
                text: nextQuestion,
                sender: "bot",
                id: nextQuesId,
                type: "text",
              },
            ];
            return latestChatHistory.current;
          });
        } else {
          console.error("Failed to save chat");
          alert("Server error");
        }
      } else {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/resume-chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userAccount: user.phoneNumber,
              messages: [
                {
                  id: quesId,
                  question: question,
                  answer: result.id,
                  answer_type: "audio",
                },
              ],
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setChatId(data.id);
          const nextQuestion = data.message;
          const nextQuesId = data.quesId;
          setChatHistory((prevChatHistory) => {
            latestChatHistory.current = [
              ...prevChatHistory,
              {
                text: nextQuestion,
                sender: "bot",
                id: nextQuesId,
                type: "text",
              },
            ];
            return latestChatHistory.current;
          });
          router.push(
            {
              pathname: "/ai-assistant-chat",
              query: { id: data.id },
            },
            undefined,
            { shallow: true }
          );
        } else {
          console.error("Failed to save chat");
          alert("Server error");
        }
      }
      setLoading(false);
    },
    [chatHistory, chatId, user.phoneNumber, router]
  );

  useEffect(() => {
    latestChatHistory.current = chatHistory;
  }, [chatHistory]);

  const handleError = useCallback((error) => {
    console.error("Speech recognition error:", error);
  }, []);

  const handleCompleteness = useCallback(async (chatId) => {
    if (chatId !== "") {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/api/resume-chat/completeness/" +
          chatId
      );
      if (response.status === 200) {
        const data = await response.json();
        setCompleteness(data.completeness);
      } else {
        console.error("Failed to retrieve completeness");
        alert("Server error");
      }
    }
  }, []);

  const { handleRecognition, isListening } = useSpeechRecognition({
    onResult: handleResult,
    onError: handleError,
  });
  // const [currentBlockId, setCurrentBlockId] = useState(null);
  // const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatHistory.length === 0) {
      setChatHistory([
        {
          sender: "bot",
          text: "你好，我是你的简历规划师，在帮助你制作一份求职简历之前，我需要了解你的一些个人基本信息和过往学习实习经历，对话可以随时开始或暂停，你的资料会被妥善保存，仅用于简历制作。\n 此次交流仅作为初步信息搜集，如有遗漏不用担心，你可以随时告诉我们，我们将为你修改并补充。\n首先，您能提供一下您的基本信息吗？包括姓名、联系电话、电子邮件和微信号。",
          id: 1,
          type: "text",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      const maxScrollTop = scrollHeight - clientHeight;
      chatContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [chatHistory]);

  const textInputRef = useRef(null);
  const sendMessage = async (event) => {
    event.preventDefault();

    const message = textInputRef.current.value;
    if (message.trim().length > 0) {
      setLoading(true);
      console.log(chatHistory);
      const question = chatHistory[chatHistory.length - 1].text;
      const quesId = chatHistory[chatHistory.length - 1].id;
      const newChat = {
        id: chatHistory.length + 1,
        text: message,
        sender: "user",
        type: "text",
      };
      setChatHistory((prevChatHistory) => [...prevChatHistory, newChat]);
      textInputRef.current.value = "";
      if (chatId) {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/resume-chat/" + chatId,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quesId: quesId,
              answer: message,
              answer_type: "text",
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          const nextQuestion = data.message;
          const nextQuesId = data.quesId;
          setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { text: nextQuestion, sender: "bot", id: nextQuesId, type: "text" },
          ]);
        } else {
          console.error("Failed to save chat");
          alert("Server error");
        }
      } else {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/resume-chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userAccount: user.phoneNumber,
              messages: [
                {
                  id: quesId,
                  question: question,
                  answer: message,
                  answer_type: "text",
                },
              ],
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setChatId(data.id);
          const nextQuestion = data.message;
          const nextQuesId = data.quesId;
          setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { text: nextQuestion, sender: "bot", id: nextQuesId, type: "text" },
          ]);
          router.push(
            {
              pathname: "/ai-assistant-chat",
              query: { id: data.id },
            },
            undefined,
            { shallow: true }
          );
        } else {
          console.error("Failed to save chat");
          alert("Server error");
        }
      }
    }
    setLoading(false);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage(event);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="bg-light-blue w-full h-[calc(100vh-8rem)] overflow-hidden">
      <div className="w-full max-w-[960px] mx-auto flex flex-col justify-center items-stretch gap-y-4 p-4 relative">
        <h1 className="font-semibold text-2xl text-alpha-blue text-center py-2">
          简历信息收集
        </h1>
        <div
          ref={chatContainerRef}
          className="overflow-y-auto max-h-[calc(100vh-350px)] mt-4 mb-32 pr-4"
        >
          <ul>
            {chatHistory.map((chat, index) => (
              <li
                key={index}
                className={`flex items-center text-black justify-start gap-x-4 ${
                  chat.sender === "bot" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {avatar}
                {chat.type === "audio" ? (
                  <AudioSegment sender={chat.sender} audioId={chat.text} />
                ) : (
                  <ChatSegment sender={chat.sender} chatMessage={chat.text} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex justify-center items-center flex-row gap-x-10 w-full">
        <div className="flex flex-row justify-center items-center gap-x-4 text-black mt-2 mb-6 h-full">
          <button
            className="bg-alpha-blue text-white px-6 py-3 rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={chatId === ""}
            onClick={() => handleCompleteness(chatId)}
          >
            信息完整度{completeness === "" ? "" : `：${completeness}%`}
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-refresh w-6 h-6 cursor-pointer"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => handleCompleteness(chatId)}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
          </svg>
        </div>
        <div className="flex justify-center items-start flex-row w-full max-w-[864px] gap-x-6 mt-2 mb-6 h-full">
          <div className="flex justify-center items-center flex-row w-full p-2 mx-auto border border-solid border-alpha-blue rounded-lg bg-white shadow-lg text-black h-12">
            <input
              type="text"
              className="w-full p-1 focus:outline-none"
              placeholder={
                loading
                  ? "请稍等……"
                  : isListening
                  ? "请说话……"
                  : "请输入您的回答"
              }
              ref={textInputRef}
              onKeyUp={handleKeyUp}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            {isListening ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-microphone-off w-6 h-6 mx-2 cursor-pointer"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={handleRecognition}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 3l18 18" />
                <path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1" />
                <path d="M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.152 -3.85" />
                <path d="M8 21l8 0" />
                <path d="M12 17l0 4" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-microphone w-6 h-6 mx-2 cursor-pointer"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={handleRecognition}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" />
                <path d="M5 10a7 7 0 0 0 14 0" />
                <path d="M8 21l8 0" />
                <path d="M12 17l0 4" />
              </svg>
            )}
          </div>
          <div className="h-12 w-12 flex justify-center items-center">
            <button
              className="h-full w-full border border-alpha-blue shadow-md bg-white text-black p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || isListening}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-send-2 w-6 h-6"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={sendMessage}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                <path d="M6.5 12h14.5" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mt-2 mb-6 h-full">
          <Link href="/start-resumeserve">
            <button
              disabled={chatId === ""}
              className="disabled:cursor-not-allowed disabled:bg-gray-400 bg-red-400 text-white px-6 py-3 rounded-xl"
            >
              结束会话
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
