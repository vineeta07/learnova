import React , {useState} from 'react'
import {getAuth , createUserWithEmailAndPassword} from 'firebase/auth'
import{app} from '../Firebase'
import {useNavigate} from 'react-router-dom'

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
    <div>
      <h1>SIGNUP</h1>
      <form onSubmit = {submitHandler}>
        <input onChange ={(e)=>{setemail(e.target.value)}} type = 'email' placeholder ='email'/>
        <input onChange ={(e)=>{setpassword(e.target.value)}} type = 'password' placeholder = 'password'/>
        <button type = 'submit'>Submit</button>
      </form>
    </div>
  )
}

export default Signup
