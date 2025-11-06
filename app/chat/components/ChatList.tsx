import { ChatResult } from "../types/type"

export default function ChatList({
  chats,
  onSelect
}: {
  chats: ChatResult[]
  onSelect: (chat: ChatResult) => void
}) {
  return (
    <div className="overflow-y-auto h-full">
      {chats.map((chat) => (
        <div
          key={chat.room.id}
          onClick={() => onSelect(chat)}
          className="flex items-center p-3 gap-3 hover:bg-gray-100 cursor-pointer border-b"
        >
          <img
            src={chat.room.image_url}
            alt={chat.room.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{chat.room.name}</p>
            <p className="text-sm text-gray-500">
              {chat.comments.at(-1)?.message ?? "No messages"}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
