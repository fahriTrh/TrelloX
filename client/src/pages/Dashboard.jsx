import React, { useState, useEffect } from 'react';
import { Star, Clock } from 'lucide-react';
import EasterEggOverlay from '../components/dashboard/EasterEggOverlay';
import AddBoardCard from '../components/dashboard/AddBoardCard';
import BoardCard from '../components/dashboard/BoardCard';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import BoardSection from '../components/dashboard/BoardSection';
import MaxBoardsMessage from '../components/dashboard/MaxBoardsMessage';


// Main Dashboard Component
export default function Dashboard() {
    const [boards, setBoards] = useState([
        {
            id: 1,
            name: 'Project Alpha',
            color: 'from-blue-500 to-blue-600',
            starred: true,
            lastViewed: new Date('2025-10-05T10:30:00'),
            members: 4,
            cardCount: 12
        },
        {
            id: 2,
            name: 'Marketing Campaign',
            color: 'from-green-500 to-green-600',
            starred: false,
            lastViewed: new Date('2025-10-04T15:20:00'),
            members: 3,
            cardCount: 8
        },
        {
            id: 3,
            name: 'Design System',
            color: 'from-purple-500 to-purple-600',
            starred: true,
            lastViewed: new Date('2025-10-03T09:15:00'),
            members: 2,
            cardCount: 15
        }
    ]);

    const [isAddingBoard, setIsAddingBoard] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');
    const [selectedColor, setSelectedColor] = useState('from-blue-500 to-blue-600');
    const [editingBoard, setEditingBoard] = useState(null);
    const [editBoardName, setEditBoardName] = useState('');
    const [konamiProgress, setKonamiProgress] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);

    const colorOptions = [
        { gradient: 'from-blue-500 to-blue-600', name: 'Blue' },
        { gradient: 'from-green-500 to-green-600', name: 'Green' },
        { gradient: 'from-purple-500 to-purple-600', name: 'Purple' },
        { gradient: 'from-pink-500 to-pink-600', name: 'Pink' },
        { gradient: 'from-red-500 to-red-600', name: 'Red' },
        { gradient: 'from-yellow-500 to-yellow-600', name: 'Yellow' },
        { gradient: 'from-indigo-500 to-indigo-600', name: 'Indigo' },
        { gradient: 'from-orange-500 to-orange-600', name: 'Orange' }
    ];

    // // Easter Egg: Konami Code
    // const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    // useEffect(() => {
    //     const handleKeyDown = (e) => {
    //         const key = e.key.toLowerCase();
    //         if (key === konamiCode[konamiProgress].toLowerCase() || e.key === konamiCode[konamiProgress]) {
    //             setKonamiProgress(prev => prev + 1);
    //             if (konamiProgress + 1 === konamiCode.length) {
    //                 setShowEasterEgg(true);
    //                 setKonamiProgress(0);
    //                 setTimeout(() => setShowEasterEgg(false), 5000);
    //             }
    //         } else {
    //             setKonamiProgress(0);
    //         }
    //     };

    //     window.addEventListener('keydown', handleKeyDown);
    //     return () => window.removeEventListener('keydown', handleKeyDown);
    // }, [konamiProgress]);

    const addBoard = () => {
        if (!newBoardName.trim() || boards.length >= 5) return;

        const newBoard = {
            id: Date.now(),
            name: newBoardName.trim(),
            color: selectedColor,
            starred: false,
            lastViewed: new Date(),
            members: 1,
            cardCount: 0
        };

        setBoards([...boards, newBoard]);
        setNewBoardName('');
        setSelectedColor('from-blue-500 to-blue-600');
        setIsAddingBoard(false);
    };

    const deleteBoard = (boardId) => {
        setBoards(boards.filter(board => board.id !== boardId));
    };

    const toggleStar = (boardId) => {
        setBoards(boards.map(board =>
            board.id === boardId ? { ...board, starred: !board.starred } : board
        ));
    };

    const startEdit = (board) => {
        setEditingBoard(board.id);
        setEditBoardName(board.name);
    };

    const saveEdit = () => {
        if (!editBoardName.trim()) return;
        setBoards(boards.map(board =>
            board.id === editingBoard ? { ...board, name: editBoardName.trim() } : board
        ));
        setEditingBoard(null);
        setEditBoardName('');
    };

    const formatDate = (date) => {
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    };

    const starredBoards = boards.filter(b => b.starred);
    const recentBoards = [...boards].sort((a, b) => b.lastViewed - a.lastViewed);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <EasterEggOverlay show={showEasterEgg} />
            <DashboardHeader boardCount={boards.length} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Starred Boards Section */}
                <BoardSection
                    title="Starred Boards"
                    icon={Star}
                    boards={starredBoards}
                    renderContent={() => starredBoards.map(board => (
                        <BoardCard
                            key={board.id}
                            board={board}
                            onDelete={deleteBoard}
                            onToggleStar={toggleStar}
                            onEdit={startEdit}
                            isEditing={editingBoard === board.id}
                            editName={editBoardName}
                            setEditName={setEditBoardName}
                            saveEdit={saveEdit}
                            cancelEdit={() => setEditingBoard(null)}
                            formatDate={formatDate}
                        />
                    ))}
                />

                {/* All Boards Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-600" />
                            <h2 className="text-xl font-semibold text-gray-800">All Boards</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {recentBoards.map(board => (
                            <BoardCard
                                key={board.id}
                                board={board}
                                onDelete={deleteBoard}
                                onToggleStar={toggleStar}
                                onEdit={startEdit}
                                isEditing={editingBoard === board.id}
                                editName={editBoardName}
                                setEditName={setEditBoardName}
                                saveEdit={saveEdit}
                                cancelEdit={() => setEditingBoard(null)}
                                formatDate={formatDate}
                            />
                        ))}

                        {/* Add New Board */}
                        {boards.length < 5 && (
                            <AddBoardCard
                                isAddingBoard={isAddingBoard}
                                newBoardName={newBoardName}
                                setNewBoardName={setNewBoardName}
                                selectedColor={selectedColor}
                                setSelectedColor={setSelectedColor}
                                colorOptions={colorOptions}
                                onAdd={addBoard}
                                onCancel={() => {
                                    setIsAddingBoard(false);
                                    setNewBoardName('');
                                }}
                                onStartAdding={() => setIsAddingBoard(true)}
                            />
                        )}

                        {/* Max Boards Message */}
                        {boards.length >= 5 && <MaxBoardsMessage />}
                    </div>
                </section>

                {/* Easter Egg Hint */}
                {/* <div className="mt-12 text-center">
                    <p className="text-xs text-gray-400 italic">
                        Psst... Try the Konami Code for a surprise 🎮
                    </p>
                </div> */}
            </div>
        </div>
    );
}