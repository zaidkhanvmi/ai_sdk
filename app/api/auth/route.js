import { NextResponse } from "next/server";

export async function GET(request) {
    return NextResponse.json({ message: "Hello from next.js Api!" })
}

export async function POST(request) {

}