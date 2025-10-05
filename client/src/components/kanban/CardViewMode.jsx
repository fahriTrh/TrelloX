import { User, X } from 'lucide-react';

// Card Component - View Mode
export default function CardViewMode({ card, users, onDelete, onAssignUser }) {
    const getAssignedUsers = (assignedUserIds) => {
        return users.filter(user => assignedUserIds.includes(user.id));
    };

    return (
        <>
            <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm mb-1">{card.title}</h3>
                    {card.description && (
                        <p className="text-xs text-gray-600">{card.description}</p>
                    )}
                </div>
                <button
                    onClick={onDelete}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center -space-x-2">
                    {getAssignedUsers(card.assignedUsers).map(user => (
                        <div
                            key={user.id}
                            className={`${user.color} w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white`}
                            title={user.name}
                        >
                            {user.initials}
                        </div>
                    ))}
                </div>
                <button
                    onClick={onAssignUser}
                    className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded transition-all"
                >
                    <User className="w-4 h-4" />
                </button>
            </div>
        </>
    );
}