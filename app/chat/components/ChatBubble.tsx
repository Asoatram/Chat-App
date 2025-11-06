"use client"

import { FileText, Play, Image as ImageIcon } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ChatBubbleProps {
  sender: "user" | "other"
  text?: string
  type: "text" | "file"
  file_type?: "image" | "pdf" | "video"
  fileUrl?: string
  fileName?: string
}

export default function ChatBubble({ sender, text, type, file_type, fileUrl, fileName }: ChatBubbleProps) {
  const [showPreview, setShowPreview] = useState(false)
  const isUser = sender === "user"

  const fileExt = fileName?.split(".").pop()?.toLowerCase()

  const isImage = file_type === "image" || (fileExt && ["png", "jpg", "jpeg", "gif", "bmp", "webp"].includes(fileExt))
  const isPDF = file_type === "pdf" || (fileExt === "pdf")
  const isVideo = file_type === "video" || (fileExt && ["mp4", "webm", "ogg", "mov"].includes(fileExt))

  const handleFileClick = () => {
    if (isImage || isVideo) setShowPreview(true)
  }

  return (
    <>
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-[75%] px-2 py-2 rounded-lg wrap-break-word ${
            isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
          }`}
        >
          {text && <p>{text}</p>}

          {/* FILE HANDLING */}
          {fileUrl && (
            <div
              className="mt-2 flex items-center gap-2 cursor-pointer"
              onClick={handleFileClick}
            >
              {isImage ? (
                <div className="relative">
                  <img
                    src={fileUrl}
                    alt={fileName}
                    className="rounded-lg max-h-48 object-cover"
                  />
                </div>
              ) : isVideo ? (
                <div className="relative">
                  <video
                    src={fileUrl}
                    className="rounded-lg max-h-48 object-cover"
                    controls
                  />
                </div>
              ) : isPDF ? (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 underline text-sm"
                >
                  <FileText className="w-5 h-5" />
                  {fileName || "Document.pdf"}
                </a>
              ) : (
                <a
                  href={fileUrl}
                  download={fileName}
                  className="underline text-sm"
                >
                  {fileName || "Download file"}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 📸 PREVIEW MODAL */}
      <AnimatePresence>
        {showPreview && (isImage || isVideo) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            {isImage ? (
              <img
                src={fileUrl}
                alt={fileName}
                className="max-w-full max-h-full rounded-lg object-contain"
              />
            ) : (
              <video
                src={fileUrl}
                controls
                autoPlay
                className="max-w-full max-h-full rounded-lg"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
