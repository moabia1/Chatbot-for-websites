import connectDB from "@/lib/db";
import { Settings } from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ownerId, businessName, supportEmail, knowledge } = await req.json()
    if (!ownerId) {
      return NextResponse.json({
        message: "Owner ID required",
        status:400
      })
    }
    await connectDB()

    const setting = await Settings.findOneAndUpdate({ ownerId }, { ownerId, businessName, supportEmail, knowledge }, { new: true, upsert: true });
    
    return NextResponse.json(setting)
  } catch (error) {
    return NextResponse.json({
        message: `Settings Error: ${error}`,
        status:500
      })
  }
}
