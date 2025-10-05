import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TrelloClone from './pages/TrelloClone'


export default function App()
{
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/kanban' element={<TrelloClone />} />
        </Routes>
    )
}