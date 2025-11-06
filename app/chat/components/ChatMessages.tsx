

export default function ChatMessages({
  messages,
}: {
  messages: { id: number; text?: string; fileUrl?: string; fileName?: string; sender: string }[]
}) {
  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[75%] px-4 py-2 rounded-2xl ${
              msg.sender === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            {msg.text && <p>{msg.text}</p>}

            {msg.fileUrl && (
              <div className="mt-2">
                {msg.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <img
                    src={msg.fileUrl}
                    alt={msg.fileName}
                    className="rounded-lg max-h-64 object-cover"
                  />
                ) : (
                  <a
                    href={msg.fileUrl}
                    download={msg.fileName}
                    className="underline text-sm"
                  >
                    {msg.fileName}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
