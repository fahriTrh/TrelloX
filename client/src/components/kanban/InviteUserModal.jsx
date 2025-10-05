// Invite User Modal Component
export default function InviteUserModal({ show, users, newUserName, onNameChange, onInvite, onClose }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 text-lg">Invite Team Member</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={newUserName}
                        onChange={(e) => onNameChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onInvite();
                        }}
                        placeholder="e.g. Sarah Johnson"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Avatar color will be assigned automatically
                    </p>
                </div>

                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Current Team ({users.length})</h4>
                    <div className="flex flex-wrap gap-2">
                        {users.map(user => (
                            <div
                                key={user.id}
                                className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full"
                            >
                                <div className={`${user.color} w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium`}>
                                    {user.initials}
                                </div>
                                <span className="text-sm text-gray-700">{user.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onInvite}
                        disabled={!newUserName.trim()}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-all"
                    >
                        Send Invite
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}