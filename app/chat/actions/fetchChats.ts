// lib/fetchChats.ts
export async function fetchChats() {
    try {
      const res = await fetch(
        "https://gist.githubusercontent.com/asharijuang/23745f3132fa30e666db68d2bf574e4a/raw/5d556dbb9c2aea9fdf3e1ec96e45f62a88cea7b6/chat_response.json"
      )
      if (!res.ok) throw new Error("Failed to fetch chats")
      const data = await res.json()
  
      const res2 = await fetch(
        "https://gist.githubusercontent.com/Asoatram/db10f1651abbde5d5ed857fa85d6dceb/raw/b81d41eba3a14fbf413b37785d2a5093c7ab22fe/extended-json.json"
      )
      if (!res2.ok) throw new Error("Failed to fetch extended chats")
      const data2 = await res2.json()
  
      const combined = [...data.results, ...data2.results]
  
      console.log("Fetched chats:", combined)
      return combined
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }
  