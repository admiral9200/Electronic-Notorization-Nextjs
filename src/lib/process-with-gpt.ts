export const extractKeyInfo = async (rawString: string): Promise<string> => {
    try {
        const res = await fetch("/api/chatgpt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: rawString })
        })

        if(!res.ok) {
            throw new Error(`HTTP error ${res.status} with ChatGPT`)
        }

        const { result } = await res.json()
        return result
    } catch (error) {
        console.error("Data Processing Error: ", error)
        return ""
    }
}