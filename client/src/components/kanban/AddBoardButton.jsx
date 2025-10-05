import { Plus, X } from "lucide-react";

// Add Board Button Component
export default function AddBoardButton({ isAdding, boardTitle, onTitleChange, onAdd, onCancel, onStartAdding }) {
    if (isAdding) {
        return (
            <div className="flex-shrink-0 w-80 max-w-full">
                <div className="bg-gray-100 rounded-lg p-3">
                    <input
                        type="text"
                        value={boardTitle}
                        onChange={(e) => onTitleChange(e.target.value)}
                        placeholder="Masukkan judul list..."
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={onAdd}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium"
                        >
                            Tambah list
                        </button>
                        <button
                            onClick={onCancel}
                            className="text-gray-600 hover:text-gray-800 p-1.5"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-shrink-0 w-80 max-w-full">
            <button
                onClick={onStartAdding}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-full px-4 py-3 rounded-lg flex items-center gap-2 font-medium transition-all"
            >
                <Plus className="w-5 h-5" />
                Tambah list
            </button>
        </div>
    );
}