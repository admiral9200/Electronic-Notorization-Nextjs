export const extractKeyInfo = async (rawString: string[] | undefined): Promise<any> => {
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

        const { chatCompletion } = await res.json()
        return chatCompletion
    } catch (error) {
        console.error("Data Processing Error: ", error)
        return ""
    }
}