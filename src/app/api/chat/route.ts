import connectDB from "@/lib/db";
import { Settings } from "@/model/settings.model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, ownerId } =await req.json();
    if (!message || !ownerId) {
      return NextResponse.json({
        message: "message and ownerId is required"
      },{status:400})
    }

    await connectDB()

    const setting = await Settings.findOne({ ownerId })
    if (!setting) {
      return NextResponse.json({
        message: "chat bot is not configured it"
      },{status:400})
    }

    const KNOWLEDGE = `
Business Name: ${setting.businessName || "Not provided"}
Support Email: ${setting.supportEmail || "Not provided"}

Business Knowledge:
${setting.knowledge || "Not provided"}
`.trim()


    const prompt = `
You are a customer support assistant for this business.

Answer using ONLY the information provided below.
Do not make up any details.

If the question cannot be answered from the information, reply exactly:
"Please contact support."

BUSINESS INFO:
${KNOWLEDGE}

CUSTOMER QUESTION:
${message}

-----------------
ANSWER
-----------------
`;
    
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })
    const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:prompt
    })
    
    const response = await NextResponse.json(res.text)

    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type")

    return response
  } catch (error) {
    const response = NextResponse.json({
        message:`Chat error ${error}`
    }, { status: 400 })
    
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type")

    return response
  }
}

export const OPTIONS = async () => {
  return NextResponse.json(null, {
    status: 201, headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  })
}