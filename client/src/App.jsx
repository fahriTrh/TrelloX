import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client"

const socket = io(`${import.meta.env.VITE_SERVER_URL}`)

export default function App() {
    const [data, setData] = useState(undefined);
    const [input, setInput] = useState('')

    useEffect(() => {
        fetch('/api')
            .then(res => {
                return res.json()
            })
            .then(d => {
                setData(d)
            })
    }, []);

    useEffect(() => {
        socket.on('new_fruit', (fruit) => {
            setData(prev => [...prev, fruit])
            setInput('')
        })

        return () => {
            socket.off('new_fruit')
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fruit: input }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Response dari server:', data);
            })
            .catch((err) => console.error('Error:', err));
    }

    return (
        <div>
            {!data ? <p>Loading...</p> : (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Masukkan nama buah"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Kirim</button>
            </form>
        </div>
    )
}
