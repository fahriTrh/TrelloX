import { GripVertical, X } from "lucide-react";

// Board Header Component
export default function BoardHeader({ board, isEditing, editTitle, onTitleChange, onSave, onCancel, onDoubleClick, onDelete }) {
    return (
        <div className="flex items-center justify-between mb-3">
            {isEditing ? (
                <div className="flex items-center gap-2 flex-1">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => onTitleChange(e.target.value)}
                        onBlur={onSave}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onSave();
                            if (e.key === 'Escape') onCancel();
                        }}
                        className="flex-1 px-2 py-1 border border-blue-500 rounded text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                </div>
            ) : (
                <h2
                    className="font-semibold text-gray-800 flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                    onDoubleClick={onDoubleClick}
                >
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    {board.title}
                    <span className="text-xs text-gray-500 font-normal">({board.cards.length})</span>
                </h2>
            )}
            <button
                onClick={onDelete}
                className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}