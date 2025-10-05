import { Plus, X } from 'lucide-react';
import ColorPicker from './ColorPicker';

// Add Board Card Component
export default function AddBoardCard({
    isAddingBoard,
    newBoardName,
    setNewBoardName,
    selectedColor,
    setSelectedColor,
    colorOptions,
    onAdd,
    onCancel,
    onStartAdding
}) {
    if (!isAddingBoard) {
        return (
            <div className="h-32">
                <button
                    onClick={onStartAdding}
                    className="w-full h-full bg-gray-200 hover:bg-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-all group"
                >
                    <Plus className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Create New Board</span>
                </button>
            </div>
        );
    }

    return (
        <div className="h-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-blue-500">
                <input
                    type="text"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    placeholder="Board name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onAdd();
                        if (e.key === 'Escape') onCancel();
                    }}
                />
                <ColorPicker
                    selectedColor={selectedColor}
                    onColorSelect={setSelectedColor}
                    colorOptions={colorOptions}
                />
                <div className="flex gap-2">
                    <button
                        onClick={onAdd}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium"
                    >
                        Create
                    </button>
                    <button
                        onClick={onCancel}
                        className="text-gray-600 hover:text-gray-800 px-2"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}