import React, { useContext, useEffect, useState } from 'react'
import {Formik , Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from "axios"
import { useNavigate} from "react-router-dom"
import { AuthContext } from '../helpers/AuthContext'
import CircularProgress from '@mui/material/CircularProgress';

function CreatePost() {
  let navigate = useNavigate()
  const { authState } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem("accessToken")){
      navigate("/login")
    }
  },[])

  const initialValues = {
    title: "",
    postText: "",
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
  })



  const onSubmit = (data) => {
    setIsLoading(true)
    axios.post("https://blog-sever-n5qt.onrender.com/posts", data, { headers: {accessToken: localStorage.getItem("accessToken")}})
    .then((response) => {
      navigate("/")
      setIsLoading(false)
        return
    })
  }

  
  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className='formContainer'>

            <label>Title: </label>
            <ErrorMessage name="title" component="span"/>
            <Field id="inputCreatePost" name="title" placeholder="Post Title"/>

            <label>Post: </label>
            <ErrorMessage name="postText" component="span"/>
            <Field id="inputCreatePost" className="textarea" as="textarea" name="postText" placeholder="Insert here your post text"/>

            <button type='submit'>
            {isLoading ? <CircularProgress size={20} color='white' /> : "Create Post"}</button>
          </Form>

        </Formik>
    </div>
  )
}

export default CreatePost