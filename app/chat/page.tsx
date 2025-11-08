"use client"

import { useEffect, useState } from "react"
import ChatMenu from "./components/ChatMenu"
import ChatArea from "./components/ChatArea"
import { ChatResult } from "./types/type"
import useMobile from "../hooks/useMobile"
import { fetchChats } from "./actions/fetchChats"

export default function ChatPage() {
  const isMobile = useMobile()
  const [showChat, setShowChat] = useState(true)
  const [selectedChatId, setSelectedChatId] = useState<number | null>(12456)
  const [chats, setChats] = useState<ChatResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchChats()
        setChats(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    loadChats()
  }, [])

  useEffect(() => {
    if (isMobile === false) setShowChat(true)
  }, [isMobile])

  if (isMobile === null)
    return <div className="flex items-center justify-center h-screen text-gray-500">Detecting device...</div>

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading chats...
      </div>
    )

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    )

  const selectedChat = chats.find((c) => c.room.id === selectedChatId) || null

  return (
    <div className="flex h-screen">
      {(!isMobile || !showChat) && (
        <div className="w-full md:w-[30%] border-r">
          <ChatMenu
            chats={chats}
            onSelectChat={(id: number) => {
              setSelectedChatId(id)
              setShowChat(true)
            }}
          />
        </div>
      )}

      {(!isMobile || showChat) && (
        <div className="flex-1">
          <ChatArea
            chat={selectedChat}
            onBack={() => {
              setShowChat(false)
              setSelectedChatId(null)
            }}
            onSendMessage={(message) => {
              setChats((prevChats) =>
                prevChats.map((chat) =>
                  chat.room.id === selectedChatId
                    ? { ...chat, comments: [...chat.comments, message] }
                    : chat
                )
              )
            }
          }/>
        </div>
      )}
    </div>
  )
}
