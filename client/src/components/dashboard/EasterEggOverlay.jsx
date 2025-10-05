// Easter Egg Component
export default function EasterEggOverlay({ show }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center pointer-events-none">
            <div className="text-center animate-bounce">
                <div className="text-8xl mb-4">🎮</div>
                <h1 className="text-6xl font-bold text-white mb-2">KONAMI CODE!</h1>
                <p className="text-2xl text-blue-400">You've unlocked the secret developer mode! 🚀</p>
                <p className="text-lg text-gray-300 mt-4">Achievement: True Gamer Detected</p>
            </div>
        </div>
    );
}