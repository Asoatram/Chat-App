"use client"

import { useState, useRef } from "react"
import { Send, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChatInput({
  onSendMessage,
}: {
  onSendMessage: (payload: { text?: string; file?: File }) => void
}) {
  const [text, setText] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onSendMessage({ text })
    setText("")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onSendMessage({ file })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border-t flex items-center gap-2 bg-white"
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => fileInputRef.current?.click()}
      >
        <Paperclip size={18} />
      </Button>
      <Input
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" size="icon">
        <Send size={18} />
      </Button>
    </form>
  )
}
