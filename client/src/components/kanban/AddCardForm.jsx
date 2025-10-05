// Add Card Form Component
export default function AddCardForm({ value, onChange, onAdd, onCancel }) {
    return (
        <div className="mt-2">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Masukkan judul kartu..."
                className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                autoFocus
            />
            <div className="flex gap-2 mt-2">
                <button
                    onClick={onAdd}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium"
                >
                    Tambah
                </button>
                <button
                    onClick={onCancel}
                    className="text-gray-600 hover:text-gray-800 p-1.5"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}