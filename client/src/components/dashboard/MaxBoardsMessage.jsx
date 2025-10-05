// Max Boards Message Component
export default function MaxBoardsMessage() {
    return (
        <div className="h-32 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-dashed border-yellow-300 flex flex-col items-center justify-center text-center">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm font-medium text-gray-700">Maximum boards reached!</p>
            <p className="text-xs text-gray-500 mt-1">Delete a board to create new ones</p>
        </div>
    );
}