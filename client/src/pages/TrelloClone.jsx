import React, { useState } from 'react';
import KanbanHeader from '../components/kanban/KanbanHeader';
import BoardColumn from '../components/kanban/BoardColumn';
import AddBoardButton from '../components/kanban/AddBoardButton';
import UserAssignmentModal from '../components/kanban/UserAssignmentModal';
import InviteUserModal from '../components/kanban/InviteUserModal';
import CustomScrollbarStyles from '../components/kanban/CustomScrollbarStyles';

// Main Component
export default function TrelloClone() {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', color: 'bg-blue-500', initials: 'JD' },
        { id: 2, name: 'Jane Smith', color: 'bg-green-500', initials: 'JS' },
        { id: 3, name: 'Bob Wilson', color: 'bg-purple-500', initials: 'BW' },
        { id: 4, name: 'Alice Brown', color: 'bg-pink-500', initials: 'AB' }
    ]);

    const [boards, setBoards] = useState([
        {
            id: 1,
            title: 'To Do',
            cards: [
                { id: 1, title: 'Desain landing page', description: 'Buat mockup untuk landing page baru', assignedUsers: [1, 2] },
                { id: 2, title: 'Setup database', description: 'Konfigurasi PostgreSQL', assignedUsers: [3] }
            ]
        },
        {
            id: 2,
            title: 'In Progress',
            cards: [
                { id: 3, title: 'Develop API endpoints', description: 'REST API untuk user management', assignedUsers: [2] }
            ]
        },
        {
            id: 3,
            title: 'Done',
            cards: [
                { id: 4, title: 'Research kompetitor', description: 'Analisis fitur kompetitor', assignedUsers: [1, 4] }
            ]
        }
    ]);

    const [isAddingBoard, setIsAddingBoard] = useState(false);
    const [newBoardTitle, setNewBoardTitle] = useState('');
    const [addingCardToBoard, setAddingCardToBoard] = useState(null);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [draggedCard, setDraggedCard] = useState(null);
    const [draggedFromBoard, setDraggedFromBoard] = useState(null);
    const [showUserModal, setShowUserModal] = useState(null);
    const [editingCard, setEditingCard] = useState(null);
    const [editCardTitle, setEditCardTitle] = useState('');
    const [editCardDescription, setEditCardDescription] = useState('');
    const [editingBoard, setEditingBoard] = useState(null);
    const [editBoardTitle, setEditBoardTitle] = useState('');
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [newUserName, setNewUserName] = useState('');

    const colorOptions = [
        'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
        'bg-red-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-teal-500',
        'bg-orange-500', 'bg-cyan-500'
    ];

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const addBoard = () => {
        if (newBoardTitle.trim()) {
            setBoards([...boards, {
                id: Date.now(),
                title: newBoardTitle,
                cards: []
            }]);
            setNewBoardTitle('');
            setIsAddingBoard(false);
        }
    };

    const addCard = (boardId) => {
        if (newCardTitle.trim()) {
            setBoards(boards.map(board => {
                if (board.id === boardId) {
                    return {
                        ...board,
                        cards: [...board.cards, {
                            id: Date.now(),
                            title: newCardTitle,
                            description: '',
                            assignedUsers: []
                        }]
                    };
                }
                return board;
            }));
            setNewCardTitle('');
            setAddingCardToBoard(null);
        }
    };

    const deleteCard = (boardId, cardId) => {
        setBoards(boards.map(board => {
            if (board.id === boardId) {
                return {
                    ...board,
                    cards: board.cards.filter(card => card.id !== cardId)
                };
            }
            return board;
        }));
    };

    const deleteBoard = (boardId) => {
        setBoards(boards.filter(board => board.id !== boardId));
    };

    const handleDragStart = (e, card, boardId) => {
        setDraggedCard(card);
        setDraggedFromBoard(boardId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, targetBoardId) => {
        e.preventDefault();

        if (!draggedCard || draggedFromBoard === targetBoardId) {
            setDraggedCard(null);
            setDraggedFromBoard(null);
            return;
        }

        setBoards(boards.map(board => {
            if (board.id === draggedFromBoard) {
                return {
                    ...board,
                    cards: board.cards.filter(card => card.id !== draggedCard.id)
                };
            }
            if (board.id === targetBoardId) {
                return {
                    ...board,
                    cards: [...board.cards, draggedCard]
                };
            }
            return board;
        }));

        setDraggedCard(null);
        setDraggedFromBoard(null);
    };

    const toggleUserAssignment = (boardId, cardId, userId) => {
        setBoards(boards.map(board => {
            if (board.id === boardId) {
                return {
                    ...board,
                    cards: board.cards.map(card => {
                        if (card.id === cardId) {
                            const isAssigned = card.assignedUsers.includes(userId);
                            return {
                                ...card,
                                assignedUsers: isAssigned
                                    ? card.assignedUsers.filter(id => id !== userId)
                                    : [...card.assignedUsers, userId]
                            };
                        }
                        return card;
                    })
                };
            }
            return board;
        }));
    };

    const startEditCard = (boardId, card) => {
        setEditingCard({ boardId, cardId: card.id });
        setEditCardTitle(card.title);
        setEditCardDescription(card.description);
    };

    const saveCardEdit = () => {
        if (!editCardTitle.trim()) return;

        setBoards(boards.map(board => {
            if (board.id === editingCard.boardId) {
                return {
                    ...board,
                    cards: board.cards.map(card => {
                        if (card.id === editingCard.cardId) {
                            return {
                                ...card,
                                title: editCardTitle,
                                description: editCardDescription
                            };
                        }
                        return card;
                    })
                };
            }
            return board;
        }));

        setEditingCard(null);
        setEditCardTitle('');
        setEditCardDescription('');
    };

    const cancelEdit = () => {
        setEditingCard(null);
        setEditCardTitle('');
        setEditCardDescription('');
    };

    const startEditBoard = (boardId, title) => {
        setEditingBoard(boardId);
        setEditBoardTitle(title);
    };

    const saveBoardEdit = (boardId) => {
        if (!editBoardTitle.trim()) return;

        setBoards(boards.map(board => {
            if (board.id === boardId) {
                return { ...board, title: editBoardTitle };
            }
            return board;
        }));

        setEditingBoard(null);
        setEditBoardTitle('');
    };

    const cancelBoardEdit = () => {
        setEditingBoard(null);
        setEditBoardTitle('');
    };

    const inviteUser = () => {
        if (!newUserName.trim()) return;

        const newUser = {
            id: Date.now(),
            name: newUserName.trim(),
            initials: getInitials(newUserName.trim()),
            color: colorOptions[users.length % colorOptions.length]
        };

        setUsers([...users, newUser]);
        setNewUserName('');
        setShowInviteModal(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600">
            <CustomScrollbarStyles />

            <KanbanHeader
                userCount={users.length}
                onInvite={() => setShowInviteModal(true)}
            />

            <div className="p-4 md:p-6 overflow-x-auto custom-scrollbar">
                <div className="flex gap-4 items-start min-h-[calc(100vh-120px)]">
                    {boards.map(board => (
                        <BoardColumn
                            key={board.id}
                            board={board}
                            users={users}
                            isEditingBoard={editingBoard}
                            editBoardTitle={editBoardTitle}
                            isAddingCard={addingCardToBoard}
                            newCardTitle={newCardTitle}
                            editingCard={editingCard}
                            editCardTitle={editCardTitle}
                            editCardDescription={editCardDescription}
                            onBoardTitleChange={setEditBoardTitle}
                            onBoardSave={saveBoardEdit}
                            onBoardCancel={cancelBoardEdit}
                            onBoardDoubleClick={startEditBoard}
                            onBoardDelete={deleteBoard}
                            onCardDoubleClick={startEditCard}
                            onCardDelete={deleteCard}
                            onCardTitleChange={setEditCardTitle}
                            onCardDescriptionChange={setEditCardDescription}
                            onCardSave={saveCardEdit}
                            onCardCancel={cancelEdit}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onAssignUser={setShowUserModal}
                            onAddCardClick={setAddingCardToBoard}
                            onCardTitleInputChange={setNewCardTitle}
                            onCardAdd={addCard}
                            onCardAddCancel={() => {
                                setAddingCardToBoard(null);
                                setNewCardTitle('');
                            }}
                        />
                    ))}

                    <AddBoardButton
                        isAdding={isAddingBoard}
                        boardTitle={newBoardTitle}
                        onTitleChange={setNewBoardTitle}
                        onAdd={addBoard}
                        onCancel={() => {
                            setIsAddingBoard(false);
                            setNewBoardTitle('');
                        }}
                        onStartAdding={() => setIsAddingBoard(true)}
                    />
                </div>
            </div>

            <UserAssignmentModal
                showModal={showUserModal}
                users={users}
                boards={boards}
                onClose={() => setShowUserModal(null)}
                onToggleUser={toggleUserAssignment}
            />

            <InviteUserModal
                show={showInviteModal}
                users={users}
                newUserName={newUserName}
                onNameChange={setNewUserName}
                onInvite={inviteUser}
                onClose={() => {
                    setShowInviteModal(false);
                    setNewUserName('');
                }}
            />
        </div>
    );
}