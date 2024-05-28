import { env } from '@/env.mjs'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'


export async function POST(req: Request) {
    const openai = new OpenAI({
        apiKey: env.OPEN_AI_KEY
    })

    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: 'hi'
                }
            ],
            model: 'gpt-4o-2024-05-13'
        })
        
        return NextResponse.json(
            { chatCompletion },
            { status: 200 }
        )
    } catch (error) {
        console.error("ChatGPT Error: ", error)
        return NextResponse.json(
            { error: error },
            { status: 500 }
        )
    }
}