// Header Component
export default function DashboardHeader({ boardCount }) {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Kanban Boards</h1>
                    <p className="text-sm text-gray-500">Manage your projects with ease</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                        {boardCount}/5 boards
                    </div>
                </div>
            </div>
        </header>
    );
}