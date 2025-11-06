"use client"

import { useEffect, useState } from "react"
import ChatInput from "./ChatInput"
import ChatBubble from "./ChatBubble"
import { ChatResult, Comment } from "../types/type"
import ChatHeader from "./ChatHeader"
import { Spinner } from "@/components/ui/spinner"

interface ChatAreaProps {
  chat: ChatResult | null
  onBack: () => void
  onSendMessage: (message: Comment) => void
}


export default function ChatArea({
  chat,
  onBack,
  onSendMessage,
}: ChatAreaProps) {
  const [chatData, setChatData] = useState<ChatResult | null>(null)
  const [messages, setMessages] = useState<Comment[]>([])
  // Load chat data when chat prop changes

  useEffect(() => {
    if (chat) {
      setChatData(chat)
      setMessages(chat.comments)
    }
  }, [chat])

  // Handle sending messages
  const handleSendMessage = (payload: { text?: string; file?: File }) => {
    const newMessage: Comment = {
      id: Date.now(),
      type: payload.file ? "file" : "text",
      message: payload.text || payload.file?.name || "",
      sender: "agent@mail.com",
      file: payload.file ? {
        type: payload.file.type.startsWith("image/")
          ? "image"
          : payload.file.type === "application/pdf"
          ? "pdf"
          : payload.file.type.startsWith("video/")
          ? "video"
          : "pdf",
        file_url: payload.file ? URL.createObjectURL(payload.file) : "",
        size: `${(payload.file.size / 1024).toFixed(2)} KB`,
      } : undefined
    };

    setMessages((prev) => [...prev, newMessage])
    onSendMessage(newMessage)
  }

  if (!chatData)
    return <Spinner className="m-auto" />

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <ChatHeader onBack={onBack} imageUrl={chatData.room.image_url} participants={chatData.room.participant} name={chatData.room.name}/>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-2">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            sender={msg.sender === "agent@mail.com" ? "user" : "other"}
            text={msg.message?.length !== 0 ? msg.message : undefined}
            type={msg.type}
            file_type={msg.type === "file" && msg.file ? msg.file.type : undefined}
            fileUrl={msg.type === "file" && msg.file ? msg.file.file_url : undefined}
          />
        ))}
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}
