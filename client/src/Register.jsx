import axios from 'axios';
import {useContext, useState} from 'react'
import { UserContext } from './UserContext';

export default function Register() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const {setUsername: setLoggedInUsername,setId} = useContext(UserContext)
    async function register(ev) {
        ev.preventDefault()
        const {data} = await axios.post('/register', {username,password})
        setLoggedInUsername(username)
        setId(data.id)
    }

    return (
    <div className="bg-blue-50 h-screen flex items-center">
        <form className="w-64 mx-auto mb-20" onSubmit={register}>
            <input type="text" name='username' placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)} className="block w-full rounded-sm p-2 mb-2 border" />
            <input type="password" name='password' placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} className="block w-full rounded-sm p-2 mb-2 border" />
            <button className="bg-blue-500 text-white block w-full rounded-sm p-2">Register</button>
        </form>
    </div>
    )
}