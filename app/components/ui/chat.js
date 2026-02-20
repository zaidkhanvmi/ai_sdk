"use client";

import { useState } from "react";

export default function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message) return;

        // Add user's message
        setMessages(prev => [...prev, { role: "user", content: message }]);
        setMessage("");
        setLoading(true);

        const res = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("API error:", res.status, errorText);
            setLoading(false);
            return;
        }

        if (!res.body) {
            console.error("No response body (stream) from /api/generate");
            setLoading(false);
            return;
        }

        const data = await res.json();
        const aiMessage = data.choices?.[0]?.message?.content;  // Extract only the content

        // Finalize assistant message once done
        if (aiMessage) {
            setMessages(prev => [
                ...prev,
                { role: "assistant", content: aiMessage }
            ]);
        }

        setLoading(false);
    };

    console.log(messages[1]?.content);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-purple-500 p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-4">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`p-3 rounded-lg ${m.role === "user" ? "bg-pink-100 self-end" : "bg-purple-100 self-start"}`}
                    >
                        <strong>{m.role === "user" ? "You" : "AI"}:</strong> {m.content}
                    </div>
                ))}

                {loading && <div className="italic text-gray-500">AI is typing...</div>}

                <div className="flex space-x-2 mt-2">
                    <input
                        className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button
                        className="bg-pink-500 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-pink-600"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}