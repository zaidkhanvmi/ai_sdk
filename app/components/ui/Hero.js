import React from "react";

const Hero = () => {

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white py-24">

            {/* Background Glow */}
            <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-600/30 blur-[150px]" />
            <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-pink-500/20 blur-[120px]" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur-md mb-6">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    Powered by Advanced AI • 24/7 Intelligent Support
                </div>

                {/* Heading */}
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        Your Smart
                    </span>
                    <br />
                    AI Assistant
                </h1>

                {/* Description */}
                <p className="mt-6 text-white/60 text-lg">
                    Automate tasks, generate content, analyze data, and get instant
                    answers — all powered by next-generation artificial intelligence.
                </p>

                {/* CTA */}
                <div className="mt-10">
                    <button className="relative rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-white font-semibold shadow-[0_0_30px_rgba(168,85,247,0.6)] transition hover:scale-105">
                        Try AI Assistant Now
                    </button>
                </div>

                {/* Bottom Features */}
                <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/50">
                    <span>✔ Instant Responses</span>
                    <span>✔ Smart Automation</span>
                    <span>✔ Secure & Private</span>
                </div>

            </div>
        </section>
    );
}

export default Hero;