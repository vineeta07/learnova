import React , {useState} from 'react'
import {getAuth , signInWithEmailAndPassword,signInWithPopup ,GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth'
import{app} from '../Firebase'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const[email , setemail] = useState('')
    const[password , setpassword] = useState('')
    const navigate = useNavigate()
    const submitHandler = (event)=>{
        event.preventDefault()
        const auth = getAuth(app)
        console.log('ohk done', email , password)
        signInWithEmailAndPassword(auth, email , password)
        .then(userData=>{
            console.log(userData.user)
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const loginwithgoogle =()=>{
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth ,provider)
        .then(result=>{
            console.log(result)
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err)
        })

    }
    
    const loginwithgithub =()=>{
        const auth = getAuth(app)
        const provider = new GithubAuthProvider()
        signInWithPopup(auth ,provider)
        .then(result=>{
            console.log(result)
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err)
        })

    }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit = {submitHandler}>
        <input onChange ={(e)=>{setemail(e.target.value)}} type = 'email' placeholder ='email'/>
        <input onChange ={(e)=>{setpassword(e.target.value)}} type = 'password' placeholder = 'password'/>
        <button type = 'submit'>Submit</button>
        <br/>   
        <br/>
        <button type ='button' onClick={loginwithgoogle}>login with Google </button>
        <br/>
        <button type ='button' onClick = {loginwithgithub}>login with Github</button>
      </form>
       
    </div>
  )
}

export default Login
