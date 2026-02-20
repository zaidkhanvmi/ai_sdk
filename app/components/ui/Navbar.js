import Link from "next/link";

export default function Navbar() {
    return (
        <header className="absolute md:fixed top-0 left-0 w-full z-50">
            <div className="mx-auto max-w-7xl px-5 md:px-6">
                <div className="mt-3 md:mt-6 flex items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-6 py-3 shadow-[0_0_40px_rgba(168,85,247,0.15)]">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                            ZK
                        </div>
                        <div>
                            <p className="text-white font-semibold">Zaid Khan</p>
                            <p className="text-xs text-white/50 -mt-1">Your AI Assistant</p>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
                        <Link href="#" className="hover:text-white transition">Process</Link>
                        <Link href="#" className="hover:text-white transition">Work</Link>
                        <Link href="#" className="hover:text-white transition">About</Link>
                        <Link href="#" className="hover:text-white transition">Blog</Link>
                        <Link href="#" className="hover:text-white transition">FAQ</Link>
                    </nav>

                    {/* Button */}
                    <button className="hidden md:inline-flex rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 text-sm font-medium text-white shadow-lg hover:scale-105 transition cursor-pointer">
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
}