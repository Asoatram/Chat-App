export interface Participant {
  id: string
  name: string
  role: number
}

export interface Room {
  id: number
  name: string
  image_url: string
  participant: Participant[]
}

export interface fileComment {
  type: "image" | "pdf" | "video"
  file_url: string
  size: string
}
export interface Comment {
  id: number
  type: "text" | "file"
  message?: string
  sender: string
  file?: fileComment
}

export interface ChatResult {
  room: Room
  comments: Comment[]
}