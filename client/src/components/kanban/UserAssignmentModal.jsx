// User Assignment Modal Component
export default function UserAssignmentModal({ showModal, users, boards, onClose, onToggleUser }) {
    if (!showModal) return null;

    const card = boards
        .find(b => b.id === showModal.boardId)
        ?.cards.find(c => c.id === showModal.cardId);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Assign Users</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    {users.map(user => {
                        const isAssigned = card?.assignedUsers.includes(user.id);

                        return (
                            <button
                                key={user.id}
                                onClick={() => onToggleUser(showModal.boardId, showModal.cardId, user.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${isAssigned
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`${user.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-medium`}>
                                    {user.initials}
                                </div>
                                <span className="font-medium text-gray-800">{user.name}</span>
                                {isAssigned && (
                                    <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}