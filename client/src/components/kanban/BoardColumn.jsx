import { Plus } from "lucide-react";
import BoardHeader from "./BoardHeader";
import KanbanCard from "./KanbanCard";

// Board Column Component
export default function BoardColumn({ board, users, isEditingBoard, editBoardTitle, isAddingCard, newCardTitle, editingCard, editCardTitle, editCardDescription, onBoardTitleChange, onBoardSave, onBoardCancel, onBoardDoubleClick, onBoardDelete, onCardDoubleClick, onCardDelete, onCardTitleChange, onCardDescriptionChange, onCardSave, onCardCancel, onDragStart, onDragOver, onDrop, onAssignUser, onAddCardClick, onCardTitleInputChange, onCardAdd, onCardAddCancel }) {
    return (
        <div
            className="flex-shrink-0 w-80 max-w-full"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, board.id)}
        >
            <div className="bg-gray-100 rounded-lg p-3 flex flex-col">
                <BoardHeader
                    board={board}
                    isEditing={isEditingBoard === board.id}
                    editTitle={editBoardTitle}
                    onTitleChange={onBoardTitleChange}
                    onSave={() => onBoardSave(board.id)}
                    onCancel={onBoardCancel}
                    onDoubleClick={() => onBoardDoubleClick(board.id, board.title)}
                    onDelete={() => onBoardDelete(board.id)}
                />

                <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar max-h-[calc(100vh-280px)]">
                    {board.cards.map(card => (
                        <KanbanCard
                            key={card.id}
                            card={card}
                            boardId={board.id}
                            users={users}
                            isEditing={editingCard?.boardId === board.id && editingCard?.cardId === card.id}
                            editTitle={editCardTitle}
                            editDescription={editCardDescription}
                            onTitleChange={onCardTitleChange}
                            onDescriptionChange={onCardDescriptionChange}
                            onSave={onCardSave}
                            onCancel={onCardCancel}
                            onDelete={onCardDelete}
                            onDoubleClick={onCardDoubleClick}
                            onDragStart={onDragStart}
                            onAssignUser={onAssignUser}
                        />
                    ))}
                </div>

                {isAddingCard === board.id ? (
                    <AddCardForm
                        value={newCardTitle}
                        onChange={onCardTitleInputChange}
                        onAdd={() => onCardAdd(board.id)}
                        onCancel={onCardAddCancel}
                    />
                ) : (
                    <button
                        onClick={() => onAddCardClick(board.id)}
                        className="mt-2 w-full text-left px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg flex items-center gap-2 text-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah kartu
                    </button>
                )}
            </div>
        </div>
    );
}