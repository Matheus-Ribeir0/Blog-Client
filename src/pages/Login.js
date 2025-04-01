import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../helpers/AuthContext'
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { setAuthState } = useContext(AuthContext)

    let navigate = useNavigate()

    const login = () => {
        const data = { username: username, password: password }
        setIsLoading(true)
        axios.post("https://blog-sever-n5qt.onrender.com/auth/login", data).then((response) => {

            if (response.data.error) {
                alert(response.data.error)
                setIsLoading(false)
                return
            } else {
                localStorage.setItem("accessToken", response.data.token)
                setAuthState({ username: response.data.username, id: response.data.id, status: true })
                navigate(`/`)
                setIsLoading(false)
                return
            }
        })
    }

    return (
        <div className='loginContainer'>
            <div className='formContainer' >
                <h3>Login to your account</h3>
                <label>Username: </label>
                <input
                    type="text"
                    onChange={(event) => { setUsername(event.target.value) }}
                    className='login_input'>

                </input>

                <label>Password: </label>
                <input
                    type="password"
                    onChange={(event) => { setPassword(event.target.value) }}
                    className='login_input'>

                </input>

                <button
                    className={isLoading ? "login-button" : ""}
                    onClick={isLoading ? null : login}
                > {isLoading ? <CircularProgress size={20} color='white' /> : "Login"}
                </button>
            </div>
        </div>
    )
}

export default Login