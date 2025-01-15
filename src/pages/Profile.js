import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from '../helpers/AuthContext'

function Profile() {
  let {id} = useParams()
  const [username, setUsername] = useState("")
  const [listOfPost, setlistOfPost] = useState([])
  let navigate = useNavigate()
  const {authState} = useContext(AuthContext)

  useEffect(() => {
    axios.get(`https://blog-sever-n5qt.onrender.com/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username)
    })

    axios.get(`https://blog-sever-n5qt.onrender.com/posts/byuserid/${id}`).then((response) => {
      setlistOfPost(response.data)
    })
  }, [])

  return (
    <div className='profilePageContainer'>
        <div className='basicInfo'> 
          <h1>{username}</h1>
          {authState.username === username && (<button onClick={() => {navigate('/changepassword')}}> Change My Password </button>)}
        </div>
        <div className='listOfPost'>
          {listOfPost.map((value, key) => {
            return (
              <div key={key} className="post">
                <div className="title"> {value.title} </div>
                <div
                  className="body"
                  onClick={() => {
                    navigate(`/post/${value.id}`);
                  }}
                >
                  {value.postText}
                </div>
                <div className="footer">
                  
                  <div className='username'>
                    {value.username}
                  </div>
                  <div className='buttons'>
                    <label> {value.Likes.length}</label>
                  </div>

                </div>
              </div>
              );
            })}
        </div>
    </div>
  )
}

export default Profile