// Color Picker Component
export default function ColorPicker({ selectedColor, onColorSelect, colorOptions }) {
    return (
        <div className="mb-3">
            <label className="text-xs font-medium text-gray-600 mb-2 block">Choose Color</label>
            <div className="flex flex-wrap gap-2.5">
                {colorOptions.map(color => (
                    <button
                        key={color.gradient}
                        onClick={() => onColorSelect(color.gradient)}
                        className={`w-9 h-9 rounded-full bg-gradient-to-br ${color.gradient} flex-shrink-0 hover:scale-110 transition-transform ${selectedColor === color.gradient ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''
                            }`}
                        title={color.name}
                    />
                ))}
            </div>
        </div>
    );
}