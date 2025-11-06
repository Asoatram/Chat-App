"use client"

import { Input } from "@/components/ui/input"
import Image from "next/image"
import { FileText, Image as ImageIcon, Play } from "lucide-react"
import { ChatResult } from "../types/type"

interface ChatMenuProps {
  chats: ChatResult[]
  onSelectChat: (id: number) => void
}


export default function ChatMenu({
  chats,
  onSelectChat,
}: ChatMenuProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="px-4 py-3 border-b">
        <Input placeholder="Cari..." className="text-white" />
      </div>

      {chats.map((chat) => {
        const lastComment = chat.comments?.at(-1)

        let preview: React.ReactNode = "No messages"

        if (lastComment) {
          if (lastComment.file?.type === "video") {
            preview = (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Play size={14} />
                <span>Video</span>
              </div>
            )
          } else if (lastComment.file?.type === "image") {
            preview = (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <ImageIcon size={14} />
                <span>Image</span>
              </div>
            )
          } else if (lastComment.file?.type === "pdf" ) {
            preview = (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <FileText size={14} />
                <span>Document</span>
              </div>
            )
          } else if ( lastComment.message !== undefined) {
            preview = (
              <p className="text-sm text-gray-500 truncate w-[180px]">
                {lastComment.message}
              </p>
            )
          }
        }

        return (
          <div
            key={chat.room.id}
            onClick={() => onSelectChat(chat.room.id)}
            className="flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer border-b"
          >
            <Image
              src={chat.room.image_url}
              alt={chat.room.name}
              width={48}
              height={48}
              className="rounded-full object-cover w-12 h-12"
            />

            <div className="flex flex-col">
              <p className="font-semibold">{chat.room.name}</p>
              <p></p>
              {preview}
            </div>
          </div>
        )
      })}
    </div>
  )
}
