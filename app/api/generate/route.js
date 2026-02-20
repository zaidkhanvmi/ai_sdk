import { NextResponse } from "next/server";
import { streamText } from "ai";

export async function GET(request) {
    const msg = NextResponse.json({ message: "Helo world from Generate!" });
    return msg;
}

export async function POST(request) {

}