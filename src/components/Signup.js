import React , {useState} from 'react'
import {getAuth , createUserWithEmailAndPassword} from 'firebase/auth'
import{app} from '../Firebase'
import {useNavigate} from 'react-router-dom'
import './Login.css';

const Signup = () => {
    const[email , setemail] = useState('')
    const[password , setpassword] = useState('')
    const navigate = useNavigate()
    const submitHandler = (event)=>{
        event.preventDefault()
        const auth = getAuth(app)
        console.log('ohk done', email , password)
        createUserWithEmailAndPassword(auth, email ,password)
        .then(res=>{
            console.log(res.user)
            navigate('/login')

        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <div className='login_page'>
      <h1>SIGNUP</h1>
      <form onSubmit = {submitHandler} className='login_form'>
        <input onChange ={(e)=>{setemail(e.target.value)}} type = 'email' placeholder ='email' className='input_box'/>
        <input onChange ={(e)=>{setpassword(e.target.value)}} type = 'password' placeholder = 'password' className='input_box'/>
        <button type = 'submit' className='Submit_button'>Submit</button>
      </form>
    </div>
  )
}

export default Signup
