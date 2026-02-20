import { NextResponse } from "next/server";
import { streamText, convertToModelMessages } from "ai";

export async function GET(request) {
    const msg = NextResponse.json({ message: "Helo world from Generate!" });
    return msg;
}

export async function POST(request) {
    try {
        const { message } = await request.json();

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'openai/gpt-4o-mini',
                messages: [
                    { role: 'user', content: message },
                ],
            }),
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.log("Api Key", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// export async function POST(request) {
//     try {
//         const { message } = await request.json();

//         const messages = convertToModelMessages([
//             { role: "user", content: message }
//         ]);

//         const stream = await streamText({
//             model: "openai/gpt-4o-mini",
//             messages,
//         });

//         return stream.toTextStreamResponse();

//     } catch (error) {
//         console.log("Api Error", error.message);
//         return new Response(
//             JSON.stringify({ message: `Api error ${error.message}` }),
//             { headers: { "Content-Type": "application/json" }, status: 500 }
//         );
//     }
// }