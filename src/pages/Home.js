import React, {useContext} from 'react'
import axios from "axios"
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { AuthContext } from '../helpers/AuthContext'

function Home() {
    
  const [listOfPost, setListOFPost] = useState([])
  const [likedPosts, setLikedPost] = useState([])
  const { authState } = useContext(AuthContext)
  let navigate = useNavigate()

  useEffect(() => {

    if(!localStorage.getItem("accessToken")) {//valida se o usuario esta logado para fazer o request dos likes
      
      navigate("/login");
    }else{
      axios.get("https://blog-sever-n5qt.onrender.com/posts",{
        headers: {accessToken: localStorage.getItem("accessToken")}
      }
    ).then((response) => {
        setListOFPost(response.data.listOfPost)
        setLikedPost(response.data.likedPosts.map((like) => {return like.PostId}))
        
      })
  }
  }, [])
  //[] utiliza o useEfect para fazer x coisa com a pagina carregar e a  array vazia [] e quando pode acontecer novamente

    const likeAPost = (postId) => {
      axios.post("https://blog-sever-n5qt.onrender.com/like", 
        {PostId: postId}, 
        {
          headers: {accessToken: localStorage.getItem("accessToken")}
        })
  
        .then((response) => {
          
          setListOFPost(listOfPost.map((post) => {
            if (post.id === postId) {
              if(response.data.liked){
                return {...post, Likes: [...post.Likes, 0 ]}
              }else{
                const likesArray = post.Likes
                likesArray.pop()
                return {...post, Likes: likesArray}
              }
              
            }else{
              return post
            }
          }))

          if(likedPosts.includes(postId)) {
            setLikedPost([likedPosts.filter((id) => {return id != postId})])
          }else{
            setLikedPost([...likedPosts, postId])
          }
      })
    }
  return (
    <div className='post_page'>
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
                <Link className='link' to={`/profile/${value.UserId}`}>
                  {value.username}
                </Link>
              </div>
              <div className='buttons'>
                {}
                <ThumbUpAltIcon onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"}

                />

                <label> {value.Likes.length}</label>
              </div>
            
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home