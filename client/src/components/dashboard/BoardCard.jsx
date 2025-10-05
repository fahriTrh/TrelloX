import { Star, Users, Trash2, Edit2, Check, X } from 'lucide-react';
// Board Card Component
export default function BoardCard({
    board,
    onDelete,
    onToggleStar,
    onEdit,
    isEditing,
    editName,
    setEditName,
    saveEdit,
    cancelEdit,
    formatDate
}) {
    return (
        <div className="group h-32 relative">
            <div className={`h-full bg-gradient-to-br ${board.color} rounded-lg p-4 shadow-md hover:shadow-xl transition-all cursor-pointer relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col">
                    {isEditing ? (
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="flex-1 px-2 py-1 rounded text-sm font-semibold bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') saveEdit();
                                    if (e.key === 'Escape') cancelEdit();
                                }}
                            />
                            <button
                                onClick={saveEdit}
                                className="bg-white text-green-600 p-1 rounded hover:bg-green-50"
                            >
                                <Check className="w-4 h-4" />
                            </button>
                            <button
                                onClick={cancelEdit}
                                className="bg-white text-red-600 p-1 rounded hover:bg-red-50"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-white font-semibold text-lg line-clamp-2 flex-1">
                                    {board.name}
                                </h3>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleStar(board.id);
                                    }}
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    <Star
                                        className={`w-5 h-5 ${board.starred ? 'fill-yellow-300 text-yellow-300' : ''}`}
                                    />
                                </button>
                            </div>

                            <div className="mt-auto space-y-1">
                                <div className="flex items-center justify-between text-white/90 text-xs">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {board.members}
                                        </span>
                                        <span>{board.cardCount} cards</span>
                                    </div>
                                    <span>{formatDate(board.lastViewed)}</span>
                                </div>
                            </div>

                            {/* Hover Actions */}
                            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(board);
                                    }}
                                    className="bg-white/90 hover:bg-white text-gray-700 p-1.5 rounded shadow-sm"
                                >
                                    <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm(`Delete "${board.name}"?`)) {
                                            onDelete(board.id);
                                        }
                                    }}
                                    className="bg-white/90 hover:bg-white text-red-600 p-1.5 rounded shadow-sm"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}