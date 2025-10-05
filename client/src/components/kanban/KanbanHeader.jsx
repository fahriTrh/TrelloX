import { Plus, User } from 'lucide-react';

// Header Component
export default function KanbanHeader({ userCount, onInvite }) {
    return (
        <header className="bg-white/20 backdrop-blur-sm">
            <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-white text-xl md:text-2xl font-bold">My Kanban Board</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                        <User className="w-4 h-4 text-white" />
                        <span className="text-white text-sm">Team: {userCount} members</span>
                    </div>
                    <button
                        onClick={onInvite}
                        className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Invite</span>
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all">
                        Share
                    </button>
                </div>
            </div>
        </header>
    );
}