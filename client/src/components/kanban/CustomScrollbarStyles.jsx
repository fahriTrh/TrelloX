// Custom Scrollbar Styles Component
export default function CustomScrollbarStyles() {
    return (
        <style>{`
            .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.05);
                border-radius: 10px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                transition: background 0.3s ease;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(0, 0, 0, 0.3);
            }
            
            .custom-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05);
            }
        `}</style>
    );
}