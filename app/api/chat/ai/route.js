export const maxDuration = 60;
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import Chat from "../../../../models/Chat";
import connectDB from "../../../../config/db";
//initialize OpenAI client with DeepSeek API key  and base URL
const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req) {
    try {
        const {userId} = getAuth(req);
        //Extract chatId and promt from the request body
        const {chatId, promt} = await req.json();
        if(!userId){
            return NextRequest.json({
                success:false,
                message: "User not authenticated"
            });
        }

        //Find the chat doccument inthe database based on userId and chatId
        await connectDB();
        const data = await Chat.findOne({userId, _id:chatId})
        //create a user message object
        const userPrompt = {
            role: "user",
            content:prompt,
            timestamp: Date.now()
        };

        data.messages.push(userPrompt);
        //call the deepseek api to get a chat completion
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "deepseek-chat",
            store: true,
        });

        const message = completion.choices[0].message;
        message.timestamp = Date.now();

        data.messages.push(messege);
        data.save();

        return NextResponse.json({success: true, data: message})
        // const completion = await openai.chat.completions.create({
        //     messages: [{ role: "system", content: "You are a helpful assistant." }],
        //     model: "deepseek-flash",
        //     thinking: {"type": "enabled"},
        //     reasoning_effort: "high",
        //     stream: false,
        // });


    } catch (error) {
        return NextResponse.json({success: false, error: error.message})
    }
}