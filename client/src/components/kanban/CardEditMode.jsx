// Card Component - Edit Mode
export default function CardEditMode({ title, description, onTitleChange, onDescriptionChange, onSave, onCancel }) {
    return (
        <div className="space-y-2">
            <input
                type="text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Judul kartu..."
                autoFocus
            />
            <textarea
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Deskripsi..."
                rows="3"
            />
            <div className="flex gap-2">
                <button
                    onClick={onSave}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium"
                >
                    Simpan
                </button>
                <button
                    onClick={onCancel}
                    className="text-gray-600 hover:text-gray-800 px-3 py-1.5"
                >
                    Batal
                </button>
            </div>
        </div>
    );
}