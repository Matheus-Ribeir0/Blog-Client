import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    let navigate = useNavigate()

    const changePassword = () => {
      if(newPassword && oldPassword){
        
        axios.put("https://blog-sever-n5qt.onrender.com/auth/changepassword", {
          oldPassword: oldPassword, 
          newPassword: newPassword,
      },{
          headers: {
            accessToken: localStorage.getItem("accessToken"), 
          },
        }).then((response) => {
          if (response.data.error) {
              alert(response.data.error)
          }else{
            alert(response.data)
            navigate("/")
          }
          
        })
      }else{
        alert("Campos vazios")
      }
    }
  return (
    <div className='loginContainer'>
       <div className='formContainer'>
          <h3>Change your password</h3>
          <input className='login_input' type="password"  placeholder='Old Password...' onChange={(event) => {setOldPassword(event.target.value)}}/>
          <input className='login_input' type="password"  placeholder='New Password...' onChange={(event) => {setNewPassword(event.target.value)}}/>
          <button onClick={changePassword}> Save Changes </button>
        </div>
    </div>
   
  )
}

export default ChangePassword