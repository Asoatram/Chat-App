import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { Participant } from "../types/type"

export interface ChatHeaderProps {
  onBack?: () => void
  imageUrl?: string
  name?: string
  participants?: Participant[]
  
}

export default function ChatHeader({ onBack, imageUrl, name, participants }: ChatHeaderProps) {
  return (
    <div className="flex items-center px-4 py-3 border-b bg-white">
      {/* Back button visible only on mobile */}
      {onBack && (
        <button
          onClick={onBack}
          className="sm:hidden mr-2 rounded-full hover:bg-gray-100 p-1 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
      )}

      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold mr-3">
          <Image
            src={imageUrl || "/default-avatar.png"}
            alt={name || "Chat Avatar"}
            width={40}
            height={40}
            className="rounded-full w-10 h-10"
          />
      </div>
      <div>
        <h2 className="font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">
          {participants?.length ? participants.map(p => p.name).join(", ") : null}
        </p>
      </div>
    </div>
  )
}
