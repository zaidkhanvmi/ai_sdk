import { NextResponse } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText, streamText } from "ai";


export async function GET() {
    return NextResponse.json({ message: "Hello world from Generate!" });
}

// export async function POST(request) {
//     try {
//         const { message } = await request.json();

//         if (!message || !message.trim()) {
//             return NextResponse.json(
//                 { error: "Message be atleast one token" },
//                 { status: 400 }
//             )
//         }

//         const companyInfo = `
//         Vibrant Media Inc is a digital agency that provides:
//         - Web Development
//         - SaaS Development
//         - SEO & Marketing
//         - Branding & Design

//         We specialize in multi-tenant platforms and enterprise systems.
//         `;

//         const systemPrompt = `
//         You are the official AI assistant of Vibrant Media Inc.

//         Use the company information below to answer questions:

//         ${companyInfo}

//         Keep answers short, professional, and sales-focused.
//         If the question is unrelated to our services, politely redirect users to our contact page.
//         `;

//         const messages = [
//             { role: "system", content: systemPrompt },
//             { role: "user", content: message },
//         ];

//         const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 model: 'openai/gpt-4o-mini',
//                 messages: messages,
//             }),
//         });

//         const data = await response.json();

//         return NextResponse.json(data);

//     } catch (error) {
//         console.log("Api Key", error);
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(request) {
    try {
        const { message } = await request.json();

        if (!message || !message.trim()) {
            return NextResponse.json(
                { error: "Message must be at least one token." },
                { status: 400 },
            );
        }

        const companyInfo = `
        Vibrant Media Inc is a digital agency that provides:
        - Web Development
        - SaaS Development
        - SaaS Development
        - SEO & Marketing
        - Branding & Design

        We specialize in multi-tenant platforms and enterprise systems.
        `;

        const systemPrompt = `
        You are the official AI assistant of Vibrant Media Inc.

        Use the company information below to answer questions:

        ${companyInfo}

        Keep answers short, professional, and sales-focused.
        If the question is unrelated to our services, politely redirect users to our contact page.
        `;

        const stream = await streamText({
            model: openai("openai/gpt-4o-mini"),
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message },
            ],
        });

        return stream.toTextStreamResponse();

        // const generate = await generateText({
        //     model: openai("gpt-4o-mini"),
        //     messages: [
        //         { role: "system", content: systemPrompt },
        //         { role: "user", content: message }
        //     ]
        // });

        // return NextResponse.json({ text: generate.text });

    } catch (error) {
        console.error("API Error", error);
        return new Response(
            JSON.stringify({ message: `Api error: ${error.message || "Unknown error"}` }),
            { headers: { "Content-Type": "application/json" }, status: 500 },
        );
    }
}