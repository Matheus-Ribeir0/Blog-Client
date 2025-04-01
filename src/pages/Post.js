import { useEffect , useState, useContext} from "react"
import React from 'react'
import { useParams} from "react-router-dom"
import axios, { AxiosError } from "axios"
import {AuthContext} from '../helpers/AuthContext'
import { useNavigate} from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';


function Post() {
    let { id } = useParams()
    const [postObject, setPostObject] = useState({})
    const [comments, setComments] =useState([])
    const [newComment, setNewComment] = useState("")
    const {authState} = useContext(AuthContext)
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://blog-sever-n5qt.onrender.com/posts/byId/${id}`).then((response) => {
          setPostObject(response.data)
          })

          axios.get(`https://blog-sever-n5qt.onrender.com/comments/${id}`).then((response) => {
            setComments(response.data)
          })
    }, [])// sem essa array declarada no useEffect, ele vai rodar infirnitamente, caso ponha algo la, vai rodar quando aquele elemento for alterado

    const addComment = () => {
      axios.post("https://blog-sever-n5qt.onrender.com/comments", 
        {
            commentBody: newComment, 
            PostId: id
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"), 
          },
        }
      ).then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = { commentBody: newComment };
          setComments([...comments, commentToAdd]);
          setNewComment("");
          window.location.reload();
        }
      })
      
    }

    const deleteComment = (id) => {
      axios.delete(`https://blog-sever-n5qt.onrender.com/comments/${id}`, 
        {
          headers: {accessToken: localStorage.getItem("accessToken")}
        }).then(() => {
         setComments(comments.filter((val) => {
          return val.id !== id
         }))
      }
    )}
    
    const deletePost = () => {
      axios.delete(`https://blog-sever-n5qt.onrender.com/posts/${id}`, 
      {
        headers: {accessToken: localStorage.getItem("accessToken")}
      }).then(() => {
        navigate("/")
       })
    }
    
    const editPost = (option) => {
      if(option === "title"){
        let newTitle = prompt("Enter New Title:")
        axios.put("https://blog-sever-n5qt.onrender.com/posts/title", 
        {
          newTitle: newTitle,
          id: id
        },
        {
          headers: {accessToken: localStorage.getItem("accessToken")}
        }
        )
        setPostObject({...postObject, title: newTitle})
      }else{
        let newPostText = prompt("Enter New Text:")
        axios.put("https://blog-sever-n5qt.onrender.com/posts/postText", 
          {
            newText: newPostText,
            id: id
          },
          {
            headers: {accessToken: localStorage.getItem("accessToken")}
          }
          )
          setPostObject({...postObject, postText: newPostText})
      }
      
    }


    return (
      <div className="postPage">
        
        <div className="leftSide">
          <div className="post" id="individual">
            <div className="title" onClick={() => {
              if(authState.username === postObject.username) {
                editPost("title")
              }
              }}> {postObject.title} </div>
            <div className="body" onClick={() => {
              if(authState.username === postObject.username) {
                editPost("body")
              }}}>{postObject.postText}</div>
            <div className="footer">{postObject.username} {authState.username === postObject.username && <DeleteIcon className="delete_button" onClick={() => {deletePost(postObject.id)}}> Delete post</DeleteIcon>}</div>
          </div>
        </div>

        <div className="rightSide">
          <div className="addCommentContainer">
            <input type="text" placeholder="Comment..." autoComplete="off" value={newComment} onChange={(event) => {setNewComment(event.target.value)}}/>
            <button onClick={addComment}>Add Comment</button>
            </div>
          <div className="listOfComments">
            {comments.map((comment, key) => {
              return (
              <div key={key} className="comment"> 
              <div>
                {comment.commentBody}
                <label>{comment.username}</label>
              </div>
                {authState.username === comment.username && <DeleteIcon className="delete_button" onClick={() => {deleteComment(comment.id)}}> X </DeleteIcon>}
              </div>
              )
            })}
          </div>
        </div>
      </div>
    );
}

export default Post