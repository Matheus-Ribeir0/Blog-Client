import React from 'react'
import {Formik , Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Registration() {
  let navigate = useNavigate()

  const initialValues = {
    username: "",
    password: ""
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required()
  })

  const onSubmit = (data) => {
    axios.post("https://blog-sever-n5qt.onrender.com/auth", data).then((response) => {
        if(response.data.error){
          alert(response.data.error)
        }else{
          alert(response.data)
          navigate(`/login`)
        }
        
      })
  }

  return (
    <div className='registration'>
    
         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className='formContainer'>
          <h3>Create your account</h3>
            <label>Username: </label>
            <ErrorMessage name="username" component="span"/>
            <Field id="inputCreatePost" name="username" placeholder="username"/>

            <label>Password: </label>
            <ErrorMessage name="password" component="span"/>
            <Field id="inputCreatePost" type="password" name="password" placeholder="(Your password...)"/>

            <button type='submit'>Register</button>
          </Form>

        </Formik>
    </div>
  )
}

export default Registration