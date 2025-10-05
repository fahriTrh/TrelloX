import CardEditMode from "./CardEditMode";
import CardViewMode from "./CardViewMode";

// Card Component
export default function KanbanCard({ card, boardId, users, isEditing, editTitle, editDescription, onTitleChange, onDescriptionChange, onSave, onCancel, onDelete, onDoubleClick, onDragStart, onAssignUser }) {
    return (
        <div
            draggable={!isEditing}
            onDragStart={(e) => onDragStart(e, card, boardId)}
            className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move group"
            onDoubleClick={() => onDoubleClick(boardId, card)}
        >
            {isEditing ? (
                <CardEditMode
                    title={editTitle}
                    description={editDescription}
                    onTitleChange={onTitleChange}
                    onDescriptionChange={onDescriptionChange}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            ) : (
                <CardViewMode
                    card={card}
                    users={users}
                    onDelete={() => onDelete(boardId, card.id)}
                    onAssignUser={() => onAssignUser({ boardId, cardId: card.id })}
                />
            )}
        </div>
    );
}