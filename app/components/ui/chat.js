"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = message;
        setMessage("");

        // Add user message and a placeholder assistant message for streaming
        setMessages((prev) => [
            ...prev,
            { role: "user", content: userMessage },
            { role: "assistant", content: "" },
        ]);
        setLoading(true);

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!res.ok || !res.body) {
                setLoading(false);
                return;
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;

                if (value) {
                    const chunk = decoder.decode(value, { stream: true });

                    setMessages((prev) => {
                        const updated = [...prev];
                        const lastIndex = updated.length - 1;

                        if (lastIndex >= 0 && updated[lastIndex].role === "assistant") {
                            updated[lastIndex] = {
                                ...updated[lastIndex],
                                content: (updated[lastIndex].content || "") + chunk,
                            };
                        }

                        return updated;
                    });
                }
            }
        } catch (error) {
            console.error("Chat error", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 hover:scale-105 transition-all duration-200 text-white rounded-full shadow-2xl flex items-center justify-center z-50 cursor-pointer"
            >
                {open ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-6 w-[360px] h-[500px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden z-50 border transition-all duration-300 ${open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-lg">AI Assistant</h2>
                        <p className="text-xs opacity-80">Online</p>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="cursor-pointer hover:opacity-80 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-white to-gray-50 scroll-hidden">
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === "user"
                                    ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-br-sm"
                                    : "bg-white border text-gray-800 rounded-bl-sm"
                                    }`}
                            >
                                {m.content}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="text-sm text-gray-400 animate-pulse">
                            AI is typing...
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Section */}
                <div className="px-4 py-4 bg-white border-t">
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-pink-400 transition">
                        <input
                            className="flex-1 bg-transparent outline-none text-sm px-2"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") sendMessage();
                            }}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-gradient-to-br from-pink-500 to-purple-500 hover:opacity-90 text-white p-2 rounded-full cursor-pointer transition"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat