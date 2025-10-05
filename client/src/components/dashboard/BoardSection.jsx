// Board Section Component
export default function BoardSection({ title, icon: Icon, boards, renderContent }) {
    if (boards.length === 0) return null;

    return (
        <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
                <Icon className={`w-5 h-5 ${title === 'Starred Boards' ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} />
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {renderContent()}
            </div>
        </section>
    );
}