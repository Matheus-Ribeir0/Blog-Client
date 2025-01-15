import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate} from "react-router-dom"
import {AuthContext} from '../helpers/AuthContext'

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {setAuthState} = useContext(AuthContext)

    let navigate = useNavigate()

    const login = () => {
        const data = {username: username, password: password}
        axios.post("https://blog-sever-n5qt.onrender.com/auth/login", data).then((response) => {
            if(response.data.error) {
                alert(response.data.error)
            }else {
                localStorage.setItem("accessToken", response.data.token)
                setAuthState({username: response.data.username, id: response.data.id, status: true})
                navigate(`/`)
            }
          })
        }
  return (
    <div className='loginContainer'>
        <div className='formContainer'>
    <h3>Login to your account</h3>
    <label>Username: </label>
        <input 
            type="text" 
            onChange={(event) => {setUsername(event.target.value)}}
            className='login_input'>

        </input>
        
        <label>Password: </label>
        <input 
            type="password"  
            onChange={(event) => {setPassword(event.target.value)}}
            className='login_input'>

        </input>
        
        <button 
            onClick={login}
        > Login </button>
        </div>
    </div>
  )
}

export default Login