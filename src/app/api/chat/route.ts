import { generateAI } from "@/app/service/ai.service";
import connectDB from "@/lib/db";
import { Settings } from "@/model/settings.model";
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

    const text = await generateAI(prompt)

    return NextResponse.json({response:text})
  } catch (error) {
    return NextResponse.json({
        message:`Chat error ${error}`
      },{status:400})
  }
}