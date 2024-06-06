"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import ChatSegment from "../components/chat";
import ChatChoice from "../components/chat-choice";
import { blockData } from "../lib/quesLib";
import { useSelector } from "react-redux";

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

const AIChat = () => {
  const user = useSelector((state) => state.user);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLeaveBtn, setShowLeaveBtn] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [currentBlockId, setCurrentBlockId] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setCurrentBlockId(blockData[0].id);
    setCurrentQuestionId(blockData[0].questions[0].id);
  }, [blockData]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      processCurrentQuestion();
    }, 1000);
  }, [currentQuestionId, currentBlockId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      const maxScrollTop = scrollHeight - clientHeight;
      chatContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [chatHistory]);

  const processCurrentQuestion = () => {
    const currentBlock = blockData.find((block) => block.id === currentBlockId);
    if (!currentBlock) return;

    const currentQuestion = currentBlock.questions.find(
      (question) => question.id === currentQuestionId
    );
    if (!currentQuestion) return;

    setChatHistory((prev) => [
      ...prev,
      { ...currentQuestion, key: Date.now() },
    ]);

    if (currentQuestion.type === "text") {
      // Automatically move to the next question
      let nextQuestionId = currentQuestion.next.default;
      setCurrentQuestionId(nextQuestionId);
    } else if (currentQuestion.type === "end") {
      let nextBlockId = currentBlock.next;
      if (nextBlockId) {
        setCurrentBlockId(nextBlockId);
        setCurrentQuestionId(
          blockData.find((block) => block.id === nextBlockId).questions[0].id
        );
      } else {
        // End of the chat
        console.log("End of the chat");
      }
    }
    setLoading(false);
  };

  const handleChoiceClick = (choice) => {
    if (choice) {
      let nextQuestionId = blockData
        .find((block) => block.id === currentBlockId)
        .questions.find((question) => question.id === currentQuestionId)
        .next.yes;
      setCurrentQuestionId(nextQuestionId);
    } else {
      let nextQuestionId = blockData
        .find((block) => block.id === currentBlockId)
        .questions.find((question) => question.id === currentQuestionId)
        .next.no;
      setCurrentQuestionId(nextQuestionId);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLeaveBtn(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const textInputRef = useRef(null);
  const sendMessage = async (event) => {
    event.preventDefault();

    const message = textInputRef.current.value;
    if (
      message.trim().length > 0 &&
      blockData
        .find((block) => block.id === currentBlockId)
        .questions.find((question) => question.id === currentQuestionId)
        .type === "ques"
    ) {
      setLoading(true);
      const question = chatHistory[chatHistory.length - 1].text;
      const newChat = {
        id: chatHistory.length + 1,
        text: message,
        sender: "user",
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
              question: question,
              answer: message,
            }),
          }
        );
        if (response.ok) {
          const nextQuestionId = blockData
            .find((block) => block.id === currentBlockId)
            .questions.find((question) => question.id === currentQuestionId)
            .next.default;
          setCurrentQuestionId(nextQuestionId);
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
              userAccount: "test",
              messages: [
                {
                  question: question,
                  answer: message,
                },
              ],
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setChatId(data._id);
          const nextQuestionId = blockData
            .find((block) => block.id === currentBlockId)
            .questions.find((question) => question.id === currentQuestionId)
            .next.default;
          setCurrentQuestionId(nextQuestionId);
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
    <div className="bg-[#EDF8FD] w-full h-screen overflow-hidden">
      <Navbar />
      <div className="w-full max-w-[960px] mx-auto flex flex-col justify-center items-stretch gap-y-4 p-4 relative">
        <h1 className="font-semibold text-2xl text-alpha-blue text-center py-2">
          简历信息收集
        </h1>
        {showLeaveBtn ? (
          <Link href="/start-resumeserve">
            <button className="absolute top-4 right-4 bg-gray-400 text-white px-4 py-2 rounded-xl">
              结束会话
            </button>
          </Link>
        ) : null}
        <div
          ref={chatContainerRef}
          className="overflow-y-auto max-h-[calc(100vh-270px)] mt-4 mb-32 pr-4"
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
                <ChatSegment sender={chat.sender} chatMessage={chat.text} />
                {chat.type === "choice" ? (
                  <ChatChoice onClick={handleChoiceClick} />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 p-2 flex justify-center items-center flex-row gap-x-4 w-full max-w-[864px] mx-auto mb-6 border border-solid border-alpha-blue rounded-lg bg-white shadow-lg">
        <input
          type="text"
          className="w-full p-1 focus:outline-none"
          placeholder={loading ? "请稍等……" : "请输入您的回答"}
          ref={textInputRef}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-dots animate-pulse w-6 h-6 text-gray-400 hover:cursor-wait"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-send-2 w-6 h-6 text-black hover:cursor-pointer"
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
        )}
      </div>
    </div>
  );
};

export default AIChat;
